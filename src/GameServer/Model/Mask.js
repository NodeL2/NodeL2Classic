class Mask {
    constructor(selection, name) {
        this.masks = utils.tupleAlloc(5, 0x00);
        this.name  = name;
        this.iSize = 0;

        this.block = [
            0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01
        ];
    }

    // Set

    addMask(mask) {
        this.masks[mask.data >> 3] |= this.block[mask.data & 0x7];
    }

    // Get

    fetchMasks() {
        return this.masks;
    }

    fetchSize() {
        return this.iSize;
    }

    // Abstract

    reset(selection) {
        if (!utils.size(selection)) {
            for (let component in this.component) {
                selection.push(component);
            }
        }
    }

    parse(selection) {
        selection.forEach((item) => {
            this.addSize(this.component[item], item);
            this.addMask(this.component[item]);
        });
    }

    contains(mask) {
        return this.masks[mask.data >> 3] & this.block[mask.data & 0x7];
    }
}

module.exports = Mask;
