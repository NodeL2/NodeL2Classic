const ServerResponse = invoke('GameServer/Network/Send');
const ActorModel     = invoke('GameServer/Model/Actor');
const Skillset       = invoke('GameServer/Actor/Skillset');
const Backpack       = invoke('GameServer/Actor/Backpack');
const Automation     = invoke('GameServer/Automation');

class Actor extends ActorModel {
    constructor(session, data) {
        // Parent inheritance
        super(data);

        // Local
        this.skillset   = new Skillset();
        this.backpack   = new Backpack();
        this.automation = new Automation();

        this.session    = session;
        this.previousXY = undefined;
    }

    destructor() {
    }

    // Request packets

    enterWorld() {
        invoke(path.actor).enterWorld(
            this.session, this
        );
    }

    select(data) {
        invoke(path.actor).select(
            this.session, this, data
        );
    }

    unselect() {
        invoke(path.actor).unselect(
            this.session, this
        );
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

    // Abstract

    isBlocked() {
        if (this.state.isBlocked()) {
            this.session.dataSend(ServerResponse.actionFailed());
            return true;
        }
        return false;
    }
}

module.exports = Actor;
