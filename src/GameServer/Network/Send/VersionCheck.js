const PacketSend = invoke('Packet/Send');

function versionCheck() {
    const packet = new PacketSend(0x2e);

    packet
        .writeC(0x01)  // Protocol Valid
        .writeB(Buffer.alloc(8)) // XOR
        .writeD(0x01)  // ?
        .writeD(0x01)  // Server Id
        .writeC(0x01)  // ?
        .writeD(0x00)  // Obfuscation
        .writeC(0x01); // ?

    return packet.fetchBuffer();
}

module.exports = versionCheck;
