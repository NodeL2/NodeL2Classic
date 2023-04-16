const ServerResponseEx = invoke('GameServer/Network/Send/Ex');
const PacketReceive    = invoke('Packet/Receive');
const Database         = invoke('Database');

function charNameCreatable(session, buffer) {
    const packet = new PacketReceive(buffer);

    packet
        .readS();

    consume(session, {
        name: packet.data[0]
    });
}

function consume(session, data) {
    let result = -1;

    Database.accountCharacters().then((rows) => {
        if (rows.find((ob) => data.name === ob.name)) {
            result = 2;
        }

        if (utils.isAlphaNumeric(data.name) === false) {
            result = 4;
        }

        if (utils.size(rows.find((ob) => session.accountId === ob.username) ?? []) >= 7) {
            result = 8;
        }

        // The amount of letters is capped in client, so no nned to check for that
        session.dataSend(
            ServerResponseEx.charNameCreatable(result)
        );
    });
}

module.exports = charNameCreatable;
