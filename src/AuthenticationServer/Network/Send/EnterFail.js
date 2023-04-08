const PacketSend = invoke('Packet/Send');

function enterFail(reasonCode) {
    const packet = new PacketSend(0x06);

    packet
        .writeC(reasonCode);

    return packet.fetchBuffer();
}

module.exports = enterFail;
