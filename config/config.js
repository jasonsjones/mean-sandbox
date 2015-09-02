var emailUser = process.env.MS_GMAIL_USER;
var emailPass = process.env.MS_GMAIL_PASS;

var twitterConsumerKey = process.env.SB_TWITTER_CONSUMER_KEY;
var twitterConsumerSecret = process.env.SB_TWITTER_CONSUMER_SECRET;
var twitterLocalCallback = 'http://127.0.0.1:3000/auth/twitter/callback';
var twitterC9Callback = 'https://mean-sandbox-jsj0nes.c9.io/auth/twitter/callback';
var twitterDOCallback = 'http://meansandbox.com/auth/twitter/callback';

var twitterConfigLocal = {
    consumerKey: twitterConsumerKey,
    consumerSecret: twitterConsumerSecret,
    callbackURL: twitterLocalCallback
};

var twitterConfigC9 = {
    consumerKey: twitterConsumerKey,
    consumerSecret: twitterConsumerSecret,
    callbackURL: twitterC9Callback
};

var twitterConfigProdDO = {
    consumerKey: twitterConsumerKey,
    consumerSecret: twitterConsumerSecret,
    callbackURL: twitterDOCallback
};

module.exports = {
    devlocal: {
        env: 'devlocal',
        db: 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + ':' +
                (process.env.DB_1_PORT_27017_TCP_PORT || '27017') + '/meansandbox',
        secret: 'learningtheMEANstack',
        port: process.env.PORT || 7401,
        emailUser: emailUser,
        emailPass: emailPass,
        twitterAuth: twitterConfigLocal
    },
    devc9io: {
        env: 'devc9io',
        db: 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + ':' +
                (process.env.DB_1_PORT_27017_TCP_PORT || '27017') + '/meansandbox',
        secret: 'learningtheMEANstack',
        port: process.env.PORT || 7401,
        emailUser: emailUser,
        emailPass: emailPass,
        twitterAuth: twitterConfigC9
    },
    devweb: {
        env: 'devweb',
        db: 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PWD +
                '@ds039860.mongolab.com:39860/mean-sandbox',
        secret: 'learningtheMEANstack',
        port: process.env.PORT || 7401
    },
    build: {
        env: 'build',
        db: 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + ':' +
                (process.env.DB_1_PORT_27017_TCP_PORT || '27017') + '/meansandbox',
        secret: 'learningtheMEANstack',
        port: process.env.PORT || 7401,
        emailUser: emailUser,
        emailPass: emailPass,
        twitterAuth: twitterConfigProdDO
    }
};
