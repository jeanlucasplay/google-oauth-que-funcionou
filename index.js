const express = require('express');
const passport = require('passport');
const session = require('express-session');

require('./auth');

const path = require("path");

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

const app = express();

app.set('views', path.join(__dirname, 'views'));
//Middleware
app.set('view engine', 'ejs');

app.use(session({secret: 'cats'}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/auth/google',
    passport.authenticate('google', {scope: ['email', 'profile']})
);

app.get('/google/callback', passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure',
    }));

app.get('/auth/failure', (req, res) => {
   res.send('Algo deu errado!!!');
});

app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Olá ${req.user.displayName}`)
})

app.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy()
        res.redirect('/')
    });
})

app.listen(3000, () => console.log(`Ssrvidor rodando na porta ${3000}`));