var userModule = require('../models/user');

function processRequest(req,callback)
{
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    var confirmPassword = req.body.confirmPassword;
    var found = false;
    var passwordDontMatch = false;

    userModule.findUser({ email: email }, function (error, userAccounts) {
        var userAccount = null;
        if (userAccounts && userAccounts.length > 0) {
            found = true;
            userAccount = userAccounts[0];
        }
        if (!found) {
            userModule.createUser(
                { 
                    name: name, 
                    email: email, 
                    password: password,
                    sub_id:null,
                    login_method:"signin_username"
                },
                function (err, user) {
                    if (err) 
                    {
                       console.error(err);
                       callback(err,null);
                    }
                    else
                    {
                        console.log(user);
                        callback(err,null);
                    }
                }
            );
        }
        else {
            callback(error,userAccount);
        }
    });
}

function createUser(values, callback)
{
    userModule.findUser({ email: values.email }, function (error, userAccounts) {
        var userAccount = null;

        if (userAccounts && userAccounts.length > 0) {
            found = true;
            userAccount = userAccounts[0];
        }

        if (!found) {
            userModule.createUser(
                { 
                    name: values.name, 
                    email: values.email, 
                    password:values.password,
                    sub_id:values.sub_id,
                    login_method:values.login_method
                },
                function (err, user) {
                    if (err) 
                    {
                       console.error(err);
                       callback(err,null);
                    }
                    else
                    {
                        console.log(user);
                        callback(err,user);
                    }
                }
            );
        }
        else {
            callback(error,userAccount);
        }
    });
}


module.exports = {
    processRequest,
    createUser
}