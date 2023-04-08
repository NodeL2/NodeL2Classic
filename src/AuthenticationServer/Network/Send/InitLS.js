const PacketSend = invoke('Packet/Send');

function initLS(sessionId, protocol, blowfish) {
    const packet = new PacketSend(0x00);

    packet
        .writeD(sessionId)
        .writeD(protocol)
        .writeB(require('rsa-raw').scrambleMod())
        .writeB(Buffer.alloc(16))  // GameGuard
        .writeB(blowfish)
        .writeC(0x00)              // Termination
        .writeB(Buffer.alloc(14)); // XOR

    // XOR encode contents
    packet.buffer = invoke('Cipher/XOR').authEncipher(packet.buffer);
    return packet.fetchBuffer(false);
}

module.exports = initLS;
