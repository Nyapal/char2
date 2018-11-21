const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose');

const charities = require('./controllers/charities')
const Charity = require('./models/charity')

mongoose.connect('mongodb://localhost/charity-term2');


app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride('_method'))


charities(app)

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

module.exports = app
