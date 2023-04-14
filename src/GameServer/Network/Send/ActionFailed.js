const PacketSend = invoke('Packet/Send');

function actionFailed() {
    return (new PacketSend(0x1f)).fetchBuffer();
}

module.exports = actionFailed;
