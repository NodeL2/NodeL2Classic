const ServerResponse = invoke('GameServer/Network/Send');

function backToHall(session, buffer) {
    session.dataSend(
        ServerResponse.charSelectInfo()
    );
}

module.exports = backToHall;
