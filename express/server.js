'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const axios = require("axios"); 

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
//app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));
app.get("/", (req, res) => {
  axios.get("https://quizapi.io/api/v1/questions?apiKey=GqUHpV0I96SwSw9eEHOll244Azgj8dLWdE2Oti4r&limit=10")
  .then(response => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Origin", "http://localhost:5000");
      res.header("Content-Type", "application/json");
      res.send(response.data); 
  })
  .catch(error => {
      console.log(error); 
  })
})

module.exports = app;
module.exports.handler = serverless(app);
