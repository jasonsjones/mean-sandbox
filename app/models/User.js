var mongoose = require('mongoose');
var hash = require('../util/hash');

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    local: {
        username: {
            type: String,
            unique: true
        },
        password: String,
        salt: String
    },

    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },

    zipcode: String,
    roles: [String],
    createdOn: {
        type: Date,
        default: Date.now
    },
    lastModified: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date
    },
    loggedIn: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.authenticate = function (pwdToMatch) {
    return this.local.password === hash.hashPassword(this.local.salt, pwdToMatch);
};

userSchema.methods.isAdmin = function () {
    return this.roles && this.roles.indexOf('admin') > -1;
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function (err, collection) {
        if (err) {
        }
        if (collection.length === 0) {
            console.log('creating list of default users in db...');

            var salt = hash.createSalt();
            var pwd = hash.hashPassword(salt, 'changeMe');
            User.create({
                firstName: 'Admin',
                lastName: 'User',
                email: 'admin@meansandbox.com',
                local: {
                    username: 'admin',
                    password: pwd,
                    salt: salt
                },
                zipcode: '92106',
                roles: ['admin']
            });

            salt = hash.createSalt();
            pwd = hash.hashPassword(salt, 'demoUser');
            User.create({
                firstName: 'Demo',
                lastName: 'User',
                email: 'demo@meansandbox.com',
                local: {
                    username: 'demo',
                    password: pwd,
                    salt: salt
                },
                zipcode: '95307'
            });
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;
