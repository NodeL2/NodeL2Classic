const ServerResponse = invoke('GameServer/Network/Send');
const Database       = invoke('Database');

function backToHall(session, buffer) {
    Database.fetchCharacters(session.accountId).then((userChars) => {
        session.dataSend(
            ServerResponse.charSelectInfo(userChars)
        );
    });
}

module.exports = backToHall;
