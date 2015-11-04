var crypto = require('crypto');
var pwd ="mahesh";
module.exports = function(pwd, fn) {
  var hash = crypto.createHash('sha256').update(pwd).digest('base64');
  console.log(hash);
  fn(null, hash);
};