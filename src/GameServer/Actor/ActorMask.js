const MaskModel = invoke('GameServer/Model/Mask');

class ActorMask extends MaskModel {
    constructor(selection, name) {
        // Parent inheritance
        super(selection, name);

        // Local
        this.masks = utils.tupleAlloc(3, 0x00);
        this.iSize = 5;

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

        // Reset contents, and parse components
        this.reset(selection);
        this.parse(selection)
    }

    // Set

    addSize(mask, component) {
        switch (component) {
            case 'M_BASIC_INFO':
                this.iSize += mask.size + utils.textSize(this.name);
                break;

            case 'M_CLAN':
                this.iSize += mask.size + utils.textSize('');
                break;

            default:
                this.iSize += mask.size;
                break;
        }
    }
}

module.exports = ActorMask;
