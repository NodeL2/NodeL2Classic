const ServerResponse = invoke('GameServer/Network/Send');
const UserMask       = invoke('GameServer/Network/UserMask');

function enterWorld(session, buffer) {
    session.dataSend(ServerResponse.sunrise()); // TODO: Server timer
    session.dataSend(ServerResponse.userInfo(session.actor, new UserMask([], session.actor.fetchName())));
}

module.exports = enterWorld;
