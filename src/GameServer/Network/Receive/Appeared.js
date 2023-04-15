const ServerResponse = invoke('GameServer/Network/Send');
const UserMask       = invoke('GameServer/Network/UserMask');

function appeared(session, buffer) {
    session.dataSend(ServerResponse.userInfo(session.actor, new UserMask([], session.actor.fetchName())));
}

module.exports = appeared;
