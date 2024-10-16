// Create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var comments = [];

// Create server
http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf8', function (err, data) {
            if (err) {
                throw err;
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    } else if (pathname === '/loadData') {
        var data = JSON.stringify(comments);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data);
    } else if (pathname === '/saveData') {
        var comment = urlObj.query;
        comments.push(comment);
        res.end();
    } else {
        var file = path.join(__dirname, pathname);
        fs.exists(file, function (exists) {
            if (exists) {
                fs.readFile(file, 'utf8', function (err, data) {
                    if (err) {
                        throw err;
                    }
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(data);
                });
            } else {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('404 - Not Found');
            }
        });
    }
}).listen(3000, function () {
    console.log('Server is listening on port 3000');
});