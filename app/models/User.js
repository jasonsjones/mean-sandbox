var mongoose = require('mongoose');
var hash = require('../util/hash');

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    salt: String,
    password: String,
    roles: [String],
    createdOn: {type: Date, default: Date.now},
    lastModified: {type: Date, default: Date.now}
});

userSchema.methods.authenticate = function (pwdToMatch) {
    return this.password === hash.hashPassword(this.salt, pwdToMatch);
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
            User.create({firstName: 'Jason', lastName: 'Jones', email: 'jason@jasonsjones.com',
                username: 'jason', salt: salt, password: pwd, roles: ['admin']
            });

            salt = hash.createSalt();
            pwd = hash.hashPassword(salt, 'joe');
            User.create({firstName: 'Joe', lastName: 'Eames', email: 'joe@joeeames.com',
                username: 'joe', salt: salt, password: pwd
            });

            salt = hash.createSalt();
            pwd = hash.hashPassword(salt, 'john');
            User.create({firstName: 'John', lastName: 'Papa', email: 'john@johnpapa.com',
                username: 'john', salt: salt, password: pwd
            });

            salt = hash.createSalt();
            pwd = hash.hashPassword(salt, 'andy');
            User.create({firstName: 'Andy', lastName: 'Perez', email: 'andy@andyperez.com',
                username: 'andy', salt: salt, password: pwd
            });
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;
