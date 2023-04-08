const ServerResponse = invoke('GameServer/Network/Send');
const PacketReceive  = invoke('Packet/Receive');

function authUser(session, buffer) {
    const packet = new PacketReceive(buffer);

    packet
        .readS()  // Username
        .readD()  // Secret (last)
        .readD(); // Secret (first)

    consume(session, {
        username: packet.data[0],
          secret: packet.data[2],
    });
}

function consume(session, data) {
    session.dataSend(ServerResponse.authResult(-1, 0x00));
    session.dataSend(ServerResponse.charSelectInfo());
}

module.exports = authUser;
