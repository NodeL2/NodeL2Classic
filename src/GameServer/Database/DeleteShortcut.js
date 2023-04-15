const SQL = require('like-sql'), builder = new SQL();

function deleteShortcut(characterId, slot) {
    return this.execute(
        builder.delete('shortcuts', 'slot = ? AND characterId = ?', slot, characterId)
    )
}

module.exports = deleteShortcut;
