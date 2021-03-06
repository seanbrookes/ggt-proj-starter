// debugging blog: https://www.raymondcamden.com/2015/10/28/a-quick-look-at-debugging-node-js-with-strongloop-and-visual-studio-code/


var loopback = require('loopback');
var boot = require('loopback-boot');
var express = require('express');
var path = require('path');

var app = module.exports = loopback();

app.use(express.static(path.join(__dirname, '../client/www')));

app.start = function() {
  // start the web server
  return app.listen(app.get('port'), function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

// mongodb default port: 27017
