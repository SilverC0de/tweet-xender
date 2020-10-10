const express = require('express')
const router = express.Router()

const action = require('../middleware/action')
const core = require('../controller/core')

router.route('/init').get(action.start, action.getMedia, core.execute)

module.exports = router