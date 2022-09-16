__path = process.cwd()

/*
* Created by: DanzzCoding | danzzcodingweb.vercel.app
*/

// Module
var fetch = require('node-fetch');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var isUrl = require('is-url');
var googleIt = require('google-it');
var gis = require('g-i-s');
var express = require('express');
var router  = express.Router();

// Lib
const danzz = require("../lib/listapi");
const { fetchJson, runtime, getBuffer } = require('../lib/myfunc');

creator = 'Danzz Coding'

// Loghandler
loghandler = {
    error: {
        status: false,
        code: 503,
        message: 'Error, Service Unavaible',
        maintanied_by: 'Danzz Coding'
    },
    noturl: {
    	status: false,
    	code: 403,
    	message: 'Error, Invlid Url',
    	maintanied_by: 'Danzz Coding'
    },
    nottext: {
    	status: false,
    	code: 403,
    	message: 'Error, Invlid Text',
    	maintanied_by: 'Danzz Coding'
    },
    nottext1: {
    	status: false,
    	code: 403,
    	message: 'Error, Invlid Text 1',
    	maintanied_by: 'Danzz Coding'
    },
    nottext2: {
    	status: false,
    	code: 403,
    	message: 'Error, Invlid Text 2',
    	maintanied_by: 'Danzz Coding'
    },
    notquery: {
    	status: false,
    	code: 403,
    	message: 'Error, Invlid Query',
    	maintanied_by: 'Danzz Coding'
    },
    notfound: {
    	status: false,
    	code: 404,
    	message: 'Error, Not Found',
    	maintanied_by: 'Danzz Coding'
    },
    notid: {
    	status: false,
    	code: 404,
    	message: 'Error, Invalid Id or Username',
    	maintanied_by: 'Danzz Coding'
    },
    ready: {
    	status: false,
    	code: 403,
    	message: 'Error, ​​Already In Use',
    	maintanied_by: 'Danzz Coding'
    }
}

// Features
// Downloader
router.get('/downloader/youtube', async (req, res, next) => {
	var url = req.query.url
	if (!url) return res.json(loghandler.noturl)

danzz.youtube(url)
.then(data => {
	if (!data.links) return res.json(loghandler.noturl)
	res.json({
	status: true,
	creator: `${creator}`,
	result:	data
	})
	})
	 .catch(e => {
		res.json(loghandler.error)
})
})

router.get('/downloader/facebook', async (req, res, next) => {
	var url = req.query.url
	if (!url) return res.json(loghandler.noturl)  
	
danzz.facebook(url)
.then(data => {
	if (!data.links) return res.json(loghandler.noturl)
	res.json({
	status: true,
	creator: `${creator}`,
	result:	data
	})
	})
	 .catch(e => {
		res.json(loghandler.error)
})
})

router.get('/downloader/twitter', async (req, res, next) => {
	var url = req.query.url
	if (!url) return res.json(loghandler.noturl)   
	
danzz.twitter(url)
.then(data => {
	if (!data.thumb ) res.json(loghandler.noturl)
var result = data
res.json({
status: true,
creator: `${creator}`,
result
})
})
.catch(e => {
res.json(loghandler.error)
})
})

router.get('/downloader/tiktok', async (req, res, next) => {
	var url = req.query.url
	if (!url) return res.json(loghandler.noturl)  
	
danzz.tiktok(url)
.then(data => {
	if (!data.video) return res.json(loghandler.noturl)
	var result = data
	res.json({
	status: true,
	creator: `${creator}`,
		result
	})
	})
	 .catch(e => {
	
		res.json(loghandler.noturl)
})
})

router.get('/downloader/instagram', async (req, res, next) => {
	var url = req.query.url
	if (!url) return res.json(loghandler.noturl)
	
	danzz.instagram(url)
	.then(data => {
		if (!data) return res.json(loghandler.noturl)
		var result = data
		res.json({
			status: true,
	        creator: `${creator}`,
			result
		})
		})
         .catch(e => {
         
			 res.json(loghandler.error)
})
})

router.get('/downloader/igstory', async (req, res, next) => {
	var username = req.query.username
	if (!username) return res.json(loghandler.notid)
	
	danzz.igstory(username)
	.then(data => {
		if (!data) return res.json(loghandler.notfound)
		var result = data
		res.json({
			status: true,
	        creator: `${creator}`,
			result
		})
		})
         .catch(e => {  
			 res.json(loghandler.error)
})
})

router.get('/downloader/igreels', async (req, res, next) => {
	var url = req.query.url
	if (!url) return res.json(loghandler.noturl)
	
	danzz.instagram(url)
	.then(data => {
		if (!data) return res.json(loghandler.noturl)
		var result = data
		res.json({
			status: true,
	        creator: `${creator}`,
			result
		})
		})
         .catch(e => {     
			 res.json(loghandler.error)	
})
})

