const ActorModel = invoke('GameServer/Model/Actor');
const Backpack   = invoke('GameServer/Actor/Backpack');

class Actor extends ActorModel {
    constructor(session, data) {
        // Parent inheritance
        super(data);

        // Local
        this.backpack = new Backpack();
        this.session  = session;
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
