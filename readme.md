# passport-googleの勉強用サンプル

## これは何？
最近のアプリで「goolgeアカウントからログイン 」って良く見かけませんか？
それらはOpenId認証とかOAuth認証とか言われていますが、
そういうのをnode.jsで比較的簡単に実装できるライブラリでpassportというのがあります。
自分でも作ってみたら意外と難しかったので、備忘録的にgithubを作ってみました。

passport
<http://passportjs.org/>

passport-google
<https://github.com/jaredhanson/passport-google>

## 導入から起動まで
git cloneしたら、ルートディレクトリに移動して、以下コマンドで必要なライブラリをインストールして下さい。

    npm install

次に以下コマンドで、アプリケーションを起動します。

    npm start

##使い方
ブラウザから以下のアドレスにアクセスします。
<http://localhost:3000/>
※環境によってはポートが3000でないことがあります。その場合はコンソールのメッセージを確認して、環境に合わせたポートを指定して下さい。
例)ポートが8080になっている時
Express server listening on port 8080

次に「Googleアカウントでログイン」をクリックして下さい。
ここから先はgoogleのログイン画面になるので、画面の指示に従って下さい。

ログインに成功すると画面遷移して、ブラウザに以下のように表示されます。

ログイン成功!  
ようこそ、<goolgeアカウント名>さん


##自動結合テストの実施方法
WebdriverJsで結合テストを書いてみました。
実行方法は以下の通りです。

###0. 前提条件
*npm installで関連モジュールのインストールが完了している。
*mochaをグローバルインストールしている。
    npm install -g mocha

###1. 必要モジュールの配置
結合テスト実施にはChromeDriverが必要です。
各OS専用のモジュールをインストールして、プロジェクトのルートに配置して下さい。

<http://chromedriver.storage.googleapis.com/index.html>

###2. テスト実施
プロジェクトのルートまで移動して、以下コマンドでテストを実施します。

    NODE_MAIL_ADDRESS="gmailアドレス" NODE_PASSWORD="gmailパスワード" NODE_USERNAME="gmailアカウント名"  mocha seleniumTest/ -R spec

##コンタクト
メール
kaidouji85@gmail.com

ブログ
毎日プログラム
http://blog.livedoor.jp/kaidouji85/