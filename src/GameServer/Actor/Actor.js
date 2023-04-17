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
        this.backpack   = new Backpack(data);
        this.automation = new Automation();

        this.session    = session;
        this.previousXY = undefined;

        delete this.model.items;
        delete this.model.paperdoll;
    }

    destructor() {
    }

    // Request packets

    enterWorld        = invoke(path.actor + 'EnterWorld')
    moveTo            = invoke(path.actor + 'MoveTo')
    updatePosition    = invoke(path.actor + 'UpdatePosition')
    updateEnvironment = invoke(path.actor + 'updateEnvironment')
    select            = invoke(path.actor + 'Select')
    unselect          = invoke(path.actor + 'Unselect')
    basicAction       = invoke(path.actor + 'BasicAction')
    attackRequest     = invoke(path.actor + 'AttackRequest')
    teleportTo        = invoke(path.actor + 'TeleportTo')
    showAdminPanel    = invoke(path.actor + 'ShowAdminPanel')

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
