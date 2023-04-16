const SQL = require('like-sql'), builder = new SQL();

function fetchItems(characterId) {
    return this.execute(
        builder.select('items', ['*'], 'characterId = ?', characterId)
    );
}

module.exports = fetchItems;
