const SendPacket = invoke('Packet/Send');

function charSelected(actor) {
    const packet = new SendPacket(0x0b);

    packet
        .writeS(actor.fetchName())
        .writeD(actor.fetchId())
        .writeS(actor.fetchTitle())
        .writeD(0x55555555)
        .writeD(0x00)  // Clan Id
        .writeD(0x00)  // ?
        .writeD(actor.fetchSex())
        .writeD(actor.fetchRace())
        .writeD(actor.fetchClassId())
        .writeD(actor.fetchActive())
        .writeD(actor.fetchLocX())
        .writeD(actor.fetchLocY())
        .writeD(actor.fetchLocZ())
        .writeF(actor.fetchHp())
        .writeF(actor.fetchMp())
        .writeQ(actor.fetchSp())
        .writeQ(actor.fetchExp())
        .writeD(actor.fetchLevel())
        .writeD(0x00) // Reputation
        .writeD(actor.fetchPk())
        .writeD(0x00)  // Game time
        .writeD(0x00)  // ?
        .writeD(actor.fetchClassId())
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeD(0x00)  // ?
        .writeB(Buffer.alloc(64))
        .writeD(0x00); // ?

    return packet.fetchBuffer();
}

module.exports = charSelected;
