function attackRequest(session, actor, npc) {
    if (actor.state.inMotion()) {
        actor.automation.abortAll(actor);
    }

    actor.automation.scheduleMovement(session, actor, npc, () => {
        console.info('Arrived ' + Math.random());
    });
}

module.exports = attackRequest;
