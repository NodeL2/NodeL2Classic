const PacketSend = invoke('Packet/Send');

function charNameCreatable(resultCode) {
    const packet = new PacketSend(0xfe);

    packet
        .writeH(0x10b)
        .writeD(resultCode);

    return packet.fetchBuffer();
}

module.exports = charNameCreatable;
