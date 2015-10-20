/* GET users listing. */
var dao = require('../dao/stockDao');
exports.add = function(req, res){
  var param = req.query || req.params;
  dao.add(req,res);
  res.send('respond with a resource');
};
