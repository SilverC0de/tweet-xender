const axios = require('axios')
const auth = require('./oauth')


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
        bus.tweetTo = body.data[0].id_str
        bus.tweetFrom = body.data[0].in_reply_to_screen_name
        bus.tweetID = body.data[0].in_reply_to_status_id_str
        bus.tweetUser = body.data[0].user.screen_name
        next()
    }).catch((e) => {
        console.log(e.message)
    })
}



module.exports = function (request, response, next) {
    var lastID = '1161332894725550081'
    var url = `https://api.twitter.com/1.1/statuses/mentions_timeline.json?since_id=${lastID}&count=2`
    
    
    var call = {
        url: url,
        method: `get`
    }

    //start async initialization
    mentions(url, auth(call), request, next)
}