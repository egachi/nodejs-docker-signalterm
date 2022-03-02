const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
let appInsights = require("applicationinsights");
const moment = require('moment'); 

appInsights.setup()
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .setUseDiskRetryCaching(true)
    .setSendLiveMetrics(false)
    .setDistributedTracingMode(appInsights.DistributedTracingModes.AI)
    .start();

let client = appInsights.defaultClient;

app.get('/', function (req, res) {
  client.trackEvent({name: "Home Request", properties: { message: "Hello World! "}});
  res.send("Hello World");
});

const server = app.listen(port, () => console.log(`Server listening on port ${port }!`));

process.on('SIGTERM', () => {
  
  console.info('SIGTERM signal received.');
  var time = moment();
  client.trackEvent({name: "SIGTERM", properties: { message: `SIGTERM signal received on ${time.format("hh:mm:ss:SSS").toString()}`}});

  server.close(() => {
    console.log('Express server closed.');
  });
});