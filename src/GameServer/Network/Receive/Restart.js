const ServerResponse = invoke('GameServer/Network/Send');

function restart(session, buffer) {
    session.actor?.destructor();
    session.dataSend(ServerResponse.restart());
}

module.exports = restart;
