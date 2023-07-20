// Create web server

var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var mime = require('mime');
var path = require('path');
var comments = require('./comments');

var server = http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    if (pathname === '/') {
        pathname = '/index.html';
    }
    if (pathname === '/index.html') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        fs.readFile(path.join(__dirname, pathname), 'utf-8', function (err, data) {
            if (err) throw err;
            res.end(data);
        });
    } else if (pathname === '/comments.json') {
        if (req.method === 'GET') {
            comments.getComments(function (err, comments) {
                if (err) {
                    res.writeHead(500);
                    res.end();
                    return;
                }
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify(comments));
            });
        } else if (req.method === 'POST') {
            var body = '';
            req.on('data', function (chunk) {
                body += chunk;
            });
            req.on('end', function () {
                var comment = qs.parse(body);
                comments.addComment(comment, function (err) {
                    if (err) {
                        res.writeHead(500);
                        res.end();
                        return;
                    }
                    res.writeHead(200);
                    res.end();
                });
            });
        }
    } else {
        fs.readFile(path.join(__dirname, pathname), function (err, data) {
            if (err) {
                res.writeHead(404);
                res.end();
                return;
            }
            res.writeHead(200, {
                'Content-Type': mime.lookup(pathname)
            });
            res.end(data);
        });
    }
});

server.listen(3000);
