const SQL = require('like-sql'), builder = new SQL();

function shortcutCreate(characterId, shortcut) {
    return this.execute(
        builder.insert('shortcuts', {
                     id: shortcut.id,
                   kind: shortcut.kind,
                   slot: shortcut.slot,
                  level: shortcut.level,
            characterId: characterId
        })
    );
}

module.exports = shortcutCreate;
