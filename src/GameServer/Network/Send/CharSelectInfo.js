const PacketSend = invoke('Packet/Send');

function charSelectInfo(characters) {
    const packet = new PacketSend(0x09);

    packet
        .writeD(utils.size(characters))
        .writeD(0x07)  // Max characters
        .writeC(0x00)  // Character creation forbidden
        .writeC(0x02)  // Free
        .writeD(0x02)  // EU client
        .writeC(0x00); // Premium account

    characters.forEach((character) => {
        packet
            .writeS(character.name)
            .writeD(character.id)
            .writeS(character.username)
            .writeD(0x55555555)
            .writeD(0x00)  // Clan Id
            .writeD(0x00)  // ?
            .writeD(character.sex)
            .writeD(character.race)
            .writeD(character.classId)
            .writeD(0x01)  // ?
            .writeD(character.locX)
            .writeD(character.locY)
            .writeD(character.locZ)
            .writeF(character.hp)
            .writeF(character.mp)
            .writeQ(character.sp)
            .writeQ(character.exp)
            .writeF(0.0)   // Exp %
            .writeD(character.level)
            .writeD(character.reputation)
            .writeD(character.pk)
            .writeD(character.pvp)
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?

        for (let i = 0; i < 33; i++) {
            packet
                .writeD(character.paperdoll[i].id);
        }

        for (let i = 7; i < 17; i = i + (i !== 12 ? 1 : 2)) {
            packet
                .writeD(character.paperdoll[i].selfId);
        }

        packet
            .writeH(0x00)
            .writeH(0x00)
            .writeH(0x00)
            .writeH(0x00)
            .writeH(0x00)
            .writeD(character.hair)
            .writeD(character.hairColor)
            .writeD(character.face)
            .writeF(character.maxHp)
            .writeF(character.maxMp)
            .writeD(0x00)  // Time before deletion
            .writeD(character.classId)
            .writeD(0x00)  // ?
            .writeC(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // Pet Id
            .writeD(0x00)  // Pet Level
            .writeD(0x00)  // Pet Food
            .writeD(0x00)  // Pet Food Level
            .writeQ(0x00)  // Current Pet HP
            .writeQ(0x00)  // Current Pet MP
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(0x00)  // ?
            .writeD(character.isActive)
            .writeC(0x00)  // Noble
            .writeC(0x00)  // Hero
            .writeC(0x00); // Show Accessories?
    });

    return packet.fetchBuffer();
}

module.exports = charSelectInfo;
