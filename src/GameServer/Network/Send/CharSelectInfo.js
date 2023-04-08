const PacketSend = invoke('Packet/Send');

function charSelectInfo(characters) {
    const packet = new PacketSend(0x09);

    packet
        .writeD(0x00)  // Count
        .writeD(0x07)  // Max characters
        .writeC(0x00)  // Allowed to create character
        .writeC(0x02)  // Free
        .writeD(0x02)  // EU client
        .writeC(0x00); // No premium account

    return packet.fetchBuffer();
}

module.exports = charSelectInfo;
