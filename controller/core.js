module.exports = {
    execute: (request, response) => {
        var tweetStatus = './input/tile.jpg'
        var tweetMedia = `./output/${Date.now()}.jpeg`
        var tweetID = '2378458324'
        
        console.log('end')

        //send this to twitter tweet endpoint biko
        response.send('Tweet Xender processing 🤩😋')
    }
}