var utils    = require('./utils');
var should   = require('should');
var path     = require('path');
var _        = require('underscore');
var Backbone = require('backbone');
var couch_init = require('../data/couch_init.js');
var pk_class = require('../data/pk_class.js');

var testPort = 8901;

var Graft = require('../server');

describe('CouchDB connection check', function() {
    before(utils.requestUrl(5984, ''));
    it('connection status', function() {
        this.resp.should.have.status(200);
    });
});

// === check for required assets existence (start)
describe("CHECK /data/assets/AppleWWDRCA.pem file", function() {
  var path_name = __dirname.substring(0, __dirname.length - 4) + "data/assets/AppleWWDRCA.pem";
  before(utils.checkFile(path_name));
  it('should return true', function() {
    this.resp.should.be.true;
  });
});

describe("CHECK /data/assets/passdemo.p12 file", function() {
  var path_name = __dirname.substring(0, __dirname.length - 4) + "data/assets/passdemo.p12";
  before(utils.checkFile(path_name));
  it('should return true', function() {
    this.resp.should.be.true;
  });
});

describe("CHECK /data/assets/images/icon.png file", function() {
  var path_name = __dirname.substring(0, __dirname.length - 4) + "data/assets/images/icon.png";
  before(utils.checkFile(path_name));
  it('should return true', function() {
    this.resp.should.be.true;
  });
});

describe("CHECK /data/assets/images/icon@2x.png file", function() {
  var path_name = __dirname.substring(0, __dirname.length - 4) + "data/assets/images/icon@2x.png";
  before(utils.checkFile(path_name));
  it('should return true', function() {
    this.resp.should.be.true;
  });
});

describe("CHECK /data/assets/images/logo.png file", function() {
  var path_name = __dirname.substring(0, __dirname.length - 4) + "data/assets/images/logo.png";
  before(utils.checkFile(path_name));
  it('should return true', function() {
    this.resp.should.be.true;
  });
});

describe("CHECK /data/assets/images/strip.png file", function() {
  var path_name = __dirname.substring(0, __dirname.length - 4) + "data/assets/images/strip.png";
  before(utils.checkFile(path_name));
  it('should return true', function() {
    this.resp.should.be.true;
  });
});

describe("CHECK /data/assets/tmp folder", function() {
  var path_name = __dirname.substring(0, __dirname.length - 4) + "data/assets/tmp";
  before(utils.checkFile(path_name));
  it('should return true', function() {
    this.resp.should.be.true;
  });
});
// === check for required assets existence (end)

// === check for required js files existence (start)
describe("CHECK /data/config.js file", function() {
  var path_name = __dirname.substring(0, __dirname.length - 4) + "data/config.js";
  before(utils.checkFile(path_name));
  it('should return true', function() {
    this.resp.should.be.true;
  });
});
describe("CHECK /data/couch_config.js file", function() {
  var path_name = __dirname.substring(0, __dirname.length - 4) + "data/couch_config.js";
  before(utils.checkFile(path_name));
  it('should return true', function() {
    this.resp.should.be.true;
  });
});
describe("CHECK /data/passwork.js file", function() {
  var path_name = __dirname.substring(0, __dirname.length - 4) + "data/passwork.js";
  before(utils.checkFile(path_name));
  it('should return true', function() {
    this.resp.should.be.true;
  });
});
describe("CHECK /data/pk_class.js file", function() {
  var path_name = __dirname.substring(0, __dirname.length - 4) + "data/pk_class.js";
  before(utils.checkFile(path_name));
  it('should return true', function() {
    this.resp.should.be.true;
  });
});
describe("CHECK /data/couch_init.js file", function() {
  var path_name = __dirname.substring(0, __dirname.length - 4) + "data/couch_init.js";
  before(utils.checkFile(path_name));
  it('should return true', function() {
    this.resp.should.be.true;
  });
});
describe("CHECK server.js file", function() {
  var path_name = __dirname.substring(0, __dirname.length - 4) + "server.js";
  before(utils.checkFile(path_name));
  it('should return true', function() {
    this.resp.should.be.true;
  });
});
describe("CHECK package.json file", function() {
  var path_name = __dirname.substring(0, __dirname.length - 4) + "package.json";
  before(utils.checkFile(path_name));
  it('should return true', function() {
    this.resp.should.be.true;
  });
});
describe("CHECK node_modules", function() {
  var path_name = __dirname.substring(0, __dirname.length - 4) + "node_modules";
  before(utils.checkFile(path_name));
  it('should return true', function() {
    this.resp.should.be.true;
  });
});
// === check for required js files existence (end)

// === functionality testings (start)
describe("CHECK F", function() {
  it("F", function() {
    console.log("PK_CLASS: ", pk_class);
  });
});  
// === functionality testings (end)