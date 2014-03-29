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

/*
 * passportでgoogleのOpenIdからログインしています
 * 参考にしたサイトは以下の通りです。
 * 
 * YoheiM.NET
 * http://www.yoheim.net/blog.php?q=20131003
 * 
 */
var GoogleStrategy = require('passport-google').Strategy;

//passportのセッションを利用しているので、シリアライズ、デシリアライズを実装する必要があります。
//ここに結構ハマりました。
//以下の実装は公式サイトからパクってきたものですが、処理的には引数に渡されたオブジェクトのそのまま保存、
//そのままま取り出しというシンプルなものです。
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
}); 

passport.use(new GoogleStrategy({
    returnURL : 'http://localhost:3000/auth/google/return',
    realm : 'http://localhost:3000/'
},
function(identifier, profile, done) {
    console.log('identifier');//test
    console.log(identifier);//test
    console.log('profile');//test
    console.log(profile);//test
    done(null, profile);
}));

//googleに遷移させるためのルーティング設定です。
app.get('/auth/google', passport.authenticate('google'));

//goolge認証が成功した場合、goolgeから呼び出されるURLです。
//ここはデフォルトだとsuccessRedirect、failureRedirectを設定する書き方になっていますが、少し誤解していました。
//success、failはgoolgeログインの成功・失敗ではなく、
//goolgeから認証を得ているユーザが自分のシステムに存在するか、しないかを判定しているようです。
//少し考えてみれば、googleログインに成功しないと、このURL自体呼ばれませんから、
//ここに来た時点でgoolgeログインは絶対に成功しているんですよね。
app.get('/auth/google/return', function (req, res, next) {
    passport.authenticate('google', function (err, user) {
        if(user){
            //TODO: ユーザ情報をセッションに持たせ、riderictでsuccessに遷移するようにしたい
            res.render('success',user);
        } else {
            res.redirect('/');
        }
    })(req, res, next);
});