const { banco } = require('../bancodedados');

function validarUsuario(req, res, next){
    const { senha_banco } = req.query;

    if(!senha_banco){
        return res.status(400).json({mensagem: 'Por favor informe a senha'});
    };
    if(senha_banco !== banco.senha){
        return res.status(401).json({mensagem: 'Senha incorreta, digite a senha novamente'});
    };

    next();
};

module.exports = {
    validarUsuario
}