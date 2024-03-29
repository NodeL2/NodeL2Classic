const ServerResponse = invoke('GameServer/Network/Send');
const Database       = invoke('Database');

const Shared = {
    fetchCharacters(accountId) {
        return new Promise((success) => {
            const createPaperdoll = (character) => {
                return new Promise((done) => {
                    Database.itemFetchAll(character.id).then((items) => {
                        character.items = items;
                        character.paperdoll = utils.tupleAlloc(33 + 1, {});

                        items.filter((ob) => ob.equipped === 1).forEach((item) => {
                            if (item.slot === 15) { // FB Armor, stupid implementation
                                character.paperdoll[10] = { id: item.id, selfId: item.selfId };
                                character.paperdoll[11] = { id: item.id, selfId: item.selfId };
                            }

                            character.paperdoll[item.slot] = { id: item.id, selfId: item.selfId };
                        });

                        done();
                    });
                });
            };

            Database.characterFetchAll(accountId).then((characters) => {
                characters.reduce((previous, character) => {
                    return previous.then(() => {
                        return createPaperdoll(character);
                    });
                }, Promise.resolve()).then(() => {
                    return success(characters);
                });
            });
        });
    },

    enterCharacterHall(session, characters) {
        session.dataSend(
            ServerResponse.charSelectInfo(characters)
        );
    }
};

module.exports = Shared;
