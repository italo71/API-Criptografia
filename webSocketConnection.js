const WebSocket = require('ws');
var socket = null;
const url = 'ws://localhost';
var contador = 0;
class task {
	async connectarSocket(msgToSend = null) {
		socket = new WebSocket(url);
		// Defina manipuladores de eventos para diferentes eventos WebSocket
		socket.on('open', () => {
			console.log('Conexão WebSocket aberta.');
			contador = 0;
			// Agora você pode enviar mensagens para o servidor WebSocket
		});
		socket.on('message', (data) => {
			console.log(data);
		});
		socket.on('close', (code, reason) => {
			//console.log(`Conexão fechada: ${code} - ${reason}`);
			this.rotinaDeReconexão();
		});
		socket.on('error', (error) => {
			console.error(`Erro na conexão: ${error.message}`);
			this.rotinaDeReconexão();
		});
		if (msgToSend) {
			socket.send(msgToSend);
		}
	}

	async rotinaDeReconexão(msgToSend = null) {
		if (contador < 2) {
			contador++;
			this.connectarSocket(msgToSend);
		} else {
			let i = setTimeout(() => {
				this.connectarSocket(msgToSend);
			}, 500);
		}
	}
}

module.exports = new task();
