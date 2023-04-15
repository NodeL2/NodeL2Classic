const ServerResponse = invoke('GameServer/Network/Send');
const ReceivePacket  = invoke('Packet/Receive');
const Database       = invoke('Database');

function charDelete(session, buffer) {
    const packet = new ReceivePacket(buffer);

    packet
        .readD(); // Character Slot

    consume(session, {
        characterSlot: packet.data[0]
    });
}

function consume(session, data) {
    Database.fetchCharacters(session.accountId).then((characters) => {
        const character = characters[data.characterSlot];

        Database.deleteCharacter(session.accountId, character.name).then(() => {

            // Clear database from all actor created content
            Database.deleteSkills   (character.id);
            Database.deleteItems    (character.id);
            Database.deleteShortcuts(character.id);

            characters.splice(data.characterSlot, 1);
            session.dataSend(ServerResponse.charSelectInfo(characters));
        });
    });
}

module.exports = charDelete;
