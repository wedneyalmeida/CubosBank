const { contas, depositos, saques, transferencias } = require('../bancodedados');

function depositar(req, res){
    const { valor } = req.body
    const conta = req.conta

    conta.saldo += valor;
    
    depositos.push({
        data: new Date(),
        numero_conta: conta.numero,
        valor
    })

    return res.status(201).json({mensagem: "Depósito realizado com sucesso"});
};

function sacar(req, res){
    const { valor } = req.body 
    const conta = req.conta;

    
    conta.saldo -= valor;
    
    saques.push({
        data: new Date(),
        numero_conta: conta.numero,
        valor
    });

    return res.status(201).json({mensagem: "Saque realizado com sucesso"});
};

function transferir(req, res){
    const { valor } = req.body;
    
    const contaOrigem = req.contaOrigem;
    const contaDestino = req.contaDestino;

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;

    transferencias.push({
        data: new Date(),
        numero_conta_origem: contaOrigem.numero,
        numero_conta_destino: contaDestino.numero,
        valor
    });

    return res.status(201).json({
        mensagem: "Transferência realizado com sucesso"
    });
};

function consultarSaldo(req, res){  
    const conta = req.conta;
    
    return res.status(200).json({saldo: conta.saldo});
};

function extrato(req, res){
    const { numero_conta } = req.query;

    const saqueDoUsuario = saques.filter((saque) =>{
        return saque.numero_conta === Number(numero_conta)
    });

    const depositoDoUsuario = depositos.filter((deposito) =>{
        return deposito.numero_conta === Number(numero_conta)
    });

    const transferenciasEnviadas = transferencias.filter((transferir) =>{
        return transferir.numero_conta_origem === Number(numero_conta) 
    });

    const transferenciasRecebidas = transferencias.filter((transferir) =>{
        return transferir.numero_conta_destino === Number(numero_conta) 
    });
    
    const extratoBancario = {
        saques: saqueDoUsuario,
        depositos: depositoDoUsuario,
        transferenciasEnviadas,
        transferenciasRecebidas
    }

    return res.status(200).json(extratoBancario);
};

module.exports = {
    depositar,
    sacar,
    transferir,
    consultarSaldo,
    extrato
}