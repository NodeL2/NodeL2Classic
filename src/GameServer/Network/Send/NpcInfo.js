const PacketSend = invoke('Packet/Send');

function NpcInfo(npc, masks) {
    const packet = new PacketSend(0x0c);

    packet
        .writeD(npc.fetchId())
        .writeC(0x00)
        .writeH(37)
        .writeB(masks.fetchMasks())
        .writeC(masks.fetchSize());

    if (masks.contains(masks.component.M_ATTACKABLE)) {
        packet
            .writeC(npc.fetchAttackable());
    }

    if (masks.contains(masks.component.M_RELATION)) {
        packet
            .writeD(0x00);
    }

    if (masks.contains(masks.component.M_TITLE)) {
        packet
            .writeS(npc.fetchTitle());
    }

    packet
        .writeH(masks.fetchBlockSize());

    if (masks.contains(masks.component.M_ID)) {
        packet
            .writeD(npc.fetchDispSelfId());
    }

    if (masks.contains(masks.component.M_POSITION)) {
        packet
            .writeD(npc.fetchLocX())
            .writeD(npc.fetchLocY())
            .writeD(npc.fetchLocZ());
    }

    if (masks.contains(masks.component.M_HEADING)) {
        packet
            .writeD(npc.fetchHead());
    }

    if (masks.contains(masks.component.M_UNKNOWN2)) {
        packet
            .writeD(0x00); // Unknown
    }

    if (masks.contains(masks.component.M_ATK_CAST_SPEED)) {
        packet
            .writeD(npc.fetchAtkSpd())
            .writeD(npc.fetchCastSpd());
    }

    if (masks.contains(masks.component.M_SPEED_MULTIPLIER)) {
        packet
            .writeE(1.0)  // Movement Multiplier
            .writeE(1.0); // Atk. Speed Multiplier
    }

    if (masks.contains(masks.component.M_EQUIPPED)) {
        packet
            .writeD(npc.fetchWeapon())
            .writeD(0x00)
            .writeD(npc.fetchShield());
    }

    if (masks.contains(masks.component.M_ALIVE)) {
        packet
            .writeC(0x01);
    }

    if (masks.contains(masks.component.M_RUNNING)) {
        packet
            .writeC(0x00);
    }

    if (masks.contains(masks.component.M_SWIM_OR_FLY)) {
        packet
            .writeC(0x00);
    }

    if (masks.contains(masks.component.M_TEAM)) {
        packet
            .writeC(0x00);
    }

    if (masks.contains(masks.component.M_ENCHANT)) {
        packet
            .writeD(0x00);
    }

    if (masks.contains(masks.component.M_FLYING)) {
        packet
            .writeD(0x00);
    }

    if (masks.contains(masks.component.M_CLONE)) {
        packet
            .writeD(0x00);
    }

    if (masks.contains(masks.component.M_COLOR_EFFECT)) {
        packet
            .writeD(0x00);
    }

    if (masks.contains(masks.component.M_DISPLAY_EFFECT)) {
        packet
            .writeD(0x00);
    }

    if (masks.contains(masks.component.M_TRANSFORMATION)) {
        packet
            .writeD(0x00);
    }

    if (masks.contains(masks.component.M_CURRENT_HP)) {
        packet
            .writeD(npc.fetchHp());
    }

    if (masks.contains(masks.component.M_CURRENT_MP)) {
        packet
            .writeD(npc.fetchMp());
    }

    if (masks.contains(masks.component.M_MAX_HP)) {
        packet
            .writeD(npc.fetchMaxHp());
    }

    if (masks.contains(masks.component.M_MAX_MP)) {
        packet
            .writeD(npc.fetchMaxMp());
    }

    if (masks.contains(masks.component.M_SUMMONED)) {
        packet
            .writeC(0x00);
    }

    if (masks.contains(masks.component.M_UNKNOWN12)) {
        packet
            .writeD(0x00)
            .writeD(0x00);
    }

    if (masks.contains(masks.component.M_NAME)) {
        packet
            .writeS(npc.fetchName());
    }

    if (masks.contains(masks.component.M_NAME_NPC_ID)) {
        packet
            .writeD(0x00);
    }

    if (masks.contains(masks.component.M_TITLE_NPC_ID)) {
        packet
            .writeD(0x00);
    }

    if (masks.contains(masks.component.M_PVP_FLAG)) {
        packet
            .writeC(0x00);
    }

    if (masks.contains(masks.component.M_REPUTATION)) {
        packet
            .writeD(0x00);
    }

    if (masks.contains(masks.component.M_CLAN)) {
        packet
            .writeD(0x00)
            .writeD(0x00)
            .writeD(0x00)
            .writeD(0x00)
            .writeD(0x00);
    }

    if (masks.contains(masks.component.M_VISUAL_STATE)) {
        packet
            .writeC(0x00 | 0x04 | 0x08);
    }

    if (masks.contains(masks.component.M_ABNORMALS)) {
        packet
            .writeH(0x00);
    }

    return packet.fetchBuffer();
}

module.exports = NpcInfo;
