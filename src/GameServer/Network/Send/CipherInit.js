const PacketSend = invoke('Packet/Send');

function cipherInit(protocolMatches, optn) { // TODO: Provide actual XOR
    const packet = new PacketSend(0x2e);

    packet
        .writeC(protocolMatches)
        .writeB(Buffer.alloc(8)) // XOR
        .writeD(0x01)  // Encipher data
        .writeD(optn.id)
        .writeC(0x01)  // ?
        .writeD(0x00)  // Obfuscation
        .writeC(optn.kind === 0x400);

    return packet.fetchBuffer();
}

module.exports = cipherInit;
