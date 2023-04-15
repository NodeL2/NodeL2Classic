const PacketSend = invoke('Packet/Send');

function socialAction(id, actionId) {
    const packet = new PacketSend(0x27);

    packet
        .writeD(id)
        .writeD(actionId)
        .writeD(0x00);

    return packet.fetchBuffer();
}

module.exports = socialAction;
