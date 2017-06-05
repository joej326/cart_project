const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.use(session({
  secret: 'beyoncefanforlife',
  resave: false,
  saveUninitialized: false
}));



app.post('/api/cart', (req, res) => {
  ////add req.body to users session
  if(!req.session.cart){
    req.session.cart = [];
  }

  if(!req.body.name){
    return res.status(400).send('you need to send a product')
  }
  req.session.cart.push(req.body);
  return res.status(200).send(req.session.cart);
});

app.get('/api/cart', (req, res) => {
  ////return users cart from session
  res.status(200).json(req.session.cart);
});



app.listen(8000, () => {console.log("working")});
