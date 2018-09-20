var express = require('express');
var session = require('express-session');
var ejs = require('ejs');
var fs = require('fs');
var bodyParser = require('body-parser');
var https = require('https');
var http = require('http');

//=========================================
// ALL USER MODULES/CERTIFICATES HERE
//=========================================

var key = fs.readFileSync('encryption/server.key');
var cert = fs.readFileSync('encryption/server.pem');
var controllers = require('./controllers/controllers');
var userModule = require('./models/user');
var game_server = require('./game/game-server');
var cache_controller = require('./game/controllers/CacheController');


//=========================================
// APP GLOBALS
//=========================================

var app = express();
var router = express.Router();

//=========================================
// ALL CONFIGS GO HERE
//=========================================

var sessionConfig = (session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
    //cookie:{secure:true}
}))

var options = {
    key: key,
    cert: cert,
    passphrase: 'admin'
};

//=========================================
// ALL USE STATEMENTS HERE
//=========================================
app.use(express.static("styles"));
app.use(express.static("modules"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(sessionConfig);
app.use(function (req, res, next) {
    if (req.secure) {
        return next();
    };
    res.redirect('https://' + req.hostname + ":" + httpsPort + req.url);
});

//=========================================
// ALL SET STATEMENTS HERE
//=========================================
app.set('view engine', 'ejs');

//=========================================
// GLOBAL VARIABLES
//=========================================

var sess;
var httpsPort = 8443;
//=========================================
// ROUTES
//=========================================

app.get("/", function (req, res) {
    console.log(req);
    sess = req.session;
    if (sess.name) {
        res.redirect(`${sess.name}/dashboard`);
    }
    else {
        var tabName = req.params.tab;
        res.render("home", { tab: tabName });
    }
});

app.get("/login", function (req, res) {
    sess = req.session;
    if (sess.name) {
        res.redirect(`${sess.name}/dashboard`);
    }
    else {
        res.render("login");
    }
});

app.post("/login", function (req, res) {
    console.log(req);
    sess = req.session;

    if (sess.name) {
        res.redirect(`${sess.name}/dashboard`);
    }
    else {
        controllers.userAuthenticationController.processRequest(req, function (err, user, token) {
            if (err) {
                throw (err);
            }
            else if (user) {
                sess.email = user.email;
                sess.name = user.name;
                res.send({
                    user_found: true,
                    name: user.name,
                    signin_type: req.body.signin_type,
                    session_id: sess.id
                });
            }
            else {
                if (token && token.verified) {
                    controllers.createUserController.createUser({
                        name: token.payload["name"],
                        email: token.payload["email"],
                        password: null,
                        sub_id: token.payload["sub_id"],
                        login_method: "signin_google"
                    },
                        function (err, user) {
                            if (err) {
                                throw (err);
                            }
                            else {
                                if (user) {
                                    sess.email = user.email;
                                    sess.name = user.name;
                                    res.send({
                                        user_found: true,
                                        name: user.name,
                                        signin_type: req.body.signin_type,
                                        session_id: sess.id
                                    });
                                }
                                else {
                                    res.send("Problem happened while login in using google account")
                                }
                            }
                        });
                }
                else {
                    res.send({
                        user_found: false,
                        name: "",
                        signin_type: req.body.signin_type,
                        session_id: null
                    });
                }
            }
        });
    }
});

app.get("/:name/dashboard", function (req, res) {
    console.log(req);
    sess = req.session;
    var name = req.params.name;
    if (sess.name) {
        if(sess.name === name)
            res.render("dashboard", { user: sess.name });
        else
            res.redirect("/");
    }
    else {
        res.redirect("/login");
    }
});

app.get("/signup", function (req, res) {
    console.log(req);
    sess = req.session;
    if (sess.name) {
        res.redirect(`${sess.name}/dashboard`);
    }
    else {
        res.render("signup");
    }
});

app.post("/signup", function (req, res) {
    controllers.createUserController.processRequest(req, function (err, user) {
        if (err) {
            throw (err);
            res.send({
                user_found: false,
                status: "user_failed",
                message: "Something went wrong while creating user"
            });
        }
        else {
            if (user) {
                res.send({
                    user_found: true,
                    status: "user_exist",
                    message: `User Account with ${req.body.email} already exists`
                });
            }
            else {
                res.send({
                    user_found: false,
                    status: "user_created",
                    message: "User account created successfully"
                });
            }
        }
    });
});

app.get("/logout", function (req, res) {
    sess = req.session;
    if (sess.name) {
        sess.name = null;
        res.redirect("/");
    }
});

app.get("/somthingwentwrong", function (req, res) {
    res.send("There is somthing went wrong while processing request");
});

//=========================================
// CREATING SERVER
//=========================================

http.createServer(app).listen(10000, function () {
    console.log("Created HTTP server to listen on Port 10000");
    cache_controller.refreshCache();
});

https.createServer(options, app).listen(httpsPort, function () {
    console.log("Created HTTPS server to listen on Port 8443");
});


