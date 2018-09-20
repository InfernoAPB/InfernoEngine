var crypto = require('crypto');

// // Synchronous
// const buf = crypto.randomBytes(16);
// console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);

function getUuid()
{
    return crypto.randomBytes(16).toString('hex');
}

module.exports = {
    getUuid
}