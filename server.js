const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
var fs= require('fs');

app.get('/', function (req, res) {
  res.send("Hello World");
});

const server = app.listen(port, () => console.log(`Server listening on port ${port }!`));

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  
  fs.writeFile('/home/output.txt', 'SIGTERM signal received.', function (err) {
    if (err) return console.log(err);
    console.log('Closing express server > output.txt'); //Not working locally, but it is printing stdout.
  });
  
  server.close(() => {
    console.log('Express server closed.');
  });
});