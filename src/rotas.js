const express = require('express');
const { listarContasBancarias } = require('./controladores/administracaoDeConta');
const contasBancarias = require('./controladores/constasBancarias');
const operacoesBancarias = require('./controladores/operacoesBancarias');
const { validarUsuario } = require('./middlewares/autenticacaoDeAdmin');
const atualizarUsuarioValidator = require('./middlewares/validators/atualizarUsuarioValidator');
const validarSaldo = require('./middlewares/validators/consultarSaldo');
const criarContaValidator = require('./middlewares/validators/criarContaValidator');
const deletarContaValidator = require('./middlewares/validators/deletarContaValidator');
const depositarValidator = require('./middlewares/validators/depositarValidator');
const validarExtrato = require('./middlewares/validators/extratoBancarioValidator');
const sacarValidator = require('./middlewares/validators/sacarValidator');
const validarTransferencia = require('./middlewares/validators/trasnferirValidator');

const cubosBank = express();

cubosBank.get('/contas', validarUsuario, listarContasBancarias);

cubosBank.post('/contas', criarContaValidator, contasBancarias.criarContaBancaria);

cubosBank.put('/contas/:numeroConta/usuario', atualizarUsuarioValidator, contasBancarias.atualizarUsuarioDaConta);

cubosBank.delete('/contas/:numeroConta', deletarContaValidator, contasBancarias.deletarConta);

cubosBank.post('/transacoes/depositar', depositarValidator, operacoesBancarias.depositar);
cubosBank.post('/transacoes/sacar', sacarValidator, operacoesBancarias.sacar);
cubosBank.post('/transacoes/transferir', validarTransferencia, operacoesBancarias.transferir);

cubosBank.get('/contas/saldo', validarSaldo, operacoesBancarias.consultarSaldo);
cubosBank.get('/contas/extrato', validarExtrato, operacoesBancarias.extrato);

module.exports = cubosBank;