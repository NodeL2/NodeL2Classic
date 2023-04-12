const SendPacket = invoke('Packet/Send');

function skillsList(skills) {
    const packet = new SendPacket(0x5f);

    packet
        .writeD(utils.size(skills));

    return packet.fetchBuffer();
}

module.exports = skillsList;
