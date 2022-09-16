__path = process.cwd()

/*
* Created by: DanzzCoding | danzzcodingweb.vercel.app
*/

// Module
var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var { performance } = require('perf_hooks');

creator = 'Danzz Coding'

// Lib
const { runtime, fetchJson } = require('../lib/myfunc')

// Info Api
router.get('/info/api', async (req, res, next) => {
	info = {
		status: true,
		creator: 'Danzz Coding',
		make: '8, September, 2022',
		language: 'node.js, html, css, js'
    }
    res.json(info)
})

// Main Api
// Statistic
router.get('/main/statistic', async (req, res, next) => {
var date = new Date
var hour = date.getHours()
var minute = date.getMinutes()
var second = date.getSeconds()
var neww = performance.now()
var old = performance.now()
var ram = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB`
var cpu = require('os').cpus()
var json = await (await fetch('https://api.ipify.org/?format=json')).json()
var port = process.env.PORT || 8080 || 5000 || 3000 
    status = {
        status: true,
        memory: ram,
        cpu: cpu,
        port: port,
        ip: json.ip,
        time: `${hour} : ${minute} : ${second}`,        
        speed: `${old - neww}ms`,
        info:{       
            creator: 'Danzz Coding'
        }
    }
    res.json(status)
})

// Runtime
router.get('/main/runtime', async (req, res, next) => {
	runtim = {
		status: true,
		runtime: muptime(process.uptime()),
		info:{       
            creator: 'Danzz Coding'            
        }
    }
    res.json(runtim)
})

// Domain
router.get('/', (req, res) => {
    res.sendFile(__path + '/views/home.html')
})

router.get('/docs', (req, res) => {
    res.sendFile(__path + '/views/dashboard.html')
})

router.get('/myprofile', (req, res) => {
    res.sendFile(__path + '/views/myprofile.html')
})

router.get('/donation', (req, res) => {
    res.sendFile(__path + '/views/donation.html')
})

router.get('/payment', (req, res) => {
    res.sendFile(__path + '/views/payment.html')
})

router.get('/success-change', (req, res) => {
    res.sendFile(__path + '/views/success.html')
})

router.get('/login', (req, res) => {
    res.sendFile(__path + '/views/login.html')
})

router.get('/signup', (req, res) => {
    res.sendFile(__path + '/views/signup.html')
})

module.exports = router

// Func Runtime
function muptime(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return pad(hours) + ' : ' + pad(minutes) + ' : ' + pad(seconds)
}
