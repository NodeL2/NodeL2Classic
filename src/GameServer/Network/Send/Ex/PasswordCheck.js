const PacketSendEx = invoke('Packet/SendEx');

function passwordCheck() {
    const packet = new PacketSendEx(0xfe, 0x105);

    packet
        .writeD(0x02)  // Password OK
        .writeD(0x00);

    return packet.fetchBuffer();
}

module.exports = passwordCheck;
