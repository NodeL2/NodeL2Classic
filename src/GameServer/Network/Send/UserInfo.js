const PacketSend = invoke('Packet/Send');

function userInfo(actor, masks) {
    const packet = new PacketSend(0x32);

    packet
        .writeD(actor.fetchId())
        .writeD(masks.fetchSize())
        .writeH(23)
        .writeB(masks.fetchMasks());

    if (masks.contains(masks.component.M_RELATION)) {
        packet
            .writeD(0x00);
    }

    if (masks.contains(masks.component.M_BASIC_INFO)) {
        packet
            .writeH(16 + utils.textSize(actor.fetchName()))
            .writeT(actor.fetchName())
            .writeC(actor.fetchGM())
            .writeC(actor.fetchRace())
            .writeC(actor.fetchSex())
            .writeD(actor.fetchClassId())
            .writeD(actor.fetchClassId())
            .writeC(actor.fetchLevel());
    }

    if (masks.contains(masks.component.M_BASE_STATS)) {
        packet
            .writeH(18)
            .writeH(actor.fetchStr())
            .writeH(actor.fetchDex())
            .writeH(actor.fetchCon())
            .writeH(actor.fetchInt())
            .writeH(actor.fetchWit())
            .writeH(actor.fetchMen())
            .writeH(0x00)  // ?
            .writeH(0x00); // ?
    }

    if (masks.contains(masks.component.M_MAX_HPMPCP)) {
        packet
            .writeH(14)
            .writeD(actor.fetchMaxHp())
            .writeD(actor.fetchMaxMp())
            .writeD(0x00); // ?
    }

    if (masks.contains(masks.component.M_HPMPCP_EXP_SP)) {
        packet
            .writeH(38)
            .writeD(actor.fetchHp())
            .writeD(actor.fetchMp())
            .writeD(0x00)  // ?
            .writeQ(actor.fetchSp())
            .writeQ(actor.fetchExp())
            .writeF(0.0);  // Exp %
    }

    if (masks.contains(masks.component.M_ENCHANT_LEVEL)) {
        packet
            .writeH(4)
            .writeC(0x00)  // Weapon Enchant
            .writeC(0x00); // Armor Set Enchant
    }

    if (masks.contains(masks.component.M_APPEARANCE)) {
        packet
            .writeH(15)
            .writeD(actor.fetchHair())
            .writeD(actor.fetchHairColor())
            .writeD(actor.fetchFace())
            .writeC(0x00); // Show Accessories
    }

    if (masks.contains(masks.component.M_STATUS)) {
        packet
            .writeH(6)
            .writeC(0x00)  // Mount
            .writeC(0x00)  // Private Store
            .writeC(actor.fetchCrafter())
            .writeC(0x00); // ?
    }

    if (masks.contains(masks.component.M_STATS)) {
        packet
            .writeH(56)
            .writeH(0x00)  // ?
            .writeD(actor.fetchPAtk())
            .writeD(actor.fetchAtkSpd())
            .writeD(actor.fetchPDef())
            .writeD(actor.fetchEvasion())
            .writeD(actor.fetchAccur())
            .writeD(actor.fetchCritical())
            .writeD(actor.fetchMAtk())
            .writeD(actor.fetchCastSpd())
            .writeD(actor.fetchAtkSpd())
            .writeD(0x00)  // mEvasion?
            .writeD(actor.fetchMDef())
            .writeD(0x00)  // mAccur?
            .writeD(0x00); // mCritical?
    }

    if (masks.contains(masks.component.M_ELEMENTALS)) {
        packet
            .writeH(14)
            .writeH(0x00)  // ?
            .writeH(0x00)  // ?
            .writeH(0x00)  // ?
            .writeH(0x00)  // ?
            .writeH(0x00)  // ?
            .writeH(0x00); // ?
    }

    if (masks.contains(masks.component.M_POSITION)) {
        packet
            .writeH(18)
            .writeD(actor.fetchLocX())
            .writeD(actor.fetchLocY())
            .writeD(actor.fetchLocZ())
            .writeD(0x00); // Vehicle Id
    }

    if (masks.contains(masks.component.M_SPEED)) {
        packet
            .writeH(18)
            .writeH(actor.fetchRunSpd())
            .writeH(actor.fetchWalkSpd())
            .writeH(actor.fetchSwim())
            .writeH(actor.fetchSwim())
            .writeH(0x00)  // ?
            .writeH(0x00)  // ?
            .writeH(0x00)  // ?
            .writeH(0x00); // ?
    }

    if (masks.contains(masks.component.M_MULTIPLIER)) {
        packet
            .writeH(18)
            .writeF(1.0)  // Movement Multiplier
            .writeF(1.0); // Atk. Speed Multiplier
    }

    if (masks.contains(masks.component.M_RADIUS_HEIGHT)) {
        packet
            .writeH(18)
            .writeF(actor.fetchRadius())
            .writeF(actor.fetchSize());
    }

    if (masks.contains(masks.component.M_ATK_ELEMENTAL)) {
        packet
            .writeH(5)
            .writeC(0x00)  // Atk. Element Id
            .writeH(0x00); // Atk. Element Value
    }

    if (masks.contains(masks.component.M_CLAN)) {
        packet
            .writeH(32 + utils.textSize(actor.fetchTitle()))
            .writeT(actor.fetchTitle())
            .writeH(0x00)  // ?
            .writeD(0x00)  // Clan Id
            .writeD(0x00)  // ?
            .writeD(0x00)  // Clan Crest Id
            .writeD(0x00)  // ?
            .writeC(0x00)  // Clan Leader
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeC(0x00); // ?
    }

    if (masks.contains(masks.component.M_SOCIAL)) {
        packet
            .writeH(22)
            .writeC(0x00) // PvP
            .writeD(actor.fetchReputation())
            .writeC(0x00) // Noble
            .writeC(0x00) // Hero
            .writeC(0x00) // ?
            .writeD(actor.fetchPK())
            .writeD(actor.fetchPvP())
            .writeH(actor.fetchRecRemain())
            .writeH(actor.fetchEvalScore());
    }

    if (masks.contains(masks.component.M_VITA_FAME)) {
        packet
            .writeH(15)
            .writeD(0x00)
            .writeC(0x00)
            .writeD(0x00)  // ?
            .writeD(0x00);
    }

    if (masks.contains(masks.component.M_SLOTS)) {
        packet
            .writeH(9)
            .writeC(0x00)  // ?
            .writeC(0x00)  // ?
            .writeC(0x00)  // ?
            .writeC(0x00)  // ?
            .writeC(0x00)  // ?
            .writeC(0x00)  // ?
            .writeC(0x00); // ?
    }

    if (masks.contains(masks.component.M_MOVEMENTS)) {
        packet
            .writeH(4)
            .writeC(0x00)  // Sit/Stand
            .writeC(0x01); // Walk/Run
    }

    if (masks.contains(masks.component.M_COLOR)) {
        packet
            .writeH(10)
            .writeD(0xffffff)
            .writeD(0xffff77);
    }

    if (masks.contains(masks.component.M_INVENTORY_LIMIT)) {
        packet
            .writeH(9)
            .writeH(0x00)  // ?
            .writeH(0x00)  // ?
            .writeH(0x00)  // Backpack limit
            .writeC(0x00); // ?
    }

    if (masks.contains(masks.component.M_TRUE_HERO)) {
        packet
            .writeH(9)
            .writeC(0x01)  // ?
            .writeH(0x00)  // ?
            .writeD(0x00);
    }

    return packet.fetchBuffer();
}

module.exports = userInfo;
