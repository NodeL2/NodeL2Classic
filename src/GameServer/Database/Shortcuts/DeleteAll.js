const SQL = require('like-sql'), builder = new SQL();

function shortcutDeleteAll(characterId) {
    return this.execute(
        builder.delete('shortcuts', 'characterId = ?', characterId)
    );
}

module.exports = shortcutDeleteAll;
