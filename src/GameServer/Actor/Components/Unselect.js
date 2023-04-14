const ServerResponse = invoke('GameServer/Network/Send');

function unselect(session, actor) {
    actor.clearDestId();
    session.dataSend(ServerResponse.destUnselected(actor));
}

module.exports = unselect;
