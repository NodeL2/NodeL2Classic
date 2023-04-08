const ServerResponse = invoke('AuthenticationServer/Network/Send');
const PacketReceive  = invoke('Packet/Receive');

function authUser(session, buffer) {
    const packet = new PacketReceive(buffer);

    packet
        .readB(128) // Enciphered Block
        .readD();   // Session Id

    const deciphered = require('rsa-raw').decipher(
        packet.data[0]
    );

    consume(session, {
         username: utils.stripNull(deciphered.slice(0x5e, 0x5e + 14)),
         password: utils.stripNull(deciphered.slice(0x6c, 0x6c + 16)),
        sessionId: packet.data[1]
    });
}

function consume(session, data) {
    // Assert there's no attempt to force connect
    if (data.sessionId !== session.sessionId) {
        session.dataSend(ServerResponse.authFail(0x04));
        return;
    }

    session.dataSend(
        ServerResponse.authSuccess(session.secret)
    );
}

module.exports = authUser;
