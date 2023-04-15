const PacketSend = invoke('Packet/Send');

function sitAndStand(actor) {
    const packet = new PacketSend(0x29);

    packet
        .writeD(actor.fetchId())
        .writeD(actor.state.fetchSeated() ? 0 : 1)
        .writeD(actor.fetchLocX())
        .writeD(actor.fetchLocY())
        .writeD(actor.fetchLocZ());

    return packet.fetchBuffer();
}

module.exports = sitAndStand;
