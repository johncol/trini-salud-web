var gzippo = require('gzippo');
var express = require('express');
var app = express();

app.use(gzippo.staticGzip("" + __dirname + "/dist"));

app.use(function (req, res, next) {
    res.status(404).redirect('/index.html');
});

app.listen(process.env.PORT || 5000);