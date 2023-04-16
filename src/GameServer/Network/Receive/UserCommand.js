const PacketReceive = invoke('Packet/Receive');

function userCommand(session, buffer) {
    const packet = new PacketReceive(buffer);

    packet
        .readD(); // Command

    consume(session, {
        command: packet.data[0]
    });
}

function consume(session, data) {
    if (data.command ===  0) { // Loc
        const actor = session.actor;
        utils.infoWarn('GameServer', 'current position is locX: ' + actor.fetchLocX() + ', locY: ' + actor.fetchLocY() + ', locZ: ' + actor.fetchLocZ() + ', head: ' + actor.fetchHead());
        return;
    }

    if (data.command === 52) { // Unstuck
        return;
    }

    utils.infoWarn('GameServer', 'unknown user command %d', data.command);
}

module.exports = userCommand;
