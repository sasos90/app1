var nano    = require('nano')('http://127.0.0.1:5984/'),
    db      = nano.use('user');

exports.index = function(req, res) {

    res.render('index', {title: 'Home'});
};

exports.about = function(req, res) {

	res.render('about', {title: 'About'});
};

exports.lobby = function(req, res) {
    

    if (req.params.host && req.params.name && req.params.type) {

    	// res.send("Room: " + req.params.host + "/" + req.params.name + "/" + req.params.type);
    	var obj = {title 	: "Room",
    				game	: req.params.id,
    				host	: req.params.host,
    				name	: req.params.name,
    				type	: req.params.type }
    	res.render("room", obj);
    } else {

    	res.render('lobby', { title: 'Lobby' + req.params.id, name: req.params.id } );
    }
};

exports.room = function(req, res) {

    res.render('room', { title: "Room" + req.params.id, stevilka: req.params.id } );
};