const ClientRequest = invoke('GameServer/Network/Receive');
const OpcodesEx     = invoke('GameServer/Network/OpcodesEx');

// Establishes a table to handle client packets
const Opcodes = {
    table: (() => {
        const table = utils.tupleAlloc(0x256, (_, packet) => {
            utils.infoWarn('GameServer', 'unknown opcode 0x%s', utils.toHex(packet[0]));
        });

        table[0x00] = ClientRequest.disconnect;
        table[0x0c] = ClientRequest.createNewChar;
        table[0x0d] = ClientRequest.charDelete;
        table[0x0e] = ClientRequest.protocolVersion;
        table[0x0f] = ClientRequest.moveToLocation;
        table[0x11] = ClientRequest.enterWorld;
        table[0x12] = ClientRequest.charSelected;
        table[0x13] = ClientRequest.enterCharCreation;
        table[0x14] = ClientRequest.itemsList;
        table[0x1f] = ClientRequest.action;
        table[0x23] = ClientRequest.htmlLink;
        table[0x2b] = ClientRequest.authUser;
        table[0x3a] = ClientRequest.appeared;
        table[0x3d] = ClientRequest.addShortcut;
        table[0x3f] = ClientRequest.removeShortcut;
        table[0x48] = ClientRequest.destUnselect;
        table[0x49] = ClientRequest.speak;
        table[0x50] = ClientRequest.skillsList;
        table[0x56] = ClientRequest.actionUse;
        table[0x57] = ClientRequest.restart;
        table[0x59] = ClientRequest.validatePosition;
        table[0x5c] = () => {}; // Finish Rotate
        table[0x6c] = ClientRequest.showMap;
        table[0xa6] = () => {}; // Skill Cool Time
        table[0xb3] = ClientRequest.userCommand;

        // Extended opcodes
        table[0xd0] = (session, packet) => {
            OpcodesEx.table[packet.readUInt16LE(1)](session, packet.slice(1));
        };

        return table;
    })()
};

module.exports = Opcodes;
