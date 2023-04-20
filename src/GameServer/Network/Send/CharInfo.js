const PacketSend = invoke('Packet/Send');

function charInfo(actor) {
    const packet = new PacketSend(0x31);

    packet
        .writeC(0x00)  // ?
        .writeD(actor.fetchLocX())
        .writeD(actor.fetchLocY())
        .writeD(actor.fetchLocZ())
        .writeD(0x00)  // Vehicle Id
        .writeD(actor.fetchId())
        .writeS(actor.fetchName())
        .writeH(actor.fetchRace())
        .writeC(actor.fetchSex())
        .writeD(actor.fetchClassId())
        .writeD(actor.backpack.fetchPaperdollId( 0))  // Underwear
        .writeD(actor.backpack.fetchPaperdollId( 6))  // Head
        .writeD(actor.backpack.fetchPaperdollId( 7))  // Weapon
        .writeD(actor.backpack.fetchPaperdollId( 8))  // Shield
        .writeD(actor.backpack.fetchPaperdollId( 9))  // Hands
        .writeD(actor.backpack.fetchPaperdollId(10))  // Chest
        .writeD(actor.backpack.fetchPaperdollId(11))  // Pants
        .writeD(actor.backpack.fetchPaperdollId(12))  // Feet
        .writeD(actor.backpack.fetchPaperdollId(13))  // Cloak
        .writeD(actor.backpack.fetchPaperdollId(14))  // Dual Weapon
        .writeD(actor.backpack.fetchPaperdollId(15))  // Hair
        .writeD(actor.backpack.fetchPaperdollId(16))  // Hair?
        .writeD(0x00)
        .writeD(0x00)
        .writeD(0x00)
        .writeD(0x00)
        .writeD(0x00)
        .writeD(0x00)
        .writeC(0x00)  // Armor Enchant
        .writeD(actor.backpack.fetchPaperdollSelfId( 7))  // Weapon
        .writeD(actor.backpack.fetchPaperdollSelfId( 8))  // Shield
        .writeD(actor.backpack.fetchPaperdollSelfId(14))  // Dual Weapon?
        .writeD(actor.backpack.fetchPaperdollSelfId( 9))  // Hands
        .writeD(actor.backpack.fetchPaperdollSelfId(10))  // Chest
        .writeD(actor.backpack.fetchPaperdollSelfId(11))  // Pants
        .writeD(actor.backpack.fetchPaperdollSelfId(12))  // Feet
        .writeD(actor.backpack.fetchPaperdollSelfId(15))  // Hair
        .writeD(actor.backpack.fetchPaperdollSelfId(16))  // Hair?
        .writeC(0x00)  // PvP
        .writeD(actor.fetchReputation())
        .writeD(actor.fetchCastSpd())
        .writeD(actor.fetchAtkSpd())
        .writeH(actor.fetchRunSpd())
        .writeH(actor.fetchWalkSpd())
        .writeH(actor.fetchSwim())
        .writeH(actor.fetchSwim())
        .writeH(0x00)  // ?
        .writeH(0x00)  // ?
        .writeH(0x00)  // ?
        .writeH(0x00)  // ?
        .writeF(1.0)   // Move Multiplier
        .writeF(1.0)   // Atk. Speed Multiplier
        .writeF(actor.fetchRadius())
        .writeF(actor.fetchSize())
        .writeD(actor.fetchHair())
        .writeD(actor.fetchHairColor())
        .writeD(actor.fetchFace())
        .writeS(actor.fetchTitle())
        .writeD(0x00)  // Clan Id
        .writeD(0x00)  // Clan Crest Id
        .writeD(0x00)  // Ally Id
        .writeD(0x00)  // Ally Crest Id
        .writeC(0x01)  // Standing = 1
        .writeC(0x01)  // Running = 1
        .writeC(0x00)  // Combat = 1
        .writeC(0x00)  // Dead = 1
        .writeC(0x00)  // Invisible = 1
        .writeC(0x00)  // Mount
        .writeC(0x00)  // Sells
        .writeH(0x00)  // Cubic count
        .writeC(0x00)  // Teamup Match
        .writeC(0x00)  // ?
        .writeH(actor.fetchEvalScore())
        .writeD(0x00)  // Mount Id
        .writeD(actor.fetchClassId())
        .writeD(0x00)  // ?
        .writeC(0x00)  // ?
        .writeC(0x00)  // ?
        .writeD(0x00)  // ?
        .writeC(0x00)  // Noble
        .writeC(0x00)  // Hero
        .writeC(0x00)  // Fishes
        .writeD(0x00)  // Fishes X
        .writeD(0x00)  // Fishes Y
        .writeD(0x00)  // Fishes Z
        .writeD(0xffffff)
        .writeD(actor.fetchHead())
        .writeC(0x00)  // ?
        .writeH(0x00)  // ?
        .writeD(0x00)  // Title Color
        .writeC(0x00)  // Cursed Weapon Equipped
        .writeD(0x00)  // Clan Reputation Score
        .writeD(0x00)  // Transformation Id
        .writeD(0x00)  // ?
        .writeC(0x00)  // ?
        .writeD(0x00)  // CP
        .writeD(actor.fetchMaxHp())
        .writeD(actor.fetchHp())
        .writeD(actor.fetchMaxMp())
        .writeD(actor.fetchMp())
        .writeC(0x00)  // ?
        .writeD(0x00)  // Abnormal effect
        .writeC(0x00)  // True Hero
        .writeC(0x00)  // Hair Accessories
        .writeC(0x00); // Points Used

    return packet.fetchBuffer();
}

module.exports = charInfo;
