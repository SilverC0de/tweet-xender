const express = require('express')
const router = express.Router()

const getMentions = require('../middleware/mentions')
const fetchTweet = require('../middleware/fetch')
const core = require('../controller/core')

//steps in making this hapen
//getting the mentions

router.route('/init').get(getMentions, fetchTweet)


module.exports = router