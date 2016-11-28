/**
 * Created by digibrose on 25/11/2016.
 */
/* GET home page */
module.exports.index = function(req, res){
    res.render('index', {title: 'Express'});
};