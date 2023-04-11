const ServerResponse = invoke('GameServer/Network/Send');
const CreatureMask   = invoke('GameServer/Network/CreatureMask');

function enterWorld(session, buffer) {
    session.dataSend(ServerResponse.userInfo(session.actor, new CreatureMask()));
}

module.exports = enterWorld;
