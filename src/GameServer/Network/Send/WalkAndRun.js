const PacketSend = invoke('Packet/Send');

function walkAndRun(creatureId, movement) {
    const packet = new PacketSend(0x28);

    packet
        .writeD(creatureId)
        .writeD(movement)
        .writeD(0x00); // C2?

    return packet.fetchBuffer();
}

module.exports = walkAndRun;
