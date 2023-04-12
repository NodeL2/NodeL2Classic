const PacketSend = invoke('Packet/Send');

function sunrise() {
    return (new PacketSend(0x12)).fetchBuffer();
}

module.exports = sunrise;
