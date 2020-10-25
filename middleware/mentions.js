const axios = require('axios')
const redis = require('redis')
const auth = require('./oauth')

const redisClient = redis.createClient(6379)

/**
 * @author Balogun Silver @  https://github.com/SilverC0de 
 * 
 * @mentions func is to get all mentions aynsronously
 * 
 * Then use Redis to keep track of some data
 * 
 */

async function mentions(url, auth, bus, next){
    return await axios.get(url, {
        headers: auth
    }).then((body) => {
    
        console.log('mention ok')

        redisClient.set('last', body.data[0].id_str)
        console.log(`save redis ${body.data[0].id_str}`)
        for(var i in body.data){
            console.log('count')
            bus.tweetTo = body.data[i].id_str
            bus.tweetFrom = body.data[i].in_reply_to_screen_name
            bus.tweetID = body.data[i].in_reply_to_status_id_str
            bus.tweetUser = body.data[i].user.screen_name
            next() 
        }
    }).catch((e) => {
        console.log('mention err')
        console.log(e.message)
    })
}



module.exports = function (request, response, next) {
    redisClient.get("last", (e, lastID) => {
        var lastID = '1161332894725550081'
        if(e){
            console.log('could not get redis last')
        } else {
            var url = `https://api.twitter.com/1.1/statuses/mentions_timeline.json?since_id=${lastID}&count=4`
            var call = {
                url: url,
                method: `get`
            }
        
            //start async initialization
            mentions(url, auth(call), request, next)        
        }
    })
    
}