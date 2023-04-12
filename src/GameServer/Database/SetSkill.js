const SQL = require('like-sql'), builder = new SQL();

function setSkill(characterId, skill) {
    return this.execute(
        builder.insert('skills', {
                 selfId: skill.selfId,
                   name: skill.name,
                passive: skill.passive,
                  level: skill.level,
            characterId: characterId,
        })
    );
}

module.exports = setSkill;
