const PacketSend = invoke('Packet/Send');

function showMap() {
    const packet = new PacketSend(0xa3);

    packet
        .writeD(0x00)
        .writeC(0x00);

    return packet.fetchBuffer();
}

module.exports = showMap;
