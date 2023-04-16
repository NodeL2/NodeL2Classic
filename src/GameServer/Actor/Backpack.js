const BackpackModel = invoke('GameServer/Model/Backpack');

class Backpack extends BackpackModel {
    constructor(data) {
        // Parent inheritance
        super(data.paperdoll);
    }
}

module.exports = Backpack;
