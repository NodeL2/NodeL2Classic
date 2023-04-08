const PacketSend = invoke('Packet/Send');

function serversList(hostname, optn) {
    const packet = new PacketSend(0x04);

    packet
        .writeC(0x01)  // Amount of servers
        .writeC(0x00)  // Last server
        .writeC(optn.id)
        .writeC(hostname[0])
        .writeC(hostname[1])
        .writeC(hostname[2])
        .writeC(hostname[3])
        .writeD(optn.port)
        .writeC(0x00)  // Limit
        .writeC(optn.pvp)
        .writeH(0x00)  // Connected users
        .writeH(optn.maxOnline)
        .writeC(0x01)  // Status ? Up = 1, Down = 0
        .writeD(0x01)  // ?
        .writeC(0x00)  // Server Brackets
        .writeH(0x00); // ?

    return packet.fetchBuffer();
}

module.exports = serversList;
