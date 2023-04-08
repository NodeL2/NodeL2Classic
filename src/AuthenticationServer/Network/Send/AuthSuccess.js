const PacketSend = invoke('Packet/Send');

function authSuccess(secret) {
    const packet = new PacketSend(0x03);

    packet
        .writeD(secret) // Secret (first)
        .writeD(0x00)   // Secret (last)
        .writeD(0x00)
        .writeD(0x00)
        .writeD(0x000003ea)
        .writeD(0x00)
        .writeD(0x00)
        .writeD(0x00)
        .writeB(Buffer.alloc(16));

    return packet.fetchBuffer();
}

module.exports = authSuccess;
