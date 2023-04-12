function updatePosition(session, actor, coords) {
    const Components = invoke(path.actor);

    // TODO: Write less in DB about movement
    actor.setLocXYZH(coords);

    // Update Online users, NPCs, underwater locations
    Components.updateEnvironment(session, actor);
}

module.exports = updatePosition;
