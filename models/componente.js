const mongoose = require('mongoose');
const ComponenteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        enum: ['LED', 'LDR', 'LASER', 'BUZZER', 'BOTAO' ],
        message: '{VALUE} é inválido',
        required: true
    },
    tipoPorta: {
        type: String,
        enum: ['Digital', 'Analogica'],
        message: '{VALUE} é inválido',
        required: true
    },
    descricao: {
        type: String,
        required: true
    }
});
const Componente = mongoose.model('Componente', ComponenteSchema);

module.exports = Componente;