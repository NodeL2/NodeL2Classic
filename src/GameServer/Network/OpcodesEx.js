const ClientRequestEx = invoke('GameServer/Network/Receive/Ex');

// Establishes a table to handle client packets
const OpcodesEx = {
    table: (() => {
        const table = utils.tupleAlloc(0x256, (_, packet) => {
            utils.infoWarn('GameServer', 'unknown extended opcode 0x%s', utils.toHex(packet.readUInt16LE()));
        });

        //table[0x02a] = () => {}; // Cursed Weapon List
        //table[0x02b] = () => {}; // Cursed Weapon Location
        //table[0x03a] = () => {}; // Fortress Info
        //table[0x03c] = () => {}; // Fortress Attack Info
        //table[0x0d1] = () => {}; // ?

        table[0x001] = () => {}; // Manor List
        table[0x021] = () => {}; // Button Map
        table[0x033] = ClientRequestEx.backToHall;
        table[0x060] = () => {}; // Request Seed Phase
        table[0x0a6] = ClientRequestEx.passwordCheck;
        table[0x0a9] = ClientRequestEx.charNameCreatable;
        table[0x104] = () => {}; // Client Ini
        table[0x15e] = () => {}; // User ban Info

        return table;
    })()
};

module.exports = OpcodesEx;
