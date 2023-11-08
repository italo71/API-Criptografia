const WebSocket = require('ws');
var socket = null;
var contador = 0;
var url;
class task {
	async connectarSocket(_url = null) {
		if (_url) url = _url;
		socket = new WebSocket(url);
		// Defina manipuladores de eventos para diferentes eventos WebSocket
		socket.on('open', () => {
			console.log('Conexão WebSocket aberta.');
			contador = 0;
			// Agora você pode enviar mensagens para o servidor WebSocket
		});
		socket.on('message', (data) => {
			console.log(data.toString());
		});
		socket.on('close', (code, reason) => {
			//console.log(`Conexão fechada: ${code} - ${reason}`);
			this.rotinaDeReconexão();
		});
		socket.on('error', (error) => {
			console.error(`Erro na conexão: ${error.message}`);
			this.rotinaDeReconexão();
		});
	}

	async enviarSocket(msg) {
		if (msg && socket) {
			socket.send(msg);
		}
	}

	async rotinaDeReconexão() {
		if (contador < 2) {
			contador++;
			this.connectarSocket();
		} else {
			let i = setTimeout(() => {
				this.connectarSocket();
			}, 500);
		}
	}
}

module.exports = new task();
