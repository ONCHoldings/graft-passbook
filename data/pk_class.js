var fs = require('fs'); 
var path = require('path'); 
var _ = require('underscore');
var crypto = require('crypto');
var shasum = crypto.createHash('sha1');

module.exports = {
  vars: {
    $certPath: '', // === Holds the path to the certificate
    $name: '', // === Name of the downloaded file
    $files: [], // === Holds the files to include in the .pkpass
    $JSON: {}, // === Holds the json
    $SHAs: [], // === Holds the SHAs of the $files array
    $certPass: '', // === Holds the password to the certificate
    $WWDRcertPath: '', // === Holds the path to the WWDR Intermediate certificate
    $tempPath: '/tmp/', // === Holds the path to a temporary folder
    $sError: '', // === Holds error info if an error occured
    $uniqid: null // === Holds a autogenerated uniqid to prevent overwriting other processes pass files
  },
  init: function($certPath, $certPass, $JSON) {
    console.log('start constructo : ', this);
    if(typeof($JSON) !== 'undefined' && $JSON !== false) {
      this.setJSON($JSON);
    }
    if(typeof($certPass) !== 'undefined' && $certPass !== false) {
      this.setCertificatePassword($certPass);
    }
    if(typeof($certPath) !== 'undefined' && $certPath !== false) {
      this.setCertificate($certPath);
    }
  },
  // ======= ================ ======= //
  // ======= PUBLIC FUNCTIONS ======= //
  // ======= ================ ======= //
  debugVars: function() {
    console.log("certPath: ", this.vars.$certPath);
    console.log("name: ", this.vars.$name);
    console.log("files: ", this.vars.$files);
    console.log("JSON: ", this.vars.$JSON);
    console.log("SHAs: ", this.vars.$SHAs);
    console.log("certPass: ", this.vars.$certPass);
    console.log("WWDRcertPath: ", this.vars.$WWDRcertPath);
    console.log("tempPath: ", this.vars.$tempPath);
    console.log("sError: ", this.vars.$sError);
    console.log("uniqid: ", this.vars.$uniqid);
  },
  /*
	* Sets the path to a certificate
	* Parameter: string, path to certificate
	* Return: boolean, true on succes, false if file doesn't exist
	*/
  setCertificate: function($path) {
    var me = this;
    fs.exists($path, function($exists) {
      if($exists) {
        me.vars.$certPath = $path;
        console.log('Certificate file exists');
        console.log('VARS AFTER: ', me.vars);
      } else {
        console.log('Certificate file does not exist.');
      }
    });
  },
  /*
	* Sets the certificate's password
	* Parameter: string, password to the certificate
	* Return: boolean, always true
	*/
  setCertificatePassword: function($p) {
    this.vars.$certPass = $p;
    return true;
  },
  /*
	* Sets the path to the WWDR Intermediate certificate
	* Parameter: string, path to certificate
	* Return: boolean, always true
	*/
  setWWDRcertPath: function($path) {
    this.vars.WWDRcertPath = $path;
    return true;
  },
  /*
	* Sets the path to the temporary directory (must end with a slash)
	* Parameter: string, path to temporary directory
	* Return: boolean, true on success, false if directory doesn't exist
	*/
  setTempPath: function($path) {
    var me = this;
    fs.exists($path, function($exists) {
      if($exists) {
        me.vars.$tempPath = $path;
        console.log('VARS AFTER: ', me.vars);
      }
    });
  },
  /*
	* Decodes JSON and saves it to a variable
	* Parameter: json-string
	* Return: boolean, true on succes, false if json wasn't decodable
	*/
  setJSON: function($JSON) {
    var res = false;
    if(_.isObject($JSON)) {
      this.vars.$JSON = $JSON;
      res = true;
    } else {
      this.vars.$sError = 'This is not a JSON string.';
    }
    return res;
  },
  /*
	* Adds file to the file array
	* Parameter: string, path to file
	* Parameter: string, optional, name to create file as
	* Return: boolean, true on succes, false if file doesn't exist
	*/
  addFile: function($path, $name) {
    fs.exists($path, function($exists) {
      if($exists) {
        if(typeof($name) === 'undefined' || $name === null) {
          $name = path.basename($path);
        }
        var mid_obj = {
          'name': $name,
          'path': $path
        };
        this.vars.$files.push(mid_obj);
      } else {
        this.vars.$sError = "File does not exist.";
      }
    });
  },
  /*
	* Creates the actual .pkpass file
	* Parameter: boolean, if output is true, send the zip file to the browser.
	* Return: zipped .pkpass file on succes, false on failure
	*/
  create: function($output) {
    
  },
  getName: function() {
    return this.vars.$name;
  },
  setName: function($name) {
    this.vars.$name = $name;
  },
  getError: function() {
    return this.vars.$sError;
  },
  // ======= ================= ======= //
  // ======= PRIVATE FUNCTIONS ======= //
  // ======= ================= ======= //
  /*
	* Subfunction of create()
	* This function creates the hashes for the files and adds them into a json string.
	*/
  createManifest: function() {
    shasum.update(this.vars.JSON);
    $sha_mid = {
      'pass.json': shasum.digest('hex')
    };
    this.vars.$SHAs.push($sha_mid);
    $hasicon = false;
    if(this.vars.files.length > 0) {
    for(var i = 0; i < this.vars.files; i++) {
      if(this.vars.files[i].name.toLowerCase() == 'icon.png') {
        $hasicon = true;
      }
    }
  },
  /*
	* Converts PKCS7 PEM to PKCS7 DER
	* Parameter: string, holding PKCS7 PEM, binary, detached
	* Return: string, PKCS7 DER
	*/
  convertPEMtoDER: function($signature) {
    
  },
  /*
	* Creates a signature and saves it
	* Parameter: json-string, manifest file
	* Return: boolean, true on succes, failse on failure
	*/
  createSignature: function($manifest) {
    
  },
  /*
	* Creates .pkpass (zip archive)
	* Parameter: json-string, manifest file
	* Return: boolean, true on succes, false on failure
	*/
  createZip: function($manifest) {
    
  },
  paths: function() { // === declares all paths used for temporary files
    // ==== declare base paths
    $paths = {
      'pkpass': 'pass.pkpass',
      'signature': 'signature',
      'manifest': 'manifest.json'
    };
    
  },
  clean: function() { // === removes all temporary files
    
  }
};