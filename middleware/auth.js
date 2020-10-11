const crypto = require('crypto');
const oauth1a = require('oauth-1.0a');

/**
 * OAuth access middleware is needed for all initialized requests
 */

module.exports = function (request){
    const oauth = oauth1a({
        consumer: { key: process.env.TWITTER_KEY, secret: process.env.TWITTER_SECRET_KEY },
        signature_method: 'HMAC-SHA1',
        hash_function(base_string, key) {
            return crypto
                .createHmac('sha1', key)
                .update(base_string)
                .digest('base64')
        },
    })

    const authorization = oauth.authorize(request, {
        key: process.env.TWITTER_TOKEN,
        secret: process.env.TWITTER_SECRET_TOKEN,
    });

    return oauth.toHeader(authorization);
}