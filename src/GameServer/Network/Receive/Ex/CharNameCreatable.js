const PacketReceive = invoke('Packet/Receive');

function charNameCreatable(session, buffer) {
    const packet = new PacketReceive(buffer);

    packet
        .readS();

    consume(session, {
        name: packet.data[0]
    });
}

function consume(session, data) {
    utils.infoFail('GameServer', data);
}

module.exports = charNameCreatable;
