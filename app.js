const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Squirrel');
});

app.listen(5001, () => {
  console.log('Sever started on localhost:5001');
});
