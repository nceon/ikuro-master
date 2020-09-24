let ikuroServer = require('http');

processMgr();

function processMgr() {
    ikuroServer.createServer(function (req, res) {
        res.write("Ikuro Manager online.");
        res.end();
    }).listen('8080');
}
