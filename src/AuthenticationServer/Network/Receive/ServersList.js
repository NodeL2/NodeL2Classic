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

    const stats = {
        up: true, population: 500, characters: 5
    };

    const hostname = session.socket.remoteAddress.split('.');
    session.dataSend(
        ServerResponse.serversList(hostname, stats, options.default.GameServer)
    );
}

module.exports = serversList;
