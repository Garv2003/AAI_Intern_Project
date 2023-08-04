const path = require('path');
const express = require('express');
const app = express();
const PORT = 4444;
const session = require('express-session');
const passport = require('./auth/passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'asdjbaskdadbaskdv',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1/testdb',
    })
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/',require('./routes/login'));

app.use('/signup',require('./routes/signup'))

app.get('/home',(req,res)=>{
    console.log(req.user);
    res.render('home',{
        username: req.user.username
    });
})

app.get('/addcontract',(req,res)=>{
  res.render("addcontract")
})

app.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

app.post('/addcontract',(req,res)=>{
  const{}=req.body;
  
})

mongoose.connect('mongodb://127.0.0.1/testdb')
    .then(()=>{
        app.listen(PORT, () => {
            console.log(`http://localhost:` + PORT);
        });
    })
    .catch(err=>{
        console.log("Connection err: ",err);
    })