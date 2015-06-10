var mongoose = require('mongoose');

var purchaseSchema = new mongoose.Schema({
    amount: {type: Number, default: 0.00},
    description: {type: String, default: 'no description provided'},
    atmId: {type: String, default: 'no atmId provided'},
    createdOn: {type: Date, default: Date.now()},
    lastModified: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Purchase', purchaseSchema);