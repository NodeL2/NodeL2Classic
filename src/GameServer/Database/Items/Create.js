const SQL = require('like-sql'), builder = new SQL();

function itemCreate(characterId, item) {
    return this.execute(
        builder.insert('items', {
                 selfId: item.selfId,
                   name: item.name ?? '',
                 amount: item.amount ?? 1,
               equipped: item.equipped ?? false,
                   slot: item.slot ?? 0,
            characterId: characterId
        })
    );
}

module.exports = itemCreate;
