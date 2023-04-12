const ServerResponse = invoke('GameServer/Network/Send');

function skillsList(session, buffer) {
    session.dataSend(
        ServerResponse.skillsList(session.actor.skillset.fetchSkills())
    );
}

module.exports = skillsList;
