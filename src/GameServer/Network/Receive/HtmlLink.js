const World         = invoke('GameServer/World/World');
const PacketReceive = invoke('Packet/Receive');

function htmlLink(session, buffer) {
    const packet = new PacketReceive(buffer);

    packet
        .readS();

    consume(session, {
        link: packet.data[0]
    });
}

function consume(session, data) {
    World.npcTalkResponse(session, data);
}

module.exports = htmlLink;
