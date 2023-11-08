const { response } = require('express');
const crypto = require('crypto-js');
const url = require('../../config/default.json').server.url;
const pos = require('../../config/default.json').server.pos;
const jsonConfig = require('../../config/default.json');
const chavePai = require('../../config/default.json').server.chavecripto;
const axios = require('axios');
class task {
	async descriptografar(req, res) {
		if (req?.encriptString == null || req?.key == null) {
			res.status(400).send();
			return;
		}
		let value = req.encriptString;
		let chave = req.key;
		try {
			let msgDecript = crypto.AES.decrypt(value, String(chave)).toString(
				crypto.enc.Utf8,
			);
			try {
				msgDecript = JSON.parse(msgDecript);
			} catch { }
			res.status(200).send({ status: 'success', data: msgDecript });
			return;
		} catch {
			console.log(req);
			res.status(200).send({ status: 'erro', data: 'teste' });
			return;
		}
	}

	async criptografar(req, res) {
		console.log(req);
		if (req?.encriptString == null || req?.key == null) {
			res.status(400).send();
			return;
		}
		let chave = req?.key;
		console.log('oi');
		console.log(JSON.stringify(req.encriptString));
		let tipo = typeof (req.encriptString);
		let value;
		if (tipo == 'object')
			value = JSON.stringify(req.encriptString);
		else
			value = req.encriptString
		try {
			let msgEncript = crypto.AES.encrypt(
				value,
				chave,
			).toString();
			res.status(200).send({ status: 'success', data: msgEncript });
			return;n
		} catch {
			console.log(req);
			res.status(200).send({ status: 'erro', data: 'teste2' });
			return;
		}
	}
}

module.exports = new task();
