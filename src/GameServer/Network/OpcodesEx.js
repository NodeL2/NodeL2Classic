const ClientRequestEx = invoke('GameServer/Network/Receive/Ex');

// Establishes a table to handle client packets
const OpcodesEx = {
    table: (() => {
        const table = utils.tupleAlloc(0x256, (_, packet) => {
            utils.infoFail('GameServer', 'unknown extended opcode 0x%s', utils.toHex(packet.readUInt16LE()));
        });

        table[0x104] = () => {}; // Client ini?
        table[0x138] = () => {}; // User ban info?

        return table;
    })()
};

module.exports = OpcodesEx;
