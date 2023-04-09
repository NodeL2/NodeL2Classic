const Opcodes = invoke('GameServer/Network/Opcodes');
const XOR     = invoke('Cipher/XOR');

class Session {
    constructor(socket) {
        this.socket = socket;
        this.xor    = XOR.init();
    }

    setAccountId(username) {
        this.accountId = username;
    }

    dataSend(data) {
        const header = Buffer.alloc(2);
        header.writeInt16LE(utils.size(data) + 2);
        const encipheredPacket = XOR.encipher(this.xor, data);
        this.socket.write(Buffer.concat([header, encipheredPacket]));
    }

    dataReceive(data) {
        // Weird, sometimes the packet is sent twofold/duplicated. I had to limit it based on the header size...
        const packet = data.slice(2, data.readInt16LE());
        const decipheredPacket = XOR.decipher(this.xor, packet);
        Opcodes.table[decipheredPacket[0]](this, decipheredPacket);
    }

    error() {
        utils.infoWarn('GameServer', 'exception');
    }
}

module.exports = Session;
