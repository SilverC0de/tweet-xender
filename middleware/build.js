const axios = require('axios')
const auth = require('./auth')

/**
 * 
 * @param {rfj} url 
 * @param {*} auth 
 * @param {*} bus 
 * @param {*} next 
 */

async function buildtweet (url, auth, bus, next){
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