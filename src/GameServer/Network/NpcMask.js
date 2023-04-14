class NpcMask {
    constructor(selection, name, title) {
        this.masks = utils.tupleAlloc(5, 0x00);
        this.name  = name;
        this.title = title;
        this.iSize = 0;
        this.bSize = 0;

        this.masks[0x01] = 0x0c;
        this.masks[0x02] = 0x0c;

        this.component = {
            M_ID               : { data: 0x00, size:  4 },
            M_ATTACKABLE       : { data: 0x01, size:  1 },
            M_RELATION         : { data: 0x02, size:  4 },
            M_NAME             : { data: 0x03, size:  2 },
            M_POSITION         : { data: 0x04, size: 12 },
            M_HEADING          : { data: 0x05, size:  4 },
            M_UNKNOWN2         : { data: 0x06, size:  4 },
            M_ATK_CAST_SPEED   : { data: 0x07, size:  8 },
            M_SPEED_MULTIPLIER : { data: 0x08, size:  8 },
            M_EQUIPPED         : { data: 0x09, size: 12 },
            M_ALIVE            : { data: 0x0a, size:  1 },
            M_RUNNING          : { data: 0x0b, size:  1 },
            M_SWIM_OR_FLY      : { data: 0x0e, size:  1 },
            M_TEAM             : { data: 0x0f, size:  1 },
            M_ENCHANT          : { data: 0x10, size:  4 },
            M_FLYING           : { data: 0x11, size:  4 },
            M_CLONE            : { data: 0x12, size:  4 },
            M_COLOR_EFFECT     : { data: 0x13, size:  4 },
            M_DISPLAY_EFFECT   : { data: 0x16, size:  4 },
            M_TRANSFORMATION   : { data: 0x17, size:  4 },
            M_CURRENT_HP       : { data: 0x18, size:  4 },
            M_CURRENT_MP       : { data: 0x19, size:  4 },
            M_MAX_HP           : { data: 0x1a, size:  4 },
            M_MAX_MP           : { data: 0x1b, size:  4 },
            M_SUMMONED         : { data: 0x1c, size:  1 },
            M_UNKNOWN12        : { data: 0x1d, size:  8 },
            M_TITLE            : { data: 0x1e, size:  2 },
            M_NAME_NPC_ID      : { data: 0x1f, size:  4 },
            M_TITLE_NPC_ID     : { data: 0x20, size:  4 },
            M_PVP_FLAG         : { data: 0x21, size:  1 },
            M_REPUTATION       : { data: 0x22, size:  4 },
            M_CLAN             : { data: 0x23, size: 20 },
            M_ABNORMALS        : { data: 0x24, size:  0 },
            M_VISUAL_STATE     : { data: 0x25, size:  1 },
        };

        this.block = [
            0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01
        ];

        // Reset contents, and parse components
        this.reset(selection);
        this.parse(selection)
    }

    // Set

    addSize(mask, component) {
        switch (component) {
            case 'M_ATTACKABLE':
            case 'M_RELATION':
                this.iSize += mask.size;
                break;

            case 'M_TITLE':
                this.iSize += mask.size + utils.textSize(this.title);
                break;

            case 'M_NAME':
                this.bSize += mask.size + utils.textSize(this.name);
                break;

            default:
                this.bSize += mask.size;
                break;
        }
    }

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

    fetchBlockSize() {
        return this.bSize;
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

module.exports = NpcMask;
