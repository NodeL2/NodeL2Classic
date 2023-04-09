const ClientRequestEx = invoke('GameServer/Network/Receive/Ex');

// Establishes a table to handle client packets
const OpcodesEx = {
    table: (() => {
        const table = utils.tupleAlloc(0x128, (_, packet) => {
            utils.infoFail('GameServer', 'unknown extended opcode 0x%s', utils.toHex(packet.readUInt16LE()));
        });

        table[0x0a9] = ClientRequestEx.charNameCreatable;

        return table;
    })()
};

module.exports = OpcodesEx;
