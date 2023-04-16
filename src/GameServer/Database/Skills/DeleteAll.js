const SQL = require('like-sql'), builder = new SQL();

function skillDeleteAll(characterId) {
    return this.execute(
        builder.delete('skills', 'characterId = ?', characterId)
    );
}

module.exports = skillDeleteAll;
