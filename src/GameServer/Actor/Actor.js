const ActorModel = invoke('GameServer/Model/Actor');
const Skillset   = invoke('GameServer/Actor/Skillset');
const Backpack   = invoke('GameServer/Actor/Backpack');
const Automation = invoke('GameServer/Automation');

class Actor extends ActorModel {
    constructor(session, data) {
        // Parent inheritance
        super(data);

        // Local
        this.skillset   = new Skillset();
        this.backpack   = new Backpack();
        this.automation = new Automation();
        this.session    = session;
    }

    destructor() {
    }

    moveTo(data) {
        invoke(path.actor).moveTo(
            this.session, this, data
        );
    }

    updatePosition(data) {
        invoke(path.actor).updatePosition(
            this.session, this, data
        );
    }
}

module.exports = Actor;
