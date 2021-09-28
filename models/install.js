const mongoose = require('mongoose');
const InstallSchema = new mongoose.Schema({
    portaArduino: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    arduino: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Arduino',
        required: true
    },
    componente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Componente',
        required: true
    },
    created: {
        type: Date,
        dafault: Date.now
    }
});
const Install = mongoose.model('Install', InstallSchema);

module.exports = Install;