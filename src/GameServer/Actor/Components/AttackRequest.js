const ServerResponse = invoke('GameServer/Network/Send');

function attackRequest(npc) {
    if (this.state.inMotion()) {
        this.automation.abortAll(this);
    }

    this.automation.scheduleMovement(this.session, 'melee', this, npc, 0, () => {
        this.session.dataSend(ServerResponse.attack(this, npc.fetchId(), 0x00));
    });
}

module.exports = attackRequest;
