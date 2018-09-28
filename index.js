const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const urls = require('./db/urls')
const app = express();
const port  = process.env.PORT || 3000;

app.use(morgan('tiny')); // log requests into the console
app.use(bodyParser.json()); // allows server to recieve and use json from the client
app.use(express.static('./public')); // by default serve the file in ./public for any files requested


app.get('/:name', async(req, res) => {
  const puny = await urls.find(req.params.name);
  if(puny) {
    res.redirect(puny.url);
  } else{
    res.redirect(`/404.html?name=${req.params.name}`)
  }
});


app.post('/api/puny', async (req, res) => {
  console.log(req.body);
  try {
    const url = await urls.create(req.body);
    res.json(url);
  } catch(error) {
    res.status(500);
    res.json(error);
  }
});

app.listen(port, () => {
  console.log(`Listening on: ${port}`);
});
