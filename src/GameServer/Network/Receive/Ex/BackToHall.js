const Shared = invoke('GameServer/Network/Shared');

function backToHall(session, buffer) {
    Shared.fetchCharacters(session.accountId).then((characters) => {
        Shared.enterCharacterHall(session, characters);
    });
}

module.exports = backToHall;
