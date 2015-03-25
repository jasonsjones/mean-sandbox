module.exports = {
    devlocal: {
        db: 'mongodb://localhost/meansandbox',
        secret: 'learningtheMEANstack',
        port: process.env.PORT || 7401
    },
    devweb: {
        db: 'mongodb://' + process.env.DB_USER + ':'
             + process.env.DB_PWD + '@ds039860.mongolab.com:39860/mean-sandbox',
        secret: 'learningtheMEANstack',
        port: process.env.PORT || 7401
    }
};