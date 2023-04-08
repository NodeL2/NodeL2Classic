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

    const hostname = session.socket.remoteAddress.split('.');
    if (!['10', '127'].includes(hostname[0])) {
        utils.infoFail('AuthServer', 'unhandled WAN Address');
        return;
    }

    session.dataSend(
        ServerResponse.serversList(hostname, options.default.GameServer)
    );
}

module.exports = serversList;
