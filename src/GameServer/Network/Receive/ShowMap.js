const ServerResponse = invoke('GameServer/Network/Send');

function showMap(session, buffer) {
    session.dataSend(
        ServerResponse.showMap()
    );
}

module.exports = showMap;
