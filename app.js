/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var passport = require('passport');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

//passport
var GoogleStrategy = require('passport-google').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
}); 

// Passportを利用する実装
passport.use(new GoogleStrategy({
    // 以下のreturnURL先をRoutingで実装します
    returnURL : 'http://localhost:3000/auth/google/return',
    realm : 'http://localhost:3000/'
},
// 認証が終わったら呼び出される関数です
function(identifier, profile, done) {
    // identifierがopenID
    // profileがユーザー情報（例：profile.displayName）
    // done関数を実行して処理終了を通知
    console.log(identifier);//test
    console.log(profile);//test
    done(null, {id:12,name:'takeuchi'});
}));

// 認証を開始する為のURL
app.get('/auth/google', passport.authenticate('google'));

// 認証終了後のGoogleからのコールバックに対応するURL
app.get('/auth/google/return', passport.authenticate('google', {
    successRedirect : '/success',
    failureRedirect : '/'
}));

app.get('/success', function(req, res) {
    res.render('success', {});
}); 