const PacketSend = invoke('Packet/Send');

function enterSuccess(secret) {
    const packet = new PacketSend(0x07);

    packet
        .writeD(secret) // Secret (first)
        .writeD(0x00);  // Secret (last)

    return packet.fetchBuffer();
}

module.exports = enterSuccess;
