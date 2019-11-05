const passport = require('passport');
const Strategy = require('passport-local');

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signup', new Strategy ({
    usernameField: 'usenombre',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, usenombre, password, done) =>{
    const { fullname } = req.body;
    const newUser = {
        usernombre: usenombre ,
        password: password,
        fullname: fullname,
    };
     newUser.password = await helpers.encryptPassword(password);
     const resultado = await pool.query('INSERT INTO users set ?', [newUser]);
     newUser.id = resultado.insertId;
     return done(null, newUser);
    //console.log(resultado);
}));

passport.use('local.signin', new Strategy ({
    usernameField: 'usenombre',
    passwordField: 'password',
    passReqToCallback: true

}, async (req, usenombre, password, done) => {
      /* console.log(req.body);
       console.log(usenombre);
       console.log(password);*/
        
       console.log(req.body);
       const row= await pool.query('SELECT * FROM users WHERE usernombre = ? ', [usenombre]);
       if (row.length > 0){
           const user = row[0];
          const valiPassword = await helpers.login(password, user.password);
          if(valiPassword){
              done(null, user, req.flash('link','Bienvenido'+ user.usenombre));
          } else{
              done(null, false, req.flash('message','Incorrecto Contraseña'));
          }
       } else{
           return done(null, false, req.flash('message','El Nombre del Usuario no EXISTE'));
       }
}));

passport.serializeUser((users, done) =>{
    done(null, users.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users Where  users.id = ?', [id]);
    done(null, rows[0]);
});


