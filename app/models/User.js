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
    lastModified: {type: Date, default: Date.now}
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
            var pwd = hash.hashPassword(salt, 'jason');

            User.create({
                firstName: 'Jason',
                lastName: 'Jones',
                email: 'jason@jasonsjones.com',
                local: {
                    username: 'jason',
                    password: pwd,
                    salt: salt
                },
                roles: ['admin']
            });

            salt = hash.createSalt();
            pwd = hash.hashPassword(salt, 'joe');
            User.create({
                firstName: 'Joe',
                lastName: 'Eames',
                email: 'joe@joeeames.com',
                local: {
                    username: 'joe',
                    password: pwd,
                    salt: salt
                }
            });

            salt = hash.createSalt();
            pwd = hash.hashPassword(salt, 'john');
            User.create({
                firstName: 'John',
                lastName: 'Papa',
                email: 'john@johnpapa.com',
                local: {
                    username: 'john',
                    password: pwd,
                    salt: salt
                }
            });

            salt = hash.createSalt();
            pwd = hash.hashPassword(salt, 'ward');
            User.create({
                firstName: 'Ward',
                lastName: 'Bell',
                email: 'ward@wardbell.com',
                local: {
                    username: 'ward',
                    password: pwd,
                    salt: salt
                }
            });
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;
