class BackpackModel {
    constructor(data) {
        this.items = [];
        this.paperdoll = data;
    }

    // Enum
    equipment = {
          earr:  1,
          earl:  2,
          neck:  3,
            fr:  4,
            fl:  5,
          head:  6,
        weapon:  7,
        shield:  8,
         hands:  9,
         chest: 10,
         pants: 11,
          feet: 12,
          dual: 14,
         armor: 15,
    }

    // Get

    fetchItems() {
        return this.items;
    }

    fetchPaperdollId(slot) {
        return this.paperdoll[slot].id;
    }

    fetchPaperdollSelfId(slot) {
        return this.paperdoll[slot].selfId;
    }
}

module.exports = BackpackModel;
