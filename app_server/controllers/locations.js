/**
 * Created by digibrose on 30/11/2016.
 */
/* GET home page */
module.exports.homelist = function(req, res){
    res.render('locations-list', {title: 'Home'});
};

/* GET Location Info page */
module.exports.locationInfo = function(req, res){
    res.render('index', {title: 'Location info'});
};

/* GET add review page */
module.exports.addReview = function(req, res){
    res.render('index', {title: 'Add review'});
};
