var config = require('./config.js');
require('./couch_init.js'); // === start predefined couch db stuffs

var pk_class = require('./pk_class.js');
// pk_class.init(__dirname + '/assets/AppleWWDRCA.pem', '123', {});
module.exports = pk_class;
