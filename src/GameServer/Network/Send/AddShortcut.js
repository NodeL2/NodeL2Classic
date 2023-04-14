const PacketSend = invoke('Packet/Send');

function addShortcut(data) {
    const packet = new PacketSend(0x44);

    packet
        .writeD(data.kind)
        .writeD(data.slot)
        .writeD(data.id)
        .writeD(data.level);

    return packet.fetchBuffer();
}

module.exports = addShortcut;
