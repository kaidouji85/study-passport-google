var assert = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');
var URL = 'localhost:3000';
var NODE_MAIL_ADDRESS = process.env.NODE_MAIL_ADDRESS || null;
var NODE_PASSWORD = process.env.NODE_PASSWORD || null;
var NODE_USERNAME = process.env.NODE_USERNAME || null;

test.describe('ログイン', function() {
    var driver;
    test.before(function() {
        driver = new webdriver.Builder().
                     withCapabilities(webdriver.Capabilities.chrome()).
                     build();
    });
    
    test.it('googleアカウントでログイン出来たので、ユーザ名が表示される', function(){
        isSetEnv();
        
        driver.get(URL);
        driver.findElement(webdriver.By.name('googleLogin')).click();
        
        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return 'ログイン - Google アカウント' === title;
            });
        }, 1000);
        
        driver.findElement(webdriver.By.name('Email')).sendKeys(NODE_MAIL_ADDRESS);
        driver.findElement(webdriver.By.name('Passwd')).sendKeys(NODE_PASSWORD);
        driver.findElement(webdriver.By.name('signIn')).click();
        
        driver.wait(function() {
            return driver.getTitle().then(function(title) {
                return 'ログイン成功' === title;
            });
        }, 1000);
        
        driver.findElement(webdriver.By.name('userName')).getText().then(function(userName){
            assert.equal(userName,NODE_USERNAME,'ユーザ名が表示されている');
        });
    });
    
    test.after(function() {
        driver.quit();
    });
    
    function isSetEnv(){
        assert.isNotNull(NODE_MAIL_ADDRESS,'NODE_MAIL_ADDRESSが設定されていない');
        assert.isNotNull(NODE_PASSWORD,'NODE_PASSWORDが設定されていない');
        assert.isNotNull(NODE_USERNAME,'NODE_USERNAMEが設定されていない');
    }
}); 