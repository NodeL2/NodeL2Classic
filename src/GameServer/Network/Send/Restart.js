const PacketSend = invoke('Packet/Send');

function restart() {
    const packet = new PacketSend(0x71);

    packet
        .writeD(0x01);

    return packet.fetchBuffer();
}

module.exports = restart;
