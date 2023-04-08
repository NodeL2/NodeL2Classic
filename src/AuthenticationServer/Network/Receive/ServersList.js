const ServerResponse = invoke('AuthenticationServer/Network/Send');
const PacketReceive  = invoke('Packet/Receive');

function serversList(session, buffer) {
    const packet = new PacketReceive(buffer);

    packet
        .readD()  // Secret (first)
        .readD(); // Secret (last)

    consume(session, {
        secret: packet.data[0]
    });
}

function consume(session, data) {
    // Assert there's no attempt to force connect
    if (data.secret !== session.secret) {
        session.dataSend(ServerResponse.authFail(0x04));
        return;
    }

    session.dataSend(
        ServerResponse.serversList('127.0.0.1'.split('.'))
    );
}

module.exports = serversList;
