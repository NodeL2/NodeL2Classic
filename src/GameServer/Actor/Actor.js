const ActorModel = invoke('GameServer/Model/Actor');

class Actor extends ActorModel {
    constructor(session, data) {
        // Parent inheritance
        super(data);
    }
}

module.exports = Actor;
