const SQL = require('like-sql'), builder = new SQL();

function fetchSkills(characterId) {
    return this.execute(
        builder.select('skills', ['*'], 'characterId = ?', characterId)
    );
}

module.exports = fetchSkills;
