const mongoose = require('mongoose');
const PerfilSchema  = new mongoose.Schema({
  name :{
      type  : String,
      required : true
  } ,
  codigoPerfil :{
    type : Number,
    required : true,
    unique : true
}
});
const Perfil= mongoose.model('Perfil',PerfilSchema);

module.exports = Perfil;