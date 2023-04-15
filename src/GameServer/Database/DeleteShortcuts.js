const SQL = require('like-sql'), builder = new SQL();

function deleteShortcuts(characterId) {
    return this.execute(
        builder.delete('shortcuts', 'characterId = ?', characterId)
    );
}

module.exports = deleteShortcuts;
