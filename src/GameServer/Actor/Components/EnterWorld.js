const ConsoleText = invoke('GameServer/ConsoleText');

function enterWorld() {
    // Populate skills
    this.skillset.populate(this.fetchId());

    // Show NPCs based on radius
    this.updatePosition({
        locX: this.fetchLocX(),
        locY: this.fetchLocY(),
        locZ: this.fetchLocZ(),
        head: this.fetchHead(),
    });

    // Default welcome
    ConsoleText.transmit(this.session, ConsoleText.caption.welcome);
}

module.exports = enterWorld;
