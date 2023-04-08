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
    session.dataSend(
        ServerResponse.versionCheck()
    );
}

module.exports = protocolVersion;
