var mongoose = require('mongoose');
var hash = require('../util/hash');

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    local: {
        username: String,
        password: String,
        salt: String
    },
    roles: [String],
    createdOn: {type: Date, default: Date.now},
    lastModified: {type: Date, default: Date.now},
    lastLogin: {type: Date}
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
                }
            });
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;
