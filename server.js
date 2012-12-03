// Load libraries
var express = require('express'),
    app = express();

// Constants
var PORT = 8080;

// Server configuration
var server = {
    init: function () {
        this
            .setRoot('public/index.html')
            .setFolders('/public');

        console.log('Listening on ' + PORT)
        app.listen(PORT);
    },

    setRoot: function (file) {
        app.get('/', function (req, res) {
            res.sendfile(file);
        });

        return this;
    },

    setFolders: function (folder) {
        app.use(express.static(__dirname + folder));

        return this;
    }
};

server.init();