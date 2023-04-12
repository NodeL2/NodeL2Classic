const Opcodes = invoke('GameServer/Network/Opcodes');
const Actor   = invoke('GameServer/Actor/Actor');
const XOR     = invoke('Cipher/XOR');

class Session {
    constructor(socket) {
        this.socket = socket;
        this.xor    = XOR.init();
    }

    setAccountId(username) {
        this.accountId = username;
    }

    setActor(data) {
        this.actor = new Actor(this, data);
    }

    dataReceive(data) {
        // Weird, sometimes the packet is sent two-fold/three-fold. I had to limit it based on the header size...
        if (data.readInt16LE() !== utils.size(data)) {
            this.dataReceive(data.slice(data.readInt16LE()));
        }

        const packet = data.slice(2, data.readInt16LE());
        const decipheredPacket = XOR.decipher(this.xor, packet);
        Opcodes.table[decipheredPacket[0]](this, decipheredPacket);
    }

    dataSend(data) {
        const header = Buffer.alloc(2);
        header.writeInt16LE(utils.size(data) + 2);
        const encipheredPacket = XOR.encipher(this.xor, data);
        this.socket.write(Buffer.concat([header, encipheredPacket]));
    }

    error() {
        utils.infoWarn('GameServer', 'exception');
    }
}

module.exports = Session;
