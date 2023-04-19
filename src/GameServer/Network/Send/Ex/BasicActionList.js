const PacketSendEx = invoke('Packet/SendEx');

function basicActionList() {
    const packet = new PacketSendEx(0xfe, 0x060);

    packet
        .writeD(17)  // Count

        .writeD( 0)  // Sit/Stand
        .writeD( 1)  // Walk/Run
        .writeD( 2)  // Attack
        .writeD( 5)  // Pick up
        .writeD(40)  // Recommend

        .writeD(12)  // Emote: Greet
        .writeD(13)  // Emote: Win
        .writeD(14)  // Emote: Advance
        .writeD(24)  // Emote: Yes
        .writeD(25)  // Emote: No
        .writeD(26)  // Emote: Bow
        .writeD(29)  // Emote: Unaware
        .writeD(30)  // Emote: Social Wait
        .writeD(31)  // Emote: :)
        .writeD(33)  // Emote: Applaud
        .writeD(34)  // Emote: Dance
        .writeD(35); // Emote: Sorrow

    return packet.fetchBuffer();
}

module.exports = basicActionList;
