const express = require('express');
const app = express();
const cors = require('cors')
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();

const serverOne = 'http://localhost:3001';
const serverTwo = 'http://localhost:3002';
const serverThree = 'http://localhost:3007';
const serverFour = 'http://localhost:4007';
app.use(cors());
app.use(express.json());
app.use('/:id', express.static('public'));

app.all("/description/*", (req, res) => {
  console.log('redirecting to server description');
  proxy.web(req, res, {target: serverOne});
});

app.all("/photos/*", (req, res) => {
  console.log('redirecting to server photos');
  proxy.web(req, res, {target: serverTwo});
})

app.all("/reservation/*", (req, res) => {
  console.log('redirecting to server reservation');
  proxy.web(req, res, {target: serverThree});
})

app.all("/reviews/*", (req, res) => {
  console.log('redirecting to server reviews');
  proxy.web(req, res, {target: serverFour});
})


const PORT = 4040;
app.listen(PORT, () => console.log('server is listening on port ', PORT));