function moveTo(session, actor, coords) {
    if (actor.state.inMotion()) {
        actor.automation.abortAll(actor);
    }

    actor.automation.scheduleMovement(session, actor, coords.to, () => {
        console.info('Arrived ' + Math.random());
    });
}

module.exports = moveTo;
