const ClientRequest = invoke('AuthenticationServer/Network/Receive');

const Opcodes = {
    table: (() => {
        const table = utils.tupleAlloc(0xff, (_, packet) => {
            utils.infoFail('AuthServer', 'unknown opcode 0x%s', utils.toHex(packet[0]));
        });

        table[0x00] = ClientRequest.authUser;
        table[0x02] = ClientRequest.enterGame;
        table[0x05] = ClientRequest.serversList;
        table[0x07] = ClientRequest.authGameGuard;

        return table;
    })()
};

module.exports = Opcodes;