// Asupan
router.get('/asupan/random', async (req, res, next) => {
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/asupan/random.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/video.mp4', data)
        res.sendFile(__path+'/tmp/video.mp4')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
})
router.get('/asupan/santuy', async (req, res, next) => {        
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/asupan/santuy.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/video.mp4', data)
        res.sendFile(__path+'/tmp/video.mp4')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
})
router.get('/asupan/bocil', async (req, res, next) => {        
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/asupan/bocil.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/video.mp4', data)
        res.sendFile(__path+'/tmp/video.mp4')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
})
router.get('/asupan/ukhty', async (req, res, next) => {        
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/asupan/ukhty.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/video.mp4', data)
        res.sendFile(__path+'/tmp/video.mp4')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
})
router.get('/asupan/hijaber', async (req, res, next) => {
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/asupan/hijaber.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/video.mp4', data)
        res.sendFile(__path+'/tmp/video.mp4')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
})

// Cecan
router.get('/cecan/random', async (req, res, next) => {
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/cecan/random.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/image.png', data)
        res.sendFile(__path+'/tmp/image.png')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
})
router.get('/cecan/hijaber', async (req, res, next) => {
        fetch(encodeURI(`https://raw.githubusercontent.com/Danzzxcodes/scraper/main/cecan/hijaber.json`))
        .then(response => response.json())
        .then(async data => {
        var result = data[Math.floor(Math.random() * data.length)];
        var buffer = result.url;
         data = await fetch(buffer).then(v => v.buffer())
         await fs.writeFileSync(__path +'/tmp/image.png', data)
        res.sendFile(__path+'/tmp/image.png')
         })
         .catch(e => {
         	console.log(e);
         	res.json(loghandler.error)
})
})

// Search
router.get('/search/youtube', async (req, res, next) => {
	var query = req.query.q
	if (!query ) return res.json(loghandler.notquery) 

	let yts = require("yt-search")
	let search = await yts(query)
	let anu = search.videos[Math.floor(Math.random() * search.videos.length)]

	let { yta, ytv } = require('../lib/y2mate')
	let mp3 = await yta(anu.url, '320kbps')
	let mp4 = await ytv(anu.url, '360p')
		res.json({
			status: true,
			creator: `${creator}`,
			result: {
				Link: anu.url,
				Title: anu.title,
				Description : anu.description,
				Idvideo: anu.videoId,
				Duration: anu.timestamp,
				Viewer: anu.views,
				UploadedOn : anu.ago,
				Author : anu.author.name,
				Channel : anu.author.url,
				linldowloader: {
					mp3: mp3.dl_link,
					mp4:{ 
						link: mp4.dl_link,
						filesize: mp4.filesizeF
					}
				}

	} })
})
router.get('/search/pinterest', async (req, res, next) => {
	var query = req.query.q
	
	if (!query) return res.json(loghandler.notquery)   
	
danzz.pinterest(query)
.then((data) =>{ 
	if (!data[0]) return res.json(loghandler.notfound)
  res.json({
	status: true,
	creator: `${creator}`,
	result: data
})
})
.catch((err) =>{
 res.json(loghandler.notfound)

})
})

router.get('/search/google', async (req, res, next) => {
	var query = req.query.q
	
	if (!query) return res.json(loghandler.notquery)   
	
googleIt({'query': query}).then(results => {
		if (!results[0]) return res.json(loghandler.notfound)
			res.json({
				status: true,
				creator: `${creator}`,
				result: results
			})

	}).catch(e => {	
		res.json(loghandler.notfound)
	})
})

router.get('/search/googleimage', async (req, res, next) => {
	var query = req.query.q
	
	if (!query) return res.json(loghandler.notquery)   
	
var gis = require('g-i-s')
gis(query, logResults)

function logResults(error, results) {
  if (error) {
	res.json(loghandler.notfound)
  }
  else {
	if (!results[0]) return res.json(loghandler.notfound)
	res.json({
		status: true,
		creator: `${creator}`,
		result:  results
	})
   
  }
}

})


// Canvas
router.get('/canvas/sadcat', async (req, res, next) => {
var text = req.query.text
if (!text) return res.json(loghandler.nottext) 

var requestSettings = {
url: `https://myselfff.herokuapp.com/docs/canvas/sadcat?text=${text}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
})

router.get('/canvas/facts', async (req, res, next) => {
var text = req.query.text
if (!text) return res.json(loghandler.nottext) 

var requestSettings = {
url: `https://myselfff.herokuapp.com/docs/canvas/facts?text=${text}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
})

router.get('/canvas/biden', async (req, res, next) => {
var text = req.query.text
if (!text) return res.json(loghandler.nottext) 

var requestSettings = {
url: `https://myselfff.herokuapp.com/docs/canvas/biden?text=${text}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
})

router.get('/canvas/oogway', async (req, res, next) => {
var text = req.query.text
if (!text) return res.json(loghandler.nottext) 
	
var requestSettings = {
url: `https://myselfff.herokuapp.com/docs/canvas/oogway?text=${text}`, method: 'GET', encoding: null };
request(requestSettings, function(error, response, body) {
res.set('Content-Type', 'image/png');
res.send(body)
})
})

// Random
router.get('/random/meme', async (req, res, next) => {  
fetch(encodeURI(`https://api-yogipw.herokuapp.com/api/random/meme`))
.then(response => response.json())
.then(data => { var result = data;
res.json({ result })
})
})

module.exports = router
