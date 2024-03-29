const ServerResponse = invoke('GameServer/Network/Send');
const Shared         = invoke('GameServer/Network/Shared');
const QualifiedUsers = invoke('AuthenticationServer/QualifiedUsers');
const PacketReceive  = invoke('Packet/Receive');
const Database       = invoke('Database');

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
    session.setAccountId(data.username);

    if (QualifiedUsers.find(data.username, data.secret)) {
        session.dataSend(ServerResponse.authResult(-1, 0x00));

        Shared.fetchCharacters(session.accountId).then((characters) => {
            Shared.enterCharacterHall(session, characters);
        });
        return;
    }

    session.dataSend(ServerResponse.authResult(0, 0x01));
}

module.exports = authUser;
