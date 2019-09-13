var express = require("express"),
      app   = express(),
      bodyParser = require("body-parser"),
      port  = process.env.PORT || 3000;
var todoRoutes = require('./routes/todos');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/todos', todoRoutes);
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
    return res.sendFile('index.html');
});

app.listen(port, function () {
    console.log("app is running on port " + port);
    // body...
})