const ServerResponse = invoke('GameServer/Network/Send');

function disconnect(session, buffer) {
    session.dataSend(
        ServerResponse.disconnectSuccess()
    );
}

module.exports = disconnect;
