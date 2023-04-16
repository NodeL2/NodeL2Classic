const PacketReceive = invoke('Packet/Receive');
const Database      = invoke('Database');

function removeShortcut(session, buffer) {
    const packet = new PacketReceive(buffer);

    packet
        .readD(); // Slot

    consume(session, {
        slot: packet.data[0]
    });
}

function consume(session, data) {
    Database.shortcutDelete(session.actor.fetchId(), data.slot);
}

module.exports = removeShortcut;
