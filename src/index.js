//IMPORTACIONES DE LIBRERIAS PARA LA APLICACION EN SI
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLstor = require('express-mysql-session');
const passport = require('passport');


const {database} = require('./keys');
//inicializaciones
const app = express();

require('./lib/passport');

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));//ubicacion de la carpeta views
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),//ubicacion de la carpeta layouts
    partialsDir: path.join(app.get('views'), 'partials'),// la ubicacion partials
    extname: '.hbs',//conficuracion de archivo para llamar los archivo hbs
    helpers: require('./lib/handlebars'),
}));
app.set('views engine', '.hbs');

//Middlewares
app.use(session({
    secret: 'flash mysqul node',
    resave: false,
    saveUninitialized: false,
    store: new MySQLstor(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));//limitaciones de archivo 
app.use(express.json());//para trae formato js
app.use(passport.initialize());
app.use(passport.session());

//Global variebles
app.use((req, res, next) => {//variables para acceder
   app.locals.Link = req.flash('Link');
   app.locals.message = req.flash('message');
   app.locals.user = req.user;
    next();
});
//Rowtes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links' ,require('./routes/links'));
//Public
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
    
});