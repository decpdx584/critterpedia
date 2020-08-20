require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const SECRET_SESSION = process.env.SECRET_SESSION;
const passport = require('./config/ppConfig')
const flash = require('connect-flash');
const db = require('./models')

// require authorization middleware at the top of the page
const isLoggedIn = require('./middleware/isLoggedIn');

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

// secret: What we're actually giving the user to use our site
// resave: Save the session even if it's modified, make this false
// saveUninitialized: if we have a new session, we'll save it, therefore setting this to true
app.use(session({
  secret: SECRET_SESSION,
  resave: false,
  saveUninitialized: true
}));

// Initialize passport and run session as middleware
app.use(passport.initialize());
app.use(passport.session());

// flash for temporary messages to the user
app.use(flash());

// middleware to have our messages accessible for every view
app.use((req, res, next) => {
  // before every route we will attach our current user to res.local
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', (req, res) => {
  console.log(req.flash());
  res.render('index', { alerts: res.locals.alerts });
});

// use controllers
app.use('/auth', require('./routes/auth'));
app.use('/search', require('./routes/search'));

// render inventory
app.get('/inventory', isLoggedIn, (req, res) => {
  // console.log('🎯', req.user.dataValues.id)
  res.render('inventory');
});

// add critter to inventory
app.post('/', (req, res) => {
  db.user.findOne({
      where: {
        id: req.user.dataValues.id
      }
  }).then(user => {
    db.critter.findOne({
      where: {
        id: req.body.id
      }
    }).then(critter =>{
      user.addCritter(critter).then(relation => {
        console.log(critter.name, 'added to', user.name)
      })
    }).catch(error => {
      console.log('Error', error);
    })
  }).catch(error => {
    console.log('Error', error);
  })
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${port} 🎧`);
});

module.exports = server;
