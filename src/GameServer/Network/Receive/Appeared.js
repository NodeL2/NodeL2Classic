const ServerResponse = invoke('GameServer/Network/Send');
const ActorMask      = invoke('GameServer/Actor/ActorMask');

function appeared(session, buffer) {
    session.dataSend(ServerResponse.userInfo(session.actor, new ActorMask([], session.actor.fetchName())));
}

module.exports = appeared;
