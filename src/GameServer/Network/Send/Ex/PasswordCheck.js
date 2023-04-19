const PacketSend = invoke('Packet/Send');

function passwordCheck() {
    const packet = new PacketSend(0xfe);

    packet
        .writeD(0x105)
        .writeD(0x02)  // Password OK
        .writeD(0x00);

    return packet.fetchBuffer();
}

module.exports = passwordCheck;
