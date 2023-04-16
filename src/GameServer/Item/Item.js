const ItemModel = invoke('GameServer/Model/Item');

class Item extends ItemModel {
    constructor(id, data) {
        // Parent inheritance
        super(data);

        // Local
        this.setId(id);
    }

    // Get (Weapon & Armor)

    fetchEquipped() {
        return this.model.equipped ?? false;
    }

    fetchSlot() {
        return this.model.slot ?? 0;
    }
}

module.exports = Item;
