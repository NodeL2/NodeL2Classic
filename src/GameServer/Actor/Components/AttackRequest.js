function attackRequest(npc) {
    if (this.state.inMotion()) {
        this.automation.abortAll(this);
    }

    this.automation.scheduleMovement(this.session, 'melee', this, npc, 0, () => {
        console.info('Arrived ' + Math.random());
    });
}

module.exports = attackRequest;
