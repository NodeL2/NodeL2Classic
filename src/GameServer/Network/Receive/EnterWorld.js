const ServerResponse   = invoke('GameServer/Network/Send');
const ServerResponseEx = invoke('GameServer/Network/Send/Ex');
const UserMask         = invoke('GameServer/Network/UserMask');

function enterWorld(session, buffer) {
    session.actor.enterWorld();
    session.dataSend(ServerResponse.sunrise()); // TODO: Server timer
    session.dataSend(ServerResponse.userInfo(session.actor, new UserMask([], session.actor.fetchName())));

    // Extended
    session.dataSend(
        ServerResponseEx.basicActionList()
    );
}

module.exports = enterWorld;
