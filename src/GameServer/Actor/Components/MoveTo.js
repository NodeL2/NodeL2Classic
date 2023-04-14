function moveTo(session, actor, coords) {
    if (actor.state.inMotion()) {
        actor.automation.abortAll(actor);
    }

    actor.automation.scheduleMovement(session, 'movement', actor, coords.to, 0, () => {
        console.info('Arrived ' + Math.random());
    });
}

module.exports = moveTo;
