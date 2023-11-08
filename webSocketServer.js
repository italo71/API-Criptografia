const WebSocket = require('ws');
const server = new WebSocket.Server({
	port: 8080,
});
let sockets = [];

class task {
	async abrirServidor() {
		server.on('connection', function (socket) {
			// Adicionamos cada nova conexão/socket ao array `sockets`
			sockets.push(socket);
			// Quando você receber uma mensagem, enviamos ela para todos os sockets
			socket.on('message', function (msg) {
				sockets.forEach((s) => s.send(msg.toString()));
				//sockets.forEach((s) => s.send(JSON.stringify(s)));
			});
			// Quando a conexão de um socket é fechada/disconectada, removemos o socket do array
			socket.on('close', function () {
				sockets = sockets.filter((s) => s !== socket);
			});
		});
		console.log('Servidor aberto');
	}
}

module.exports = new task();
