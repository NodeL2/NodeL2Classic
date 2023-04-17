const ServerResponse = invoke('GameServer/Network/Send');

function showAdminPanel() {
    this.session.dataSend(
        ServerResponse.npcHtml(this.fetchId(), utils.parseRawFile('data/Html/Admin/main.html'))
    );
}

module.exports = showAdminPanel;
