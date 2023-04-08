const PacketSend = invoke('Packet/Send');

function authResult(status, reasonCode) {
    const packet = new PacketSend(0x0a);

    packet
        .writeD(status)
        .writeD(reasonCode); // Failure reason

    return packet.fetchBuffer();
}

// SYSTEM_ERROR   = 0x01
// PASS_WRONG     = 0x02
// ACCESS_FAILED  = 0x04
// ACCOUNT_IN_USE = 0x07

module.exports = authResult;
