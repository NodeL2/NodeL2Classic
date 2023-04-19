const PacketSendEx = invoke('Packet/SendEx');

function teleportActivate(id, data) {
    const packet = new PacketSendEx(0xfe, 0x14a);

    packet
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
