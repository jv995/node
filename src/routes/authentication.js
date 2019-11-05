const express = require('express');
const router = express.Router();

const passort = require('passport');
const {isLoggedIn, isNotloggedIn} = require('../lib/auth');

router.get('/signup', isNotloggedIn, (req, res) =>{
    res.render('auth/signup.hbs');
});

/*router.post('/signup', (req, res) => {
  passort.authenticate('local/signup', {
      successRedirect: '/profile',
      failureRedirect: '/signup',
      failuFlash: true
  });
  res.send('RECIBIDO');
});*/

router.post('/signup', isNotloggedIn, passort.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', isNotloggedIn, (req, res) => {
    res.render('auth/signin.hbs');
});

router.post('/signin', isNotloggedIn, (req, res, next) => {
    passort.authenticate('local.signin',{
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) =>{
   // res.send('Esto es Perfiles');
   res.render('profile.hbs');
});


router.get('/logout', isLoggedIn, (req, res) =>{
    req.logOut();
    res.redirect('/signin');
});
module.exports = router;