// index.js
// where your node app starts

// init project
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('/public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/gabit", (req, res) => {
  res.send("HELLO GABIT");
});


app.get("/api/", (req, res) => {
  let dateInput = new Date();
  res.json({
    unix: dateInput.getTime(),
    utc: dateInput.toUTCString()
  });
});

app.get("/api/:date", (req, res) => {
  let dateInput = new Date(/^\d+$/.test(req.params.date) ? Number(req.params.date) : req.params.date);
  if (isNaN(dateInput.valueOf())) {
    res.json({
      error: "Invalid Date"
    });
    return;
  }
  res.json({
    unix: dateInput.getTime(),
    utc: dateInput.toUTCString()
  });
});


// listen for requests :)
let listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
