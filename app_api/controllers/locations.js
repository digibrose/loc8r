/**
 * Created by digibrose on 19/12/2016.
 */
var mongoose = require('mongoose');
var Loc = mongoose.model('Location');


var theEarth = (function(){
    var earthRadius = 6371; // km,
    var getDistanceFromRads = function(rads) {
        return parseFloat(rads*earthRadius);
    };
    var getRadsFromDistance = function(distance) {
        return parseFloat(distance / earthRadius);
    };

    return {
        getDistanceFromRads : getDistanceFromRads,
        getRadsFromDistance : getRadsFromDistance
    };

}) ();

var sendJsonResponse = function(res, status, content){
    res.status(status);
    res.json(content);
};

module.exports.locationsCreate = function(req,res){
    Loc.create({
        name:req.body.name,
        address:req.body.address,
        facilities:req.body.facilities.split(","),
        coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
        openingTimes: [{
            days: req.body.days1,
            opening: req.body.opening1,
            closing: req.body.closing1,
            closed: req.body.closed1
        }, {
            days: req.body.days2,
            opening: req.body.opening2,
            closing: req.body.closing2,
            closed: req.body.closed2
        }]
    },function(err, location) {
        if (err) {
            sendJsonResponse(res, 400, err);
        } else {
            sendJsonResponse(res, 201, location);
        }
    });
};

module.exports.locationsListByDistance = function(req,res) {
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    var maxDistance = parseFloat(req.query.maxDistance);
    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };
    var geoOptions = {
        spherical: true,
        maxDistance: theEarth.getRadsFromDistance(maxDistance),
        num: 10
    };
    if (!lng || !lat) {
        sendJsonResponse(res, 404, {
            "message": "lng and lat quert string required"
        });
        return;
    }
    Loc.geoNear(point, geoOptions, function(err, results, stats) {
        var locations = [];
        if (err) {
            sendJsonResponse(res, 404, err);
        } else {
            results.forEach(function (doc) {
                locations.push({
                    distance: theEarth.getDistanceFromRads(doc.dis),
                    name: doc.obj.name,
                    address: doc.obj.address,
                    rating: doc.obj.rating,
                    facilities: doc.obj.facilities,
                    _id: doc.obj._id
                });
            });
            sendJsonResponse(res, 200, locations);
        }
    });
};

module.exports.locationsReadOne = function(req,res){
    if (req.params && req.params.locationid) {
        Loc.findById(req.params.locationid).exec(function (err, location) {
            if (!location) {
                sendJsonResponse(res, 404, {
                    "message": "location id not found"
                });
                return;
            } else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, location);
        })
    } else {
        sendJsonResponse(res, 404, {
            "message": "No locationid in request"
        });
    }
};

module.exports.locationsUpdateOne = function(req,res) {
    if (!req.params.locationid) {
        sendJsonResponse(res, 404, {
            "message": "Not found: locationid is required"
        });
        return;
    }
    Loc
        .findById(req.params.locationid)
        .select('-reviews-rating')
        .exec(
            function (err, location) {
                if (!location) {
                    sendJsonResponse(res, 404, {
                        "message": "locationid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                location.name = req.body.name;
                location.address = req.body.address;
                location.facilitues = req.body.facilities.split(",");
                location.coords = [parseFloat(req.body.lng),
                    parseFloat(req.body.lat)];
                location.openingTimes = [{
                    days: req.body.days1,
                    opening: req.body.opening1,
                    closing: req.body.closing1,
                    closed: req.body.closed1
                }, {
                    ays: req.body.days2,
                    opening: req.body.opening2,
                    closing: req.body.closing2,
                    closed: req.body.closed2
                }];
                location.save(function (err, location) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, location);
                    }
                });
            }
        );
};


module.exports.locationsDeleteOne = function(req,res){
    var locationid = req.params.locationid;
    if (locationid) {
        Loc.findIdAndRemove(locationid).exec(
            function(err, location) {
                if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 204, null);
            }
        );
    } else {
        sendJsonResponse(res, 404, {
            "message": "No locationid"
        });
    }
};

