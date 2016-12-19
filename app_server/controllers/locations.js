/**
 * Created by digibrose on 30/11/2016.
 */
/* GET home page */
module.exports.homelist = function(req, res){
    res.render('locations-list', {
        title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
        locations: [{
            name: 'StarCups',
            address: '125 high street reading',
            rating: 3,
            facilities: ['hot drink', 'food', 'premium wifi'],
            distance: '100m',
        },{
            name: 'Nero',
            address: '150 high street reading',
            rating: 4,
            facilities: ['hot drink', 'food', 'premium wifi'],
            distance: '200m',
        }],
        sidebar: 'Looking for wifi and a seat? Loc8r helps you find places to work when out and about.'
    });
};

/* GET Location Info page */
module.exports.locationInfo = function(req, res){
    res.render('location-info', {
        title: 'Starcups',
        pageHeader: {title: 'Starcups'},
        sidebar: {
            context: 'is on Loc8r because the food is nice and the wifi is quick',
            calltoAction: 'If you\'ve been and you like it please leave a review'
        },
        location: {
            name: 'Starcups',
            address: '125 High Street Reading',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            coords: {
                lat: 51.455041,
                lng: -0.9690884
            },
            openingTimes: [{
                days: 'Monday - Friday',
                opening: '7:00am',
                closing: '7:00pm',
                closed: false
            }, {
                days: 'Saturday',
                opening: '8:00am',
                closing: '5:00pm',
                closed: false
            }, {
                days: 'Sunday',
                closed: true
            }],
            reviews: [{
                author: 'Simon Holmes',
                rating: 5,
                timestamp: '16 July 2013',
                reviewText: 'What a great place. I can\'t say enough good things about it.'
            }, {
                author: 'Charlie Chaplin',
                rating: 3,
                timestamp: '16 June 2013',
                reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
            }]
        }
    });
};

/* GET add review page */
module.exports.addReview = function(req, res){
    res.render('location-review-form', {
        title: 'Review Starcups on Loc8r',
        pageHeader: {title: 'Review Starcups'}
    });
};
