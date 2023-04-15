const PacketSend = invoke('Packet/Send');

function speak(actor, data) {
    const packet = new PacketSend(0x4a);

    packet
        .writeD(actor.fetchId())
        .writeD(data.kind)
        .writeS(actor.fetchName())
        .writeD(-1)
        .writeS(data.text);

    return packet.fetchBuffer();
}

module.exports = speak;
