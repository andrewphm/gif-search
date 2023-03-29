const express = require('express');
const app = express();
const Tenor = require('tenorjs').client({
  // Replace with your own key
  Key: 'AIzaSyAe4vYsft7-FWEU9v-wU4wjUtUp6SwzP1k', // https://tenor.com/developer/keyregistration
  Filter: 'high', // "off", "low", "medium", "high", not case sensitive
  Locale: 'en_US', // Your locale here, case-sensitivity depends on input
});

// Middleware
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  term = '';

  if (req.query.term) {
    term = req.query.term;
  }

  Tenor.Search.Query(term, '10')
    .then((response) => {
      const gifs = response;
      res.render('home', { gifs });
    })
    .catch(console.error);
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
