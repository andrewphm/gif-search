require('dotenv').config();

const express = require('express');
const app = express();
const Tenor = require('tenorjs').client({
  // Replace with your own key
  Key: process.env.TENOR_API_KEY, // https://tenor.com/developer/keyregistration
  Filter: 'high', // "off", "low", "medium", "high", not case sensitive
  Locale: 'en_US', // Your locale here, case-sensitivity depends on input
});

// Middleware
const exphbs = require('express-handlebars');

app.use(express.static('public'));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  // Handle the home page when we haven't queried yet
  term = '';
  if (req.query.term) {
    term = req.query.term;

    // Tenor.search.Query("SEARCH KEYWORD HERE", "LIMIT HERE")
    Tenor.Search.Query(term, '10')
      .then((response) => {
        // store the gifs we get back from the search
        const gifs = response;

        // pass the gifs as an object into the home page
        res.render('home', { gifs });
      })
      .catch(console.error);
  } else {
    res.render('home', { gifs: [] });
  }
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
