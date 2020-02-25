const mongoose = require('mongoose');

var StoreSchema = new mongoose.Schema({
    storeName: String,
    storeAddress: String,
    storeLatitude: Number,
    storeLongitude: Number
});


module.exports = mongoose.model('Store', StoreSchema);