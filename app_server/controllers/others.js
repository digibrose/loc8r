/**
 * Created by digibrose on 25/11/2016.
 */
/* GET about page */
module.exports.about = function(req, res){
    res.render('index', {title: 'About'});
};