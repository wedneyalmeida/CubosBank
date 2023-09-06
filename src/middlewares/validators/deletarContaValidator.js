let { contas } = require('../../bancodedados');

function deletarContaValidator(req, res, next){
    const { numeroConta } = req.params;

    const verificarConta = contas.find((conta) =>{
        return conta.numero === Number(numeroConta);
    });
        
    if(!verificarConta){
        return res.status(404).json({mensagem: "Número da conta não existe"});
    };
    
    const verificarSaldo = contas.find((conta) =>{
        return conta.saldo === 0;
    });

    if(!verificarSaldo){
        return res.status(400).json({mensagem: "Não é possivél excluir, você possui saldo em conta"});
    };
    req.conta = verificarConta;
    next()
};

module.exports = deletarContaValidator;