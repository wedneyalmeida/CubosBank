let { contas, identificador } = require('../bancodedados');

function criarContaBancaria(req, res){
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const novaConta = {
        numero: identificador++,
        saldo: 0,
        usuario: {
            nome: nome,
            cpf: cpf,
            data_nascimento: data_nascimento,
            telefone: telefone,
            email: email,
            senha: senha
        }
    };

    contas.push(novaConta);

    return res.status(201).json(novaConta);
};

function atualizarUsuarioDaConta(req, res){
    const { nome, data_nascimento, telefone, senha} = req.body;
    const conta = req.conta;

    if(nome){
        conta.usuario.nome = nome;
    };

    if(data_nascimento){
        conta.usuario.data_nascimento = data_nascimento;
    };

    if(telefone){
        conta.usuario.telefone = telefone;
    };

    if(senha){
        conta.usuario.senha = senha;
    };

    return res.status(200).json({mensagem: "Conta atualizada com sucesso"});
};

function deletarConta(req, res){
    const conta = req.conta;

    contas.splice(conta, 1);
    
    return res.status(200).json({mensagem: "Conta excluída com sucesso"});
};

module.exports = {
    criarContaBancaria,
    atualizarUsuarioDaConta,
    deletarConta
}