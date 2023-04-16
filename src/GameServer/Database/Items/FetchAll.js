const SQL = require('like-sql'), builder = new SQL();

function itemFetchAll(characterId) {
    return this.execute(
        builder.select('items', ['*'], 'characterId = ?', characterId)
    );
}

module.exports = itemFetchAll;
