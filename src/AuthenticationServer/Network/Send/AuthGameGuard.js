const PacketSend = invoke('Packet/Send');

function authGameGuard(sessionId) {
    const packet = new PacketSend(0x0b);

    packet
        .writeD(sessionId);

    return packet.fetchBuffer();
}

module.exports = authGameGuard;
