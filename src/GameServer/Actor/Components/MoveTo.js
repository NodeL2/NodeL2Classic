const ServerResponse = invoke('GameServer/Network/Send');

function moveTo(session, actor, coords) {
    session.dataSend(
        ServerResponse.moveToLocation(actor.fetchId(), coords)
    );
}

module.exports = moveTo;
