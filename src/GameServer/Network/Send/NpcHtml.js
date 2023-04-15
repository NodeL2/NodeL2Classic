const PacketSend = invoke('Packet/Send');

function npcHtml(id, html) {
    const packet = new PacketSend(0x19);

    packet
        .writeD(id)
        .writeS(html)
        .writeD(0);

    return packet.fetchBuffer();
}

module.exports = npcHtml;
