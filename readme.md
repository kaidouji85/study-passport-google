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

##コンタクト
メール
kaidouji85@gmail.com

ブログ
毎日プログラム
http://blog.livedoor.jp/kaidouji85/