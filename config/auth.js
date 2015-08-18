module.exports = {
    "twitterAuth": {
        "consumerKey": process.env.SB_TWITTER_CONSUMER_KEY,
        "consumerSecret": process.env.SB_TWITTER_CONSUMER_SECRET,
        "callbackURL": "http://local.meansandbox.com:3000/auth/twitter/callback"
    }
};
