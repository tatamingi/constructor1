var express = require("express");
var fs = require("fs");

var app = express();
const csp = require('express-csp-header');

app.use(csp({
    policies: {
        'default-src': [csp.SELF],
    }
}));

app.get('http://localhost:3000/user.json', function (req, res, next) {

    var options = {
        root:  __dirname,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true,
            'Content-Type': 'text/html'
        }
    };

    var fileName = 'user.json';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);

        } else {
            console.log('Sent:', fileName);
        }
    });

});
app.listen(3000);