const axios = require('axios')
const auth = require('./oauth')

const redis = require('redis')
const redisClient = redis.createClient(6379)
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
        console.log('fetch ok')

        if(body.data.errors == undefined ){
            console.log('fetch tweet ok')
            console.dir(body.data.data.text)
            bus.tweetBody = (body.data.data.text)
        } else {
            console.log('tweet not found sir, but ok')
        }
        next()
    }).catch((e) => {
        console.log('tweet not found ????')
        //console.log(e.message)
    })
}

module.exports = function (request, response, next){
    var ID = request.tweetID
    var url = `https://api.twitter.com/2/tweets/${ID}`
        
    console.log('fetch')

    var call = {
        url: url,
        method: 'get'
    }

    console.log(`getch this ${request.tweetID}`)

    
    gettweet(url, auth(call), request, next)
}