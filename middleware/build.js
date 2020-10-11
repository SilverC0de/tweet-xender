const axios = require('axios')

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
        bus.tweetMedia = body.data
        console.log(body.data)
        next()
    }).catch((e) => {
        console.log(e.message)
    })
}

module.exports = function (request, response, next){
    buildtweet(request, next)
}