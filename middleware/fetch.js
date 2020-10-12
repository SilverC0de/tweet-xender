const axios = require('axios')
const auth = require('./oauth')


/**
 * @author Balogun Silver @  https://github.com/SilverC0de 
 * 
 * @gettweet func gets a particular tweet's full text
 * 
 * Nothing much to see here
 * 
 * Moving on...
 */

async function gettweet (url, auth, bus, next){
    return await axios.get(url, {
        headers: auth
    }).then((body) => {
        if(body.data.errors == undefined ){
            bus.tweetBody = (body.data.data.text)
            next()
        } else {
            console.dir('tweet not found')
        }
    }).catch((e) => {
        console.log(e.message)
    })
}

module.exports = function (request, response, next){
    var ID = request.tweetID
    var url = `https://api.twitter.com/2/tweets/${ID}`
        
    var call = {
        url: url,
        method: 'get'
    }

    gettweet(url, auth(call), request, next)
}