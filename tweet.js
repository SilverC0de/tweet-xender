require('dotenv').config()
const express = require('express')
const api = express()


require('./routes')(api)

// api.all('*', (request, response) => {
//   response.send('Tweet Xender running 😛😛')
// })


api.listen(process.env.PORT, () => {
  console.log(`Xend listening at http://localhost:${process.env.PORT}`)
})

module.exports = api