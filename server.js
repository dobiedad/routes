var express = require('express')
var app = express()

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index')
})

app.listen(process.env.PORT || 4321, function () {
  console.log('listening on port 4321!')
})

app.use(express.static('./'))

module.exports = app
