var express = require('express');
var ejs = require('ejs');
var fs = require('fs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var https = require('https');
var http = require('http');
var database = require('./utils/database');
var userModule = require('./models/user');

var key = fs.readFileSync('encryption/server.key');
var cert = fs.readFileSync( 'encryption/server.pem' );

var httpsPort = 8443;
var options = { 
    key : key,
    cert : cert,
    passphrase: 'admin'
};
var app = express();
var router = express.Router();
app.use(express.static("styles"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use(function(req,res,next)
{
    if(req.secure)
    {
        return next();
    };
    
    res.redirect('https://' + req.hostname +":"+ httpsPort + req.url);
});

app.get("/", function (req, res) {
    var tabName = req.params.tab;
    res.render("home",{tab:tabName});
});

app.get("/login", function (req, res) {
    res.render("login", { userFound: true });
});

app.get("/outh2callback", function (req, res) {
    res.send("OAuth 2 call back is successful");
});

app.get("/signup", function (req, res) {
    res.render("signup", { userEmail : "",userFound: false, passwordMatch : true});
});

app.get("/dashboard", function (req, res) {
    res.render("signup", { userEmail : "",userFound: false, passwordMatch : true});
});

app.post("/signin", function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var found = false;
    userModule.UserModel.find({email:email,password:password},function (error, userAccounts) {
        var userAccount = null;
        if(userAccounts && userAccounts.length > 0)
        {
            found = true;
            userAccount = userAccounts[0];
        }
        if (!found) {
            res.render("login", { userFound: found });
        }
        else {
            res.redirect("dashboard", { user: userAccount.name });
        }
     });
});

app.post("/createUser", function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    var confirmPassword = req.body.confirmPassword;
    var found = false;
    var passwordDontMatch = false;

    if(confirmPassword !== password)
    {
        res.render("signup", { userFound : false, userEmail:"",passwordMatch : false });
        return;
    }

    userModule.UserModel.find({email:email},function (error, userAccounts) {
        var userAccount = null;
        if(userAccounts && userAccounts.length > 0)
        {
            found = true;
            userAccount = userAccounts[0];
        }
        if (!found) 
        {
             var user = new userModule.UserModel({name : name, email : email,password : password,device:"affkahjdfo8jaoidupejfkjoija"});
             user.save(function (err,user){
                 if(err) return console.error(err);
                 console.log(user);
                 res.render("login",{userFound : true});
             });
        }
        else {
            res.render("signup", { userFound : found, userEmail: userAccount.email,passwordMatch : true });
        }
     });
});

http.createServer(app).listen(10000,function () {
         console.log("Created HTTP server to listen on Port 10000");
});

https.createServer(options,app).listen(httpsPort,function () {
    console.log("Created HTTPS server to listen on Port 443");
});


