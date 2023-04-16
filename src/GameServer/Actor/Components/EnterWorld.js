const ConsoleText = invoke('GameServer/ConsoleText');

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

    // Default welcome
    ConsoleText.transmit(session, ConsoleText.caption.welcome);
}

module.exports = enterWorld;
