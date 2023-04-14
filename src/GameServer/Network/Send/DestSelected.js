const SendPacket = invoke('Packet/Send');

function destSelected(id, lvlDiff = 0) {
    const packet = new SendPacket(0xb9);

    packet
        .writeD(id)
        .writeH(lvlDiff)
        .writeD(0x00);

    return packet.fetchBuffer();
}

module.exports = destSelected;
