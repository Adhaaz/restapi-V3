__path = process.cwd()

/*
* Created by: DanzzCoding | danzzcodingweb.vercel.app
*/

// Module
const express = require('express'); 
const app = express();
var createError = require('http-errors')
var favicon = require('serve-favicon')
var path = require('path')
var cookieParser = require('cookie-parser');

cors = require('cors'),

    secure = require('ssl-express-www');
const PORT = process.env.PORT || 8080 || 5000 || 3000

app.use(favicon(path.join(__dirname,'assets','images','icon.png')))

var main = require('./routes/main'),
    api = require('./routes/api')

app.set('trust proxy', true);
app.set("json spaces",2)
app.use(cors())
app.use(secure)
app.use(cookieParser());
app.use(express.static("assets"))
app.use('/', main)
app.use('/api', api)

app.use(function (req, res, next) {
	next(createError(404))
  })

app.use(function (err, req, res, next) {
	
	res.sendFile(__path + '/views/error.html')
  })


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:` + PORT)
console.log(`Hii Danzz Coding`)
})

module.exports = app