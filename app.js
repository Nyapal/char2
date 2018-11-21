const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose');

const charities = require('./controllers/charities')
const Charity = require('./models/charity')

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride('_method'))


charities(app)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('App listening on port 3000!')
  const db = process.env.MONGODB_URI || 'mongodb://localhost/charity-term2';
  mongoose.connect(db)
})

module.exports = app
