const ServerResponse = invoke('AuthenticationServer/Network/Send');
const PacketReceive  = invoke('Packet/Receive');

function enterGame(session, buffer) {
    const packet = new PacketReceive(buffer);

    packet
        .readD()  // Secret (first)
        .readD()  // Secret (last)
        .readC(); // Server Id

    consume(session, {
          secret: packet.data[0],
        serverId: packet.data[2],
    });
}

function consume(session, data) {
    const optn = options.default.GameServer;

    // Assert there's no attempt to force connect
    if (data.secret !== session.secret || data.serverId !== optn.id) {
        session.dataSend(ServerResponse.enterFail(0x04));
        return;
    }

    session.dataSend(
        ServerResponse.enterSuccess(data.secret)
    );
}

module.exports = enterGame;
