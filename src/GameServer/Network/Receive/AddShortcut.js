const ServerResponse = invoke('GameServer/Network/Send');
const PacketReceive  = invoke('Packet/Receive');

function addShortcut(session, buffer) {
    const packet = new PacketReceive(buffer);

    packet
        .readD()  // Kind
        .readD()  // Slot
        .readD()  // Id
        .readD(); // Level

    consume(session, {
         kind: packet.data[0],
         slot: packet.data[1],
           id: packet.data[2],
        level: packet.data[3],
    });
}

function consume(session, data) {
    session.dataSend(
        ServerResponse.addShortcut(data)
    );
}

module.exports = addShortcut;
