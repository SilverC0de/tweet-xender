const Twitter = require('twitter');

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

module.exports = (request, response) => {
    var data = require('fs').readFileSync('./php/output/silver.png')
    var tweetTo = request.tweetTo


    


    client.post('media/upload', {media: data}, function(error, media, response) {
        if (!error) {
            var tweet = {
                status: 'Honourable, there you go 🙂 #SARSMUSTEND',
                in_reply_to_status_id: tweetTo,
                media_ids: media.media_id_string,
                auto_populate_reply_metadata: true
            }

            client.post('statuses/update', tweet, function(error, tweet, response) {} )
        }
    })
}