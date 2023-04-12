const PacketSend = invoke('Packet/Send');

function itemsList(items, popup = false) {
    const packet = new PacketSend(0x11);

    packet
        .writeH(popup)
        .writeH(utils.size(items));

    return packet.fetchBuffer();
}

module.exports = itemsList;
