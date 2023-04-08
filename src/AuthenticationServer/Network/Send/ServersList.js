const PacketSend = invoke('Packet/Send');

function serversList(hostname, stat, optn) {
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
        .writeH(stat.population)
        .writeH(optn.maxOnline)
        .writeC(0x01)  // Up or down
        .writeD(optn.kind)
        .writeC(0x00)  // Brackets
        .writeH(0x00)  // ?
        .writeC(stat.characters)
        .writeC(optn.id)
        .writeC(stat.characters);

    return packet.fetchBuffer();
}

module.exports = serversList;
