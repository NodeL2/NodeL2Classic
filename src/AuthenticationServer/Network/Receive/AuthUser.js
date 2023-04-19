const ServerResponse = invoke('AuthenticationServer/Network/Send');
const PacketReceive  = invoke('Packet/Receive');
const Database       = invoke('Database');

function authUser(session, buffer) {
    const packet = new PacketReceive(buffer);

    packet
        .readB(128) // Enciphered Block
        .readB(128) // Enciphered Block
        .readD();   // Session Id

    const rsa  = require('rsa-raw');
    const data = rsa.decipher(packet.data[0]) + rsa.decipher(packet.data[1]);

    consume(session, {
         username: utils.stripNull(data.slice(0x4e, 0x4e + 50) + data.slice(0xce, 0xce + 14)),
         password: utils.stripNull(data.slice(0xdc, 0xdc + 16)),
        sessionId: packet.data[2]
    });
}

function success(session, username) {
    session.setAccountId(username);
    session.dataSend(ServerResponse.authSuccess(session.secret));
}

function failure(session, reason) {
    session.dataSend(ServerResponse.authFail(reason));
}

function consume(session, data) {
    // Assert there's no attempt to force connect
    if (data.sessionId !== session.id) {
        failure(session, 0x04);
        return;
    }

    Database.accountPassword(data.username).then((rows) => {
        const password = rows[0]?.password;

        // Username exists in database
        if (password) {
            data.password === password ? success(session, data.username) : failure(session, 0x02);
        }
        else { // User account does not exist, create if needed
            const optn = options.default.AuthServer;

            if (optn.autoCreate) {
                Database.accountCreate(data.username, data.password).then(() => {
                    consume(session, data);
                });
            }
            else { // Auto-create not permitted
                failure(session, 0x04);
            }
        }
    });
}

module.exports = authUser;
