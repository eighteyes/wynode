var Twit = require('twit');
var http = require('http');
var connect = require('connect');
var qs = require('querystring');

// Serves all static files in directory
connect.createServer(
  connect.static(__dirname)
).listen(80);

var T = new Twit({
  consumer_key: 'LIZ00QmqWQtHwzwJ1mKAPEhjN',
  consumer_secret: 'SWsW8VxkKSuwIfRxqEDgkovyJLkYJvmZC7WXuNCthhsYesFbk7',
  access_token: '29486761-qndKDmeeXkfGDTD4FpszAIiqCv9uTvbHpFSHvX0OE',
  access_token_secret: '92MBnfnTALb01rRHRdvgkNzVDbBsGYJIprP2thygeFUi9'
});

http.createServer(function(req, res) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  var data = "";
  if (req.method == "POST") {
    req.on('data', function(input) {
      data += input;
    });
    req.on('end', function() {
      var search = qs.parse(data).search;
      console.log(search);
      doTwitterSearch(search, function(resp) {
        res.end(JSON.stringify(resp))
      });
    })
  }
  var search = require('url').parse(req.url, true);


}).listen(1337);

console.log('Server running at http://localhost/');



function doTwitterSearch(search, cb) {
  T.get('search/tweets', {
    q: search
  }, function(err, resp) {
    if (err) {
      console.error('Search Error', err, resp);
    } else {
      cb(resp);
    }
  });
}