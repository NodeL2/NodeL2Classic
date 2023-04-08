const ServerResponse = invoke('AuthenticationServer/Network/Send');
const PacketReceive  = invoke('Packet/Receive');

function authGameGuard(session, buffer) {
    const packet = new PacketReceive(buffer);

    packet
        .readD(); // Session Id

    consume(session, {
        sessionId: packet.data[0]
    });
}

function consume(session, data) {
    // Assert there's no attempt to force connect
    if (data.sessionId !== session.sessionId) {
        session.dataSend(ServerResponse.authFail(0x04));
        return;
    }

    session.dataSend(
        ServerResponse.authGameGuard(data.sessionId)
    );
}

module.exports = authGameGuard;
