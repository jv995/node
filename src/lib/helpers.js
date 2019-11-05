
const bcryptjs = require('bcryptjs');//importar la libreria descriptar
const helpers = {};//para criptar contraseña usa libreria helpers

helpers.encryptPassword = async (password) =>{//sifrado
    const salt =  await bcryptjs.genSalt(10);//generar el hash para seguridad del sistema
    const hash = await bcryptjs.hash(password, salt);
    return hash;
};

helpers.login = async (password, savePassword) =>{
    try {
      return await bcryptjs.compare(password, savePassword);//compara la clave nueva y la clave guardado

    } catch (e) {
        console.log(e);
    }
    
};

module.exports = helpers;//exporta la libreria