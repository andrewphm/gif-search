const express = require('express');
const app = express();

// Middleware
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/greetings/:name', (req, res) => {
  // grab the name from the path provided
  const name = req.params.name;
  // render the greetings view, passing along the name
  res.render('greetings', { name });
});

app.listen(5001, () => {
  console.log('Sever started on localhost:5001');
});
