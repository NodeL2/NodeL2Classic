class CreatureMask {
    constructor(selection = []) {
        this.masks = utils.tupleAlloc(3, 0x00);
        this.size  = 5;

        this.component = {
            M_RELATION        : { data: 0x00, size:  4 },
            M_BASIC_INFO      : { data: 0x01, size: 16 },
            M_BASE_STATS      : { data: 0x02, size: 18 },
            M_MAX_HPMPCP      : { data: 0x03, size: 14 },
            M_HPMPCP_EXP_SP   : { data: 0x04, size: 38 },
            M_ENCHANT_LEVEL   : { data: 0x05, size:  4 },
            M_APPEARANCE      : { data: 0x06, size: 15 },
            M_STATUS          : { data: 0x07, size:  6 },
            M_STATS           : { data: 0x08, size: 56 },
            M_ELEMENTALS      : { data: 0x09, size: 14 },
            M_POSITION        : { data: 0x0a, size: 18 },
            M_SPEED           : { data: 0x0b, size: 18 },
            M_MULTIPLIER      : { data: 0x0c, size: 18 },
            M_RADIUS_HEIGHT   : { data: 0x0d, size: 18 },
            M_ATK_ELEMENTAL   : { data: 0x0e, size:  5 },
            M_CLAN            : { data: 0x0f, size: 32 },
            M_SOCIAL          : { data: 0x10, size: 22 },
            M_VITA_FAME       : { data: 0x11, size: 15 },
            M_SLOTS           : { data: 0x12, size:  9 },
            M_MOVEMENTS       : { data: 0x13, size:  4 },
            M_COLOR           : { data: 0x14, size: 10 },
            M_INVENTORY_LIMIT : { data: 0x15, size:  9 },
            M_TRUE_HERO       : { data: 0x16, size:  9 },
        };

        this.block = [
            0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01
        ];

        if (!utils.size(selection)) {
            for (let component in this.component) {
                selection.push(component);
            }
        }

        selection.forEach((item) => {
            this.addSize(this.component[item]);
            this.addMask(this.component[item]);
        });
    }

    // Set

    addSize(mask) {
        this.size += mask.size;
    }

    addMask(mask) {
        this.masks[mask.data >> 3] |= this.block[mask.data & 0x7];
    }

    // Get

    fetchMasks() {
        return this.masks;
    }

    fetchSize() {
        return this.size;
    }

    // Abstract

    contains(mask) {
        return this.masks[mask.data >> 3] & this.block[mask.data & 0x7];
    }
}

module.exports = CreatureMask;
