const ClientRequestEx = invoke('GameServer/Network/Receive/Ex');

// Establishes a table to handle client packets
const OpcodesEx = {
    table: (() => {
        const table = utils.tupleAlloc(0x128, (_, packet) => {
            utils.infoFail('GameServer', 'unknown extended opcode 0x%s', utils.toHex(packet.readUInt16LE()));
        });

        table[0x001] = () => {}; // Manor list
        table[0x021] = () => {}; // Button Map
        table[0x033] = ClientRequestEx.backToHall;
        table[0x03a] = () => {}; // Fortress info
        table[0x060] = () => {}; // Request seed phase
        table[0x0a9] = ClientRequestEx.charNameCreatable;
        table[0x0d1] = () => {}; // ?

        return table;
    })()
};

module.exports = OpcodesEx;
