const ServerResponse = invoke('AuthenticationServer/Network/Send');
const Opcodes        = invoke('AuthenticationServer/Network/Opcodes');
const QualifiedUsers = invoke('AuthenticationServer/QualifiedUsers');

class Session {
    constructor(name, socket) {
        const optn = options.default.AuthServer;

        this.name     = name;
        this.socket   = socket;
        this.id       = utils.randomNumber(0x80000000);
        this.secret   = utils.randomNumber(0x80000000);
        this.protocol = optn.protocol;
        this.blowfish = Buffer.from(optn.blowfish, 'hex');

        // First handshake from `Server` to `Client`
        this.dataSend(
            ServerResponse.initLS(this.id, this.protocol, this.blowfish)
        );
    }

    setAccountId(username) {
        this.accountId = username;
    }

    userHasQualified() {
        QualifiedUsers.insert(this.accountId, this.secret);
    }

    dataReceive(data) {
        // Weird, sometimes the packet is sent twofold/duplicated. I had to limit it based on the header size...
        const packet = data.slice(2, data.readInt16LE());
        const decipheredPacket = require('blowfish-ecb').decipher(this.blowfish, packet);
        Opcodes.table[decipheredPacket[0]](this, decipheredPacket);
    }

    dataSend(data) {
        const header = Buffer.alloc(2);
        header.writeInt16LE(utils.size(data) + 2);
        const encipheredPacket = require('blowfish-ecb').encipher(this.blowfish, data);
        this.socket.write(Buffer.concat([header, encipheredPacket]));
    }

    error() {
        utils.infoWarn(this.name, 'exception');
    }
}

module.exports = Session;
