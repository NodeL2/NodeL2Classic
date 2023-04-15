function enterWorld(session, actor) {
    const Components = invoke(path.actor);

    // Populate skills
    actor.skillset.populate(actor.fetchId());

    // Show NPCs based on radius
    Components.updatePosition(session, actor, {
        locX: actor.fetchLocX(),
        locY: actor.fetchLocY(),
        locZ: actor.fetchLocZ(),
        head: actor.fetchHead(),
    });
}

module.exports = enterWorld;
