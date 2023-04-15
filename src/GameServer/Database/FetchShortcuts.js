const SQL = require('like-sql'), builder = new SQL();

function fetchShortcuts(characterId) {
    return this.execute(
        builder.select('shortcuts', ['*'], 'characterId = ?', characterId)
    );
}

module.exports = fetchShortcuts;
