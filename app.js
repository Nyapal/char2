const express = require('express')
const app = express()
const exphbs = require('express-handlebars');

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.get('/', (req, res) => {
  res.render('home', { msg: 'Nya has the fattest pussy' });
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
