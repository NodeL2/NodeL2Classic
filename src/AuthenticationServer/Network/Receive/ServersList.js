const ServerResponse = invoke('AuthenticationServer/Network/Send');
const PacketReceive  = invoke('Packet/Receive');
const Database       = invoke('Database');

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

    Database.accountCharacters().then((rows) => {
        const stats = {
            population: utils.size(rows.filter((ob) => ob.isOnline)),
            characters: utils.size(rows.filter((ob) => session.accountId === ob.username))
        };

        const hostname = session.socket.remoteAddress.split('.'); // TODO: Proper resolution
        session.dataSend(
            ServerResponse.serversList(hostname, stats, options.default.GameServer)
        );
    });
}

module.exports = serversList;
