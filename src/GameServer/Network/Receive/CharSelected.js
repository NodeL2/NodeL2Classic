const ServerResponse = invoke('GameServer/Network/Send');
const DataCache      = invoke('GameServer/DataCache');
const PacketReceive  = invoke('Packet/Receive');
const Database       = invoke('Database');

function charSelected(session, buffer) {
    const packet = new PacketReceive(buffer);

    packet
        .readD(); // Character Slot

    consume(session, {
        characterSlot: packet.data[0]
    });
}

function consume(session, data) {
    Database.fetchCharacters(session.accountId).then((characters) => {
        const character = characters[data.characterSlot];

        DataCache.fetchTemplateFromClassId(character.classId, (template) => {
            // Create a new actor instance with info
            session.setActor({
                ...utils.crushOb(template), ...character
            });

            session.dataSend(
                ServerResponse.charSelected(session.actor)
            );
        });
    });
}

module.exports = charSelected;
