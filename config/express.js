const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const criptografar = require('../api/controllers/criptografia');
const { json } = require('body-parser');
const { response } = require('express');
const cors = require('cors');

module.exports = () => {
	const app = express();
	app.use(cors({ origin: '*' }));
	var jsonParser = bodyParser.json();
	app.use(bodyParser.json());
	app.use((req, res, next) => {
		//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
		res.header('Access-Control-Allow-Origin', '*');
		//Quais são os métodos que a conexão pode realizar na API
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

		next();
	});

	// SETANDO VARIÁVEIS DA APLICAÇÃO
	app.set('port', process.env.PORT || config.get('server.port'));

	app.post('/criptografia', async function (req, res) {
		criptografar.criptografar(req.body, res);
	});

	app.post('/descriptografia', jsonParser, async function (req, res) {
		criptografar.descriptografar(req.body, res);
	});

	app.get('/', function (req, res) {
		res.json({ message: "Welcome to Rotina's API" });
	});

	// MIDDLEWARES

	return app;
};
