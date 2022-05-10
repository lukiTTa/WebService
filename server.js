const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

router.get('/teste', (req, res) => {
  console.log('Requisição no endpoint route!');
  res.send('Endpoint working!');
})

