const SQL = require('like-sql'), builder = new SQL();

function createCharacter(username, data) {
    return this.execute(
        builder.insert('characters', {
             username: username,
                 name: data.name,
                 race: data.race,
              classId: data.classId,
                maxHp: data.maxHp,
                maxMp: data.maxMp,
                  sex: data.sex,
                 face: data.face,
                 hair: data.hair,
            hairColor: data.hairColor,
                 locX: data.locX,
                 locY: data.locY,
                 locZ: data.locZ,
        })
    );
}

module.exports = createCharacter;
