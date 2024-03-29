const ServerResponse = invoke('GameServer/Network/Send');
const PacketReceive  = invoke('Packet/Receive');

function speak(session, buffer) {
    let packet = new PacketReceive(buffer);

    packet
        .readS()  // Text
        .readD(); // Kind

    consume(session, {
        text: packet.data[0],
        kind: packet.data[1],
    });
}

function consume(session, data) {
    if (data.kind === 0) { // TODO: Remove, temp solution
        if (data.text === '.admin') {
            session.actor.showAdminPanel();
            return;
        }
    }

    session.dataSend(
        ServerResponse.speak(session.actor, data)
    );
}

module.exports = speak;
