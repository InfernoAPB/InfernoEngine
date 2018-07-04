var express = require('express');
var ejs = require('ejs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static("styles"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var database = require('./utils/database');
var userModule = require('./models/user');

app.get("/", function (req, res) {
    var tabName = req.params.tab;
    res.render("home",{tab:tabName});
});

app.get("/login", function (req, res) {
    res.render("login", { userFound: true });
});

app.get("/signup", function (req, res) {
    res.render("signup", { userFound: true });
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
            res.render("dashboard", { user: userAccount.name });
        }
     });
});

app.post("/createuser", function (req, res) {
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
            res.render("dashboard", { user: userAccount.name });
        }
     });
});


app.get("*", function (req, res) {
    res.send("Sorry, page not found..");
});


app.listen(10000, function () {
    console.log("Server Has Started");
})

