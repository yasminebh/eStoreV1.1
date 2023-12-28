const mongoose = require('mongoose')
const user = require('./userModel')

/* Le matricule fiscale tunisien se compose de 13 chiffres et lettres. Les deux premiers chiffres représentent le code de la direction régionale des impôts où l’entreprise a été enregistrée. Les deux chiffres suivants représentent l’année de création de l’entreprise. Les sept chiffres suivants sont le numéro d’enregistrement unique de l’entreprise attribué par les autorités fiscales. Enfin, les deux derniers chiffres sont la clé de contrôle du matricule fiscal.
 */
const providerSchema = new mongoose.Schema({
  products: [{type: mongoose.Types.ObjectId, ref:"product"}],
  
  matricule : {
    type: String,
    required: true,
    validate: {
      validator: validateMatriculeFiscale,
      message: 'Invalid matricule fiscale format',
    },
  },

});
function validateMatriculeFiscale(value) {
   const regex = /^[0-9A-Za-z]{13}$/;
  if (!regex.test(value)) {
    return false;
  }

  return true;
}

user.discriminator('provider', providerSchema)
module.exports = mongoose.model('provider')