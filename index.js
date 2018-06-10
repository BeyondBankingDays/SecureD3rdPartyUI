let express  = require('express');
let app      = express();

let port = process.env.PORT || 1338;
app.listen(port);
app.use(express.static(__dirname + '/public'));

app.get('*', function (req, res) {
 res.type('text/html');
    res.sendFile("./public/index.html");

});