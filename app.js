var express = require('express'),
    nano    = require('nano')('http://127.0.0.1:5984/'),
    url     = "mongodb://nodejitsu_zoranf:s622he159nr7g8isgjke2i1ght@ds051947.mongolab.com:51947/nodejitsu_zoranf_nodejitsudb8036041315",
    coll    = ['games', 'users'],
    db      = require('mongojs').connect(url, coll),
    routes  = require('./routes'),
    http    = require('http'),
    path    = require('path');
    app     = express(),
    server  = http.createServer(app),
    io      = require('socket.io').listen(server);
 
app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon(__dirname + '/public/images/favicon.ico')); 
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});
 
app.configure('development', function(){
    app.use(express.errorHandler());
});
 
///////////////////////////
// routes                //
///////////////////////////

// GET
// Index
app.get('/', function(req, res) {

    db.games.find(function(err, docs) {

        res.render('index', {
            title: 'Home',
            games: docs
        });
        console.log(docs);
    });
});

// Lobby
app.get('/lobby/:id', function(req, res) {

    res.render('lobby', { title: 'Lobby', name: req.params.id });
});

// Room
app.get('/room/:id', function(req, res) {

    res.render('room', { title: 'Room'});
    var room_id = req.params.id;
});

// POST

// A user model object
function user(username, password, nickname) {

    this.username = username;
    this.password = password;
    this.nickname = nickname;
}

app.post("/sign_up", function(req, res){
    
    var uporabnik = new user(req.body.username, req.body.password, req.body.nickname);
    
    if(db.users.find({"username":req.body.username}).count() > 0) {
        res.render('fajl', {title: 'Error', msg: 'Uporabnik že obstaja!'});
    }
    else {
        db.users.save(uporabnik, function(err, saved_user) {

            if (err || !saved_user) res.render('fajl', {title: 'Error', msg: 'Neuspesno'});
            else res.render('fajl', {title: 'Success', msg: 'Uspesno'});
        });
    }
});


///////////////////////////
// error                 //
///////////////////////////

// 404 File not found
app.use(function(req, res, next) {

    res.status(404);
    res.render('404', { title: '404 File not found'});
});

// 500 Internal server error
app.use(function(err, req, res, next) {

    res.status(500);
    res.render('500', { title: '500 Internal server error'});
});

server.listen(app.get('port'), function() { console.log("Express server listening on port " + app.get('port')); });

io.sockets.on('connection', function(socket) {

    socket.on('connect', function(msg) {

        console.log('Connected: ' + msg.lol);
    });

    socket.on('disconnect', function(data) {

        console.log('data: ' + socket.id);
    });
});