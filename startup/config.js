const config = require('config');

module.exports = function () {
    if(!config.get('jwtPrivateKey')) {
        throw new Error('FETAL ERROR: Private Key not set');
    }
}