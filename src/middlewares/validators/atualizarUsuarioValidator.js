let { contas } = require('../../bancodedados');

function atualizarUsuarioValidator(req, res, next){
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha} = req.body;

    if(!nome && !cpf && !data_nascimento && !telefone && !email && !senha){
        return res.status(400).json({mensagem: "Informe pelo menos um dos campos para atualizar"});
    };

    const verificarConta = contas.find((conta) =>{
        return conta.numero === Number(numeroConta);
    })

    if(!verificarConta){
        return res.status(404).json({mensagem: "Número da conta não existe"});
    };

    if(cpf){
        const verificarCpf = contas.find((conta) =>{
            return conta.usuario.cpf === cpf && conta.numero !== Number(numeroConta);
        });
        
        if(verificarCpf){
            return res.status(400).json({mensagem: "CPF informado já está cadastrado em nossa base"});
        };

        
    };

    if(email){
        const verificarEmail = contas.find((conta) =>{
            return conta.usuario.email === email && conta.numero !== Number(numeroConta);
        });

        if(verificarEmail){
            return res.status(400).json({mensagem: "E-mail informado já está cadasrado em nossa base"});
        };

        
    };

    req.conta = verificarConta;
    next();
};

module.exports = atualizarUsuarioValidator;