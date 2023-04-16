class ItemModel {
    constructor(data) {
        this.model = data;
    }

    // Set

    setId(data) {
        this.model.id = data;
    }

    // Get

    fetchId() {
        return this.model.id ?? 0;
    }

    fetchSelfId() {
        return this.model.selfId ?? 0;
    }

    fetchAmount() {
        return this.model.amount ?? 1;
    }

    fetchClass1() {
        return this.model.class1 ?? 0;
    }

    fetchClass2() {
        return this.model.class2 ?? 0;
    }
}

module.exports = ItemModel;
