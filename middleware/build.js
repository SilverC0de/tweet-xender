const axios = require('axios')

/**
 * 
 * @param {*} bus acts as the request so we can append data to it
 * @param {*} next is to move on to the next activity or action
 * 
 * We are getting the bytes of the image and the already encoded base 64 string of the image ready for upload
 */

async function buildtweet (bus, next){
    var call = {
        url: 'http://127.0.0.1/tweet-xender/php/init.php',
        method: 'post',
        data: {
            user: bus.tweetUser,
            body: bus.tweetBody
        }
    }

    return await axios.request(call).then((body) => {
        
        bus.tweetImageBase64 = body.data.base64
        bus.tweetImageBytes = body.data.bytes
        
        next()
    }).catch((e) => {
        console.log(e.message)
    })
}

module.exports = function (request, response, next){
    buildtweet(request, next)
}