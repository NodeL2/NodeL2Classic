function moveTo(coords) {
    if (this.state.inMotion()) {
        this.automation.abortAll(this);
    }

    this.automation.scheduleMovement(this.session, 'movement', this, coords.to, 0, () => {
        console.info('Arrived ' + Math.random());
    });
}

module.exports = moveTo;
