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

    dataSend(data) {
        const header = Buffer.alloc(2);
        header.writeInt16LE(utils.size(data) + 2);
        const encipheredPacket = XOR.encipher(this.xor, data);
        this.socket.write(Buffer.concat([header, encipheredPacket]));
    }

    dataReceive(data) {
        // Weird, sometimes the packet is sent twofold/duplicated. I had to limit it based on the header size...
        const packetSize = data.readInt16LE();

        if (utils.size(data) !== packetSize) {
            this.dataReceive(data.slice(packetSize));
        }

        const packet = data.slice(2, packetSize);
        const decipheredPacket = XOR.decipher(this.xor, packet);
        Opcodes.table[decipheredPacket[0]](this, decipheredPacket);
    }

    error() {
        utils.infoWarn('GameServer', 'exception');
    }
}

module.exports = Session;
