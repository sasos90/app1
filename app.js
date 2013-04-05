var express = require('express'),
    url     = "mongodb://nodejitsu_zoranf:s622he159nr7g8isgjke2i1ght@ds051947.mongolab.com:51947/nodejitsu_zoranf_nodejitsudb8036041315",
    coll    = ['users', 'games'],
    db      = require('mongojs').connect(url, coll)
    http    = require('http'),
    path    = require('path');
    app     = express(),
    server  = http.createServer(app);
    //io      = require('socket.io').listen(server);
 
app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon(__dirname + '/public/images/favicon.ico')); 
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
    app.locals();
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});
 
app.configure('development', function() {
    app.use(express.errorHandler());
});

app.configure('production', function() {
    app.use(express.errorHandler());
});

///////////////////////////
// routes                //
///////////////////////////

// Functions
function isLoggedIn(req, res) {

    if (req.cookies.user)
        return true;
    else
        return false;
}

// GET
// For all routes
app.get('/*', function(req, res, next) {

    if (isLoggedIn(req, res))
        res.locals.signin = true;
    else
        res.locals.signin = false;

    next();
});

// Index
app.get('/', function(req, res) {

    db.games.find(function(err, docs) {

        res.render('index', {
            title: 'Home',
            games: docs
        });
    });
});

// Lobby
app.get('/lobby/:id', function(req, res) {

    res.cookie('user', '1');

    db.games.find( { name: req.params.id }, function(err, game) {

        if (err || game == '') {

            return res.render('404', {
                title: 'Game not found',
                message: 'Game ' + req.params.id + 'not found'
            });
            
        }

        return res.render('lobby', { title: 'Lobby', name: req.params.id });
    });
});

// Room
app.get('/room/:id', function(req, res) {

    res.render('room', { title: 'Room'});
});

// Profile
app.get('/profile', function(req, res) {

    res.render('profile', {
        title: 'Profile'
    });
});

// Sign out
app.get('/signout', function(req, res) {

    res.clearCookie('user');
    res.redirect('/');
});

// POST
// Sign in
app.post('/sign_in', function(req, res) {

    res.redirect();
});

// Sing up
app.post('/sign_up', function() {

    res.redirect();
});

///////////////////////////
// error                 //
///////////////////////////

// 404 File not found
app.use(function(req, res, next) {

    res.status(404);
    res.render('404', { 
        title: '404 File not found',
        message: '404 File not found'
    });
});

// 500 Internal server error
app.use(function(err, req, res, next) {

    res.status(500);
    res.render('500', {
        title: '500 Internal server error',
        message: '500 Internal server error'
    });
});

server.listen(app.get('port'), function() { console.log("Express server listening on port " + app.get('port')); });

/*io.sockets.on('connection', function(socket) {

    socket.on('connect', function(msg) {

        console.log('Connected: ' + msg.lol);
    });

    socket.on('disconnect', function(data) {

        console.log('data: ' + socket.id);
    });
});*/