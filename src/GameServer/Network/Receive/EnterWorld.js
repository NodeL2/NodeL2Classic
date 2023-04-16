const ServerResponse   = invoke('GameServer/Network/Send');
const ServerResponseEx = invoke('GameServer/Network/Send/Ex');
const ActorMask        = invoke('GameServer/Actor/ActorMask');
const Database         = invoke('Database');

function enterWorld(session, buffer) {
    session.actor.enterWorld();
    session.dataSend(ServerResponse.sunrise()); // TODO: Server timer
    session.dataSend(ServerResponse.userInfo(session.actor, new ActorMask([], session.actor.fetchName())));

    // Extended
    session.dataSend(
        ServerResponseEx.basicActionList()
    );

    Database.fetchShortcuts(session.actor.fetchId()).then((shortcuts) => {
        session.dataSend(ServerResponse.shortcutInit(shortcuts));
        session.dataSend(ServerResponse.skillsList(session.actor.skillset.fetchSkills()));
    });
}

module.exports = enterWorld;
