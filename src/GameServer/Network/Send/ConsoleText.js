const PacketSend = invoke('Packet/Send');

function consoleText(textId, params) {
    const packet = new PacketSend(0x62);

    packet
        .writeD(textId)
        .writeD(utils.size(params))

    params.forEach((param) => {
        packet
            .writeD(param.kind)
            .writeD(param.value);
    });

    return packet.fetchBuffer();
}

module.exports = consoleText;
