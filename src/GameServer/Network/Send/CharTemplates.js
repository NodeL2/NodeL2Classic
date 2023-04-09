const PacketSend = invoke('Packet/Send');

function charTemplates() {
    const packet = new PacketSend(0x0d);

    packet
        .writeD(0x00);

    return packet.fetchBuffer();
}

module.exports = charTemplates;
