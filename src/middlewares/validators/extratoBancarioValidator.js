let { contas } = require('../../bancodedados');

function validarExtrato(req, res, next){
    const { numero_conta, senha } = req.query;
    
    if(!numero_conta || !senha){
        return res.status(400).json({
            mensagem: "Existem campos obrigatórios a serem preenchidos"
        });
    };

    const verificarConta = contas.find((conta) =>{
        return conta.numero === Number(numero_conta);
    });

    if(!verificarConta){
        return res.status(400).json({
            mensagem: "Número da conta não existe"
        });
    };

    if(senha !== verificarConta.usuario.senha){
        return res.status(401).json({
            mensagem: "Senha incorreta"
        });
    };

    req.conta = verificarConta;

    next()
};

module.exports = validarExtrato;