let { contas } = require('../../bancodedados');

function sacarValidator(req, res, next){
    const { numero_conta, valor, senha } = req.body;

    if(!senha){
        return res.status(400).json({mensagem: 'Por favor informe a senha'});
    };

    if(!numero_conta && !valor){
        return res.status(400).json({mensagem: "Existem campos obritórios em branco, favor preencher"});
    };

    const verificarConta = contas.find((conta) =>{
        return conta.numero === Number(numero_conta);
    });
    
    if(!verificarConta){
        return res.status(404).json({mensagem: "Número da conta não existe"});
    };

    if(senha !== verificarConta.usuario.senha){
        return res.status(401).json({
            mensagem: "Senha incorreta"
        });
    };

    if(valor >= contas.saldo || typeof valor !== "number"){
        return res.status(400).json({mensagem: "Valor à depositar inválido. Informe outro valor"});
    };

    req.conta = verificarConta;
    next();
};

module.exports = sacarValidator;