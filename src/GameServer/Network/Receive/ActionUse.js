const PacketReceive = invoke('Packet/Receive');

function actionUse(session, buffer) {
    const packet = new PacketReceive(buffer);

    packet
        .readD()  // Action Id
        .readD()  // Ctrl
        .readC(); // Shift

    consume(session, {
        actionId: packet.data[0],
            ctrl: packet.data[1],
           shift: packet.data[2],
    });
}

function consume(session, data) {
    session.actor.basicAction(data);
}

module.exports = actionUse;
