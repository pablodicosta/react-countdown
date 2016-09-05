var express = require('express');
var http = require('http');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('./webpack.config');
var db = require('./lib/db');
var bodyParser = require('body-parser');

var app = express();
var server = http.Server(app);
var compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {colors: true}
}));
app.use(webpackHotMiddleware(compiler, {
      log: console.log
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist'));

app.get('/api/config', function(req, res) {
  db.find('config', { }, 1, function(err, cfg) {
    if(err) {
      console.error(err);
      return;
    }

    var data = {
      endDate : cfg[0].endDate,
      message : cfg[0].message
    };

    res.json(data);
  });
});

app.post('/api/config', function(req, res) {
  db.update('config', { endDate : req.body.endDate, message : req.body.message }, function(err) {
    if(err) {
      console.error("Error saving to the database");
      res.sendStatus(500);
    }
    res.sendStatus(200);
  });
});

db.open(function(err) {
  if(!err) {
    var port = process.env.PORT || 3000;
		app.listen(port);
  } else {
    console.error("Error connecting to database - ", err);
    process.exit();
  }
});
