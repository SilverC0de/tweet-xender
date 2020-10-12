const axios = require('axios')

/**
 * @author Balogun Silver @  https://github.com/SilverC0de 
 * 
 * @buildtweet is making use of PHP's image library image.invention fo create a near perfect image
 * 
 * We are getting a 204 response as a success and 400 as failed image conversion
 * 
 * Image is located inside ./php/output
 * 
 * We tried Jimp and it was giving us headache, Us as in Me
 * 
 * So i used PHP, Node.js ambassadors, comman kill me
 */

async function buildtweet (bus, next){
    var call = {
        url: 'http://localhost/tweet-xender/php/init',
        method: 'post',
        data: {
            user: bus.tweetFrom,
            body: bus.tweetBody
        }
    }

    return await axios.request(call).then((body) => {    
        next()
    }).catch((e) => {
        console.log(e.message)
    })
}

module.exports = function (request, response, next){
    buildtweet(request, next)
}