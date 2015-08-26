var twitterLocalConsumerKey = process.env.SB_TWITTER_CONSUMER_KEY;
var twitterLocalConsumerSecret = process.env.SB_TWITTER_CONSUMER_SECRET;
var twitterLocalCallback = 'http://127.0.0.1:3000/auth/twitter/callback';

module.exports = {
    devlocal: {
        env: 'devlocal',
        db: 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + ':' +
                (process.env.DB_1_PORT_27017_TCP_PORT || '27017') + '/meansandbox',
        secret: 'learningtheMEANstack',
        port: process.env.PORT || 7401,
        twitterAuth: {
            'consumerKey': twitterLocalConsumerKey,
            'consumerSecret': twitterLocalConsumerSecret,
            'callbackURL': twitterLocalCallback
        }
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
        twitterAuth: {
            'consumerKey': twitterLocalConsumerKey,
            'consumerSecret': twitterLocalConsumerSecret,
            'callbackURL': twitterLocalCallback
        }
    }
};
