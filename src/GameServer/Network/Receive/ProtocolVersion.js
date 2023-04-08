const ServerResponse = invoke('GameServer/Network/Send');
const PacketReceive  = invoke('Packet/Receive');

function protocolVersion(session, buffer) {
    const packet = new PacketReceive(buffer);

    packet
        .readD(); // Protocol Version

    consume(session, {
        protocolVersion: packet.data[0]
    });
}

function consume(session, data) {
    const optn = options.default.GameServer;

    session.dataSend(
        ServerResponse.cipherInit(data.protocolVersion === optn.protocol, optn)
    );
}

module.exports = protocolVersion;
