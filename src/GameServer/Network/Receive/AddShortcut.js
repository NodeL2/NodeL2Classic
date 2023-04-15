const ServerResponse = invoke('GameServer/Network/Send');
const PacketReceive  = invoke('Packet/Receive');
const Database       = invoke('Database');

function addShortcut(session, buffer) {
    const packet = new PacketReceive(buffer);

    packet
        .readD()  // Kind
        .readD()  // Slot
        .readD()  // Id
        .readD()  // Level
        .readD(); // Creature

    consume(session, {
            kind: packet.data[0],
            slot: packet.data[1],
              id: packet.data[2],
           level: packet.data[3],
        creature: packet.data[4],
    });
}

function consume(session, data) {
    const characterId = session.actor.fetchId();

    Database.deleteShortcut(characterId, data.slot).then(() => {
        Database.setShortcut(characterId, data).then(() => {
            session.dataSend(
                ServerResponse.addShortcut(data)
            );
        });
    });
}

module.exports = addShortcut;
