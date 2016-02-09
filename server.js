var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public'));

app.use(function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(process.env.port || 9000);
