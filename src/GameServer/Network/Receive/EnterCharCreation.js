const ServerResponse = invoke('GameServer/Network/Send');

function enterCharCreation(session, buffer) {
    session.dataSend(
        ServerResponse.charTemplates()
    );
}

module.exports = enterCharCreation;
