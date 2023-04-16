const SQL = require('like-sql'), builder = new SQL();

function shortcutFetchAll(characterId) {
    return this.execute(
        builder.select('shortcuts', ['*'], 'characterId = ?', characterId)
    );
}

module.exports = shortcutFetchAll;
