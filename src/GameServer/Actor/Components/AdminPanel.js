const ServerResponse = invoke('GameServer/Network/Send');

function adminPanel(session, actor) {
    session.dataSend(
        ServerResponse.npcHtml(actor.fetchId(), utils.parseRawFile('data/Html/Admin/main.html'))
    );
}

module.exports = adminPanel;
