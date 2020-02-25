const mongoose = require('mongoose');

var ActivitySchema = new mongoose.Schema({
    type: String,
    startPoint: String,
    endPoint: String,
    organizer: String,
    complexity: String,
    date: Date,
    description: String,
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: String
    },
    img: String
});

module.exports = mongoose.model('Activity', ActivitySchema);