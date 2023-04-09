const PacketSend = invoke('Packet/Send');

function disconnectSuccess() {
    return (new PacketSend(0x84)).fetchBuffer();
}

module.exports = disconnectSuccess;
