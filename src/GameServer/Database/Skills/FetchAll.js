const SQL = require('like-sql'), builder = new SQL();

function skillFetchAll(characterId) {
    return this.execute(
        builder.select('skills', ['*'], 'characterId = ?', characterId)
    );
}

module.exports = skillFetchAll;
