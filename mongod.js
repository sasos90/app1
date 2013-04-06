var url 	= "mongodb://nodejitsu_zoranf:s622he159nr7g8isgjke2i1ght@ds051947.mongolab.com:51947/nodejitsu_zoranf_nodejitsudb8036041315",
	coll	= ['users'],
	db 		= require('mongojs').connect(url, coll);

// A user model object
function user(username, password, nickname) {

	this.username = username;
	this.password = password;
	this.nickname = nickname;
}

//db.users.remove({"username":"zoran.felbar@gmail.com"});

db.users.ensureIndex({username:1}, {unique:true});

var user1 = new user("zoran.felbar@gmail.com", "admin", "zoki");
/*db.users.save(user1, function(err, saved_user) {

	if (err || !saved_user) console.log("not saved: " + err);
	else console.log("Suksess");
});*/

db.users.find(function(err, users) {

	if (err || !users.length) console.log("username: " + user.username + " not found");
	else users.forEach(function(user) {

		console.log("User found " + user.username);
	});
});