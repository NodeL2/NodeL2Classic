const ServerResponse = invoke('GameServer/Network/Send');

function unselect() {
    this.clearDestId();
    this.session.dataSend(ServerResponse.destUnselected(this));
}

module.exports = unselect;
