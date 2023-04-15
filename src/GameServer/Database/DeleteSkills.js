const SQL = require('like-sql'), builder = new SQL();

function deleteSkills(characterId) {
    return this.execute(
        builder.delete('skills', 'characterId = ?', characterId)
    );
}

module.exports = deleteSkills;
