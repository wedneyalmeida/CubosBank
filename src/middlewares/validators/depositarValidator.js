let { contas } = require('../../bancodedados');

function depositarValidator(req, res, next){
    const { numero_conta, valor } = req.body;
    
    if(!numero_conta && !valor){
        return res.status(400).json({mensagem: "Existem campos obritórios em branco, favor preencher"});
    };

    const verificarConta = contas.find((conta) =>{
        return conta.numero === numero_conta;
    });
    
    if(!verificarConta){
        return res.status(404).json({mensagem: "Número da conta não existe"});
    };

    if(valor <= 0 || typeof valor !== "number"){
        return res.status(400).json({mensagem: "Valor à depositar inválido. Informe outro valor"});
    };

    req.conta = verificarConta;
    
    next();
};

module.exports = depositarValidator;