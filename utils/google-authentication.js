const { OAuth2Client } = require('google-auth-library');

var config = require('../configs/oAuthClient.json')

const client = new OAuth2Client(config.web.client_id);

// VERIFIED TOKEN FORMAT
// {
//     // These six fields are included in all Google ID Tokens.
//     "iss": "https://accounts.google.com",
//     "sub": "110169484474386276334",
//     "azp": "1008719970978-hb24n2dstb40o45d4feuo2ukqmcc6381.apps.googleusercontent.com",
//     "aud": "1008719970978-hb24n2dstb40o45d4feuo2ukqmcc6381.apps.googleusercontent.com",
//     "iat": "1433978353",
//     "exp": "1433981953",
   
//     // These seven fields are only included when the user has granted the "profile" and
//     // "email" OAuth scopes to the application.
//     "email": "testuser@gmail.com",
//     "email_verified": "true",
//     "name" : "Test User",
//     "picture": "https://lh4.googleusercontent.com/-kYgzyAWpZzJ/ABCDEFGHI/AAAJKLMNOP/tIXL9Ir44LE/s99-c/photo.jpg",
//     "given_name": "Test",
//     "family_name": "User",
//     "locale": "en"
//    }


async function verify(token, callback) {
    var legit = false;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: config.web.client_id
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    if (payload["aud"] === config.web.client_id
        && payload["iss"] === "accounts.google.com"
        && (payload["exp"] >  new Date().getUTCMilliseconds())
    ) 
    {
        legit = true;
    }
    var result = {
        verified : legit,
        payload : payload
    }
    callback(null,result);
}

module.exports = {
    verify
}