const Twitter = require('twitter')
const http = require('http')
const fs = require('fs')

/**
 * @author Balogun Silver @  https://github.com/SilverC0de 
 * 
 * @twitter node library came to our resque, axios and OAuth1.0 was already winning by 4 goals
 * 
 * So we get the image from the php output directory and process it using the twitter library
 * 
 * God no go shame us
 * 
 * We move
 * 
 */

var client = new Twitter({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET_KEY,
    access_token_key: process.env.TWITTER_TOKEN,
    access_token_secret: process.env.TWITTER_SECRET_TOKEN,
})

async function finalizeTweet(tweetTo, i) {
    await http.get(`http://isystem.herokuapp.com/output/${i}.png`, file => {
        const data = fs.createWriteStream(`bin/${i}.png`)
        file.pipe(data)
    
        data.on('finish', function() {
            var img = fs.readFileSync(`./bin/${i}.png`)
            
            client.post('media/upload', {media: img}, function(error, media, response) {
                if (!error) {
                    var tweet = {
                        status: 'Honourable, there you go 🙂',
                        in_reply_to_status_id: tweetTo,
                        media_ids: media.media_id_string,
                        auto_populate_reply_metadata: true
                    }
        
                    client.post('statuses/update', tweet, function(error, tweet, response) {} )
                }
            })
            
        })
    })
}


module.exports = (request, response) => {
    var i = request.tweetID
    var tweetTo = request.tweetTo
    
    finalizeTweet(tweetTo, i) //oya finiah nah
}