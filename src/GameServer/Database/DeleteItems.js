const SQL = require('like-sql'), builder = new SQL();

function deleteItems(characterId) {
    return this.execute(
        builder.delete('items', 'characterId = ?', characterId)
    );
}

module.exports = deleteItems;
