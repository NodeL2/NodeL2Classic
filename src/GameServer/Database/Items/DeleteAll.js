const SQL = require('like-sql'), builder = new SQL();

function itemDeleteAll(characterId) {
    return this.execute(
        builder.delete('items', 'characterId = ?', characterId)
    );
}

module.exports = itemDeleteAll;
