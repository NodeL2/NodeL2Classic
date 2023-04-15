const PacketSend = invoke('Packet/Send');

function teleportActivate(id, data) {
    const packet = new PacketSend(0xfe);

    packet
        .writeH(0x14a)
        .writeD(id)
        .writeD(data.locX)
        .writeD(data.locY)
        .writeD(data.locZ)
        .writeD(0x00)
        .writeD(data.head)
        .writeD(0x00);

    return packet.fetchBuffer();
}

module.exports = teleportActivate;
