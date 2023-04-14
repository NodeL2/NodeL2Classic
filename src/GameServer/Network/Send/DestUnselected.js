const SendPacket = invoke('Packet/Send');

function destUnselected(actor) {
    const packet = new SendPacket(0x24);

    packet
        .writeD(actor.fetchId())
        .writeD(actor.fetchLocX())
        .writeD(actor.fetchLocY())
        .writeD(actor.fetchLocZ())
        .writeD(0x00);

    return packet.fetchBuffer();
}

module.exports = destUnselected;
