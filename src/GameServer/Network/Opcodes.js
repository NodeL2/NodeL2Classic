const ClientRequest = invoke('GameServer/Network/Receive');
const OpcodesEx     = invoke('GameServer/Network/OpcodesEx');

// Establishes a table to handle client packets
const Opcodes = {
    table: (() => {
        const table = utils.tupleAlloc(0x256, (_, packet) => {
            utils.infoFail('GameServer', 'unknown opcode 0x%s', utils.toHex(packet[0]));
        });

        table[0x00] = ClientRequest.disconnect;
        table[0x0c] = ClientRequest.createNewChar;
        table[0x0e] = ClientRequest.protocolVersion;
        table[0x13] = ClientRequest.enterCharCreation;
        table[0x2b] = ClientRequest.authUser;

        // Extended opcodes
        table[0xd0] = (session, packet) => {
            OpcodesEx.table[packet.readUInt16LE(1)](session, packet.slice(1));
        };

        return table;
    })()
};

module.exports = Opcodes;
