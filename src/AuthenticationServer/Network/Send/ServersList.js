const PacketSend = invoke('Packet/Send');

function serversList(hostname) {
    const packet = new PacketSend(0x04);

    packet
        .writeC(0x01)  // Amount of Servers
        .writeC(0x00)
        .writeC(0x01)
        .writeC(hostname[0])
        .writeC(hostname[1])
        .writeC(hostname[2])
        .writeC(hostname[3])
        .writeD(7777)
        .writeC(0x00)  // Limit
        .writeC(0x00)  // PvP
        .writeH(0x00)  // Connected users
        .writeH(0x50)  // Max users
        .writeC(0x01)  // Status
        .writeD(0x01)  // Kind
        .writeC(0x00)  // Server Brackets
        .writeH(0xa4); // ?

    return packet.fetchBuffer();
}

module.exports = serversList;
