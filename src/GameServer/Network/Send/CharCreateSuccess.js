const PacketSend = invoke('Packet/Send');

function charCreateSuccess() {
    const packet = new PacketSend(0x0f);

    packet
        .writeD(0x01);

    return packet.fetchBuffer();
}

module.exports = charCreateSuccess;
