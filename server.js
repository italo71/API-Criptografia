const app = require('./config/express.js')();
//const port = app.get('port');
const port = 15153;
//const db = require("../API_Rotina/config/db");
// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});

const socketServer = require('./webSocketServer.js');
const socket = require('./webSocketConnection.js');
socketServer.abrirServidor();
socket.connectarSocket('ws://localhost:8080');
//desenvolvido por Italo Braga
