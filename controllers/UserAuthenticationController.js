var userModule = require('../models/user');
var googleAuthentiction = require('../utils/google-authentication');


function processRequest(req, callback) {
    var signinType = req.body.signin_type;
    if (signinType === "signin_username") {
        var email = req.body.email;
        var password = req.body.password;
        var found = false;
        userModule.findUser({ login_method: signinType, email: email, password: password }, function (error, userAccounts) {
            var userAccount = null;
            if (userAccounts && userAccounts.length > 0) {
                found = true;
                userAccount = userAccounts[0];
            }
            if (!found) {
                //res.render("dashboard", { user: "Aniket" });
                callback(null,null,null);
            }
            else {
               // res.render("dashboard", { user: userAccount.name });
               callback(null,userAccount,null);
            }
        });
    }
    else if (signinType === "signin_google") {
        var token = req.body.token;
        console.log(token);
        googleAuthentiction.verify(token, function (err, result) {
            if (err) {
                callback(err,null,null);
            }
            else if (result.verified) {
                userModule.findUser({ login_method: signinType, sub_id: result.payload["sub"] }, function (error, userAccounts) {
                    var userAccount = null;
                    if (userAccounts && userAccounts.length > 0) {
                        found = true;
                        userAccount = userAccounts[0];
                    }
                    if (!found) {
                        callback(null,null,result);
                    }
                    else {
                        callback(null,userAccount,null);
                    }
                });
            }
        });
    }
}


module.exports ={
    processRequest
}