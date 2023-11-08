const app = require('./config/express.js')();
//const port = app.get('port');
const port = 15153;
//const db = require("../API_Rotina/config/db");
// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});

/* const socket = require('./webSocketConnection.js');
socket.connectarSocket(); */
//desenvolvido por Italo Braga
