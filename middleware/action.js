module.exports = {
    start: (request, response, next) => {
        //validate and prepare bot
        
        console.log('start')
        next()
    },
    getTweet: (req, res, next) => {
        res.send('middleware ok')
    },
    getUser: (req, res, next) => {
        res.send('send ok')
    },
    getMedia: (req, res, next) => {
        console.log('media')
        next()
    }
}