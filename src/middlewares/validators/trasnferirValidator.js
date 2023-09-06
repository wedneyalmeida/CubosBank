let { contas } = require('../../bancodedados');

function validarTransferencia(req, res, next){
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if(!numero_conta_origem || !numero_conta_destino || !valor || !senha){
        return res.status(400).json({
            mensagem: "Existem campos obrigatórios a serem preenchidos"
        });
    };

    if(valor <= 0 || typeof valor !== "number"){
        return res.status(400).json({
            mensagem: "Valor à depositar inválido. Informe outro valor"
        });
    };

    const verificarContaOrigem = contas.find((contaOrigem) =>{
        return contaOrigem.numero === Number(numero_conta_origem); 
    });

    const verificarContaDestino = contas.find((contaDestino) =>{
        return contaDestino.numero === Number(numero_conta_destino); 
    });


    if(!verificarContaOrigem || !verificarContaDestino){
        return res.status(404).json({
            mensagem: "Número da conta de origem ou conta destinataria não existe"
        });
    };

    if(senha !== verificarContaOrigem.usuario.senha){
        return res.status(401).json({
            mensagem: "Senha incorreta"
        });
    };

    if(verificarContaOrigem.saldo < valor){
        return res.status(400).json({
            mensagem: "Saldo insuficiente"
        });
    };

    req.contaOrigem = verificarContaOrigem;
    req.contaDestino = verificarContaDestino;

    next()
};

module.exports = validarTransferencia;