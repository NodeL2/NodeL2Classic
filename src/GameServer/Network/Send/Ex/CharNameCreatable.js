const PacketSendEx = invoke('Packet/SendEx');

function charNameCreatable(resultCode) {
    const packet = new PacketSendEx(0xfe, 0x10b);

    packet
        .writeD(resultCode);

    return packet.fetchBuffer();
}

module.exports = charNameCreatable;
