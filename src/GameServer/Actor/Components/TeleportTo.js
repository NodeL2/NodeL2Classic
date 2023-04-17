const ServerResponse   = invoke('GameServer/Network/Send');
const ServerResponseEx = invoke('GameServer/Network/Send/Ex');

function teleportTo(coords) {
    this.clearDestId();
    this.automation.abortAll(this);
    this.session.dataSend(ServerResponse.teleportToLocation(this.fetchId(), coords));
    this.session.dataSend(ServerResponseEx.teleportActivate(this.fetchId(), coords));

    // Turns out to be a viable solution
    setTimeout(() => {
        this.updatePosition(coords);
        this.updateEnvironment(); // Force update position, in case we Teleport to the same Location
    }, 1000);
}

module.exports = teleportTo;
