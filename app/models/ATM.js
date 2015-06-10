var mongoose = require('mongoose');
var Purchase = require('./Purchase');
var User = mongoose.model('User');

var atmWithdrawalSchema = new mongoose.Schema({
    cashAmount: Number,
    serviceFee: Number,
    date: {type: Date, default: Date.now()},
    location: String,
    userId: String,
    createdOn: {type: Date, default: Date.now()},
    lastModified: {type: Date, default: Date.now()}
});

var Withdrawal = mongoose.model('ATMWithdrawal', atmWithdrawalSchema);

exports.createDefaultATMTransactions = function () {
    Withdrawal.find({}).exec(function (err, collection) {
        if (err) {
            console.log(err);
            return;
        }

        if (collection.length === 0) {
            console.log('creating dummy data for atm transactions');
            User.findOne({username: 'jason'}).exec(function (err, user) {
                populateATMTransactions(user);
            });
        }
    });
};

function populateATMTransactions(user) {
    Withdrawal.create({
        cashAmount: 40,
        serviceFee: 3,
        date: new Date('6/10/2014'),
        location: "NEX Point Loma",
        userId: user._id
    }, function (err, w) {
        Purchase.create({amount: 3, description: 'ATM service fee', atmId: w._id});
        Purchase.create({amount: 5, description: 'lunch', atmId: w._id});
        Purchase.create({amount: 2, description: 'shaving cream', atmId: w._id});
        Purchase.create({amount: 2, description: 'groceries', atmId: w._id});
        Purchase.create({amount: 6, description: 'coffee dues', atmId: w._id});
        Purchase.create({amount: 6, description: 'lunch', atmId: w._id});
        Purchase.create({amount: 11, description: 'lunch', atmId: w._id});
        Purchase.create({amount: 1, description: 'tip', atmId: w._id});
        Purchase.create({amount: 5, description: 'lunch', atmId: w._id});
    });
    Withdrawal.create({
        cashAmount: 60,
        serviceFee: 3,
        date: new Date('6/3/2014'),
        location: "NEX Point Loma",
        userId: user._id
    }, function (err, w) {
        Purchase.create({amount: 3, description: 'ATM service fee', atmId: w._id});
        Purchase.create({amount: 5, description: 'lunch', atmId: w._id});
        Purchase.create({amount: 6, description: 'coffee dues', atmId: w._id});
    });
    Withdrawal.create({
        cashAmount: 80,
        serviceFee: 2,
        date: new Date('7/3/2014'),
        location: "NEX Point Loma",
        userId: user._id
    }, function (err, w) {
        Purchase.create({amount: 2, description: 'ATM service fee', atmId: w._id});
        Purchase.create({amount: 5, description: 'lunch', atmId: w._id});
        Purchase.create({amount: 20, description: 'groceries', atmId: w._id});
        Purchase.create({amount: 6, description: 'coffee dues', atmId: w._id});
        Purchase.create({amount: 6, description: 'dinner', atmId: w._id});
    });
}