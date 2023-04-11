const ServerResponse = invoke('GameServer/Network/Send');

function moveTo(session, actor, coords) {
    if (coords.from.locX === coords.to.locX && coords.from.locY === coords.to.locY) {
        console.info('Hmm');
    }

    session.dataSend(
        ServerResponse.moveToLocation(actor.fetchId(), coords)
    );
}

module.exports = moveTo;
