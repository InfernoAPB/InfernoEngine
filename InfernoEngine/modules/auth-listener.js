var auth2; // The Sign-In object.
var googleUser; // The current user.

var loginform = document.getElementById("login_form");
var email = document.getElementById("inputEmail");
var password = document.getElementById("inputPassword");

var ele = document.createElement("div");
ele.setAttribute("class", "alert alert-danger");
ele.setAttribute("role", "alert");
ele.innerText = `Invalid UserId Or Password.`;

var appStart = function () {
    console.log("Starting Authentication App");
    gapi.load('auth2', initSigninV2);
};

var initSigninV2 = function () {

    auth2 = gapi.auth2.init({
        client_id: '226886959389-fdkvepgpnsdtmkeno01sqa6dhv4smgde.apps.googleusercontent.com',
        fetch_basic_profile: true,
        scope: 'profile'
    });

    // Listen for sign-in state changes.
    auth2.isSignedIn.listen(signinChanged);
    // Listen for changes to current user.
    auth2.currentUser.listen(userChanged);
    // Sign in the user if they are currently signed in.
    refreshValues();
};

/**
* Listener method for sign-out live value.
*
* @param {boolean} val the updated signed out state.
*/
var signinChanged = function (val) {
    console.log('Signin state changed to ', val);
};

/**
* Listener method for when the user changes.
*
* @param {GoogleUser} user the updated user.
*/
var userChanged = function (user) {
    googleUser = user;
    updateGoogleUser();
};

/**
* Updates the properties in the Google User table using the current user.
*/
var updateGoogleUser = function () {
    if (googleUser) {
    } else {
        console.log("User Null")
    }
};

/*
* Retrieves the current user and signed in states from the GoogleAuth
* object.
*/
var refreshValues = function () {
    if (auth2) {
        googleUser = auth2.currentUser.get();
        updateGoogleUser();
    }
}

function onGoogleSignInClicked() {
    console.log("onGoogleSignInClicked");
    auth2.signIn().then(function () {
        googleUser = auth2.currentUser.get();
        console.log("Signing In User : " + googleUser);
        if (googleUser) {
            var id_token = googleUser.getAuthResponse().id_token;
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "/login", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            var values = `signin_type=signin_google&token=${id_token}`;
            xhttp.onreadystatechange = function () {
                console.log(this.responseText);
                if (this.readyState == 4 && this.status == 200) {
                    var response = JSON.parse(this.responseText);
                    if (response.user_found) {
                        window.location.href = `${response.name}/dashboard`;
                    }
                    else {
                        loginform.insertBefore(ele, emailElement);
                    }
                }
            }
            xhttp.send(values);
        }
    }).catch((err) => {
        console.log(console.error(err));
    });
}

function onSignInClicked() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/login", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var values = `signin_type=signin_username&email=${email.value}&password=${password.value}`;
    xhttp.onreadystatechange = function () {
        console.log(this.responseText);
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            if (response.user_found) {
                window.location.href = `${response.name}/dashboard`;
            }
            else {
                loginform.insertBefore(ele, email);
            }
        }
    }
    xhttp.send(values);
}



