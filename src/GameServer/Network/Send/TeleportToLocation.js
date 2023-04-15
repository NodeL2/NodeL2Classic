const PacketSend = invoke('Packet/Send');

function teleportToLocation(id, data) {
    const packet = new PacketSend(0x22);

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

module.exports = teleportToLocation;
