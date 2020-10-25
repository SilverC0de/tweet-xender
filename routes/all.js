const express = require('express')
const router = express.Router()

const getMentions = require('../middleware/mentions')
const getTweet = require('../middleware/fetch')
const buildTweet = require('../middleware/build')
const publishTweet = require('../controller/twitter')


/**
 * @author Balogun Silver @  https://github.com/SilverC0de 
 * 
 * @getMentions is used to get everyone who has mentioned previously
 * 
 * @getTweet is for getting the tweets before the mention
 * 
 * @buildTweet is for converting the tweet into readable and fancy image
 * 
 * @publichTweet is for uploading and tweeting the image
 * 
 * This is a step by step process of 3 middlewares and 1 controller, controller, **in Drake voice**
 * 
 * Can we go now? Thanks
 * 
 */

 const getEventloop = (request, response, next) => {
     response.send('Tweet Xender Processing 🤩😎')
     next()
 }

router.route('/init').get(getEventloop, getMentions)

module.exports = router