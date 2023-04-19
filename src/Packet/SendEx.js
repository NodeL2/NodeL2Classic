const PacketSend = invoke('Packet/Send');

class PacketSendEx extends PacketSend {
    constructor(opcode, extended) {
        // Parent inheritance
        super(opcode);

        // Local
        this.writeH(extended);
    }
}

module.exports = PacketSendEx;
