const ServerResponse   = invoke('GameServer/Network/Send');
const ServerResponseEx = invoke('GameServer/Network/Send/Ex');

function teleportTo(session, actor, coords) {
    const Generics = invoke(path.actor);

    actor.clearDestId();
    actor.automation.abortAll(actor);
    session.dataSend(ServerResponse.teleportToLocation(actor.fetchId(), coords));
    session.dataSend(ServerResponseEx.teleportActivate(actor.fetchId(), coords));

    // Turns out to be a viable solution
    setTimeout(() => {
        Generics.updatePosition(session, actor, coords);
        Generics.updateEnvironment(session, actor); // Force update position, in case we Teleport to the same Location
    }, 1000);
}

module.exports = teleportTo;
