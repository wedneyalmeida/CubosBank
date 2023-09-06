const { contas } = require('../bancodedados');

function listarContasBancarias(req, res){
    
    return res.status(200).json(contas)
};


module.exports = {
    listarContasBancarias
}