const ServerResponseEx = invoke('GameServer/Network/Send/Ex');

function passwordCheck(session, buffer) {
    session.dataSend(
        ServerResponseEx.passwordCheck()
    );
}

module.exports = passwordCheck;
