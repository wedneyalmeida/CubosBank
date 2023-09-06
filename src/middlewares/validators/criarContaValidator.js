let { contas } = require('../../bancodedados');

function criarContaValidator(req, res, next){
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if(!nome || !cpf || !data_nascimento || !telefone || !email || !senha){
        return res.status(400).json({mensagem: "Existem campos obritórios em branco, favor preencher"})
    };

    const verificarCpf = contas.find((conta) =>{
        return conta.usuario.cpf === cpf;
    });
    
    if(verificarCpf){
        return res.status(400).json({mensagem: "CPF informado já está cadastrado em nossa base"});
    };

    const verificarEmail = contas.find((conta) =>{
        return conta.usuario.email === email;
    });

    if(verificarEmail){
        return res.status(400).json({mensagem: "O e-mail já está sendo utilizado"});
    };

    next()
};

module.exports = criarContaValidator;
