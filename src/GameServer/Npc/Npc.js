const NpcModel = invoke('GameServer/Model/Npc');

class Npc extends NpcModel {
    constructor(id, data) {
        // Parent inheritance
        super(data);

        this.setId(id);
    }
}

module.exports = Npc;
