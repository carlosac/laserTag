const mongoose = require('mongoose');
const ArduinoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ip: {
        type: String
    },
    installs : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Install',
    }],
    port: {
        type: String
    }
});
const Arduino = mongoose.model('Arduino', ArduinoSchema);

module.exports = Arduino;