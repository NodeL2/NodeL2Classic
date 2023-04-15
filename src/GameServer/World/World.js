const World = {
    init() {
        this.npc   = { spawns: [], nextId: 1000000 };
        this.items = { spawns: [], nextId: 5000000 };

        World.spawnNpcs();
    },

    fetchNpc        : invoke(path.world + 'FetchNpc'),
    spawnNpcs       : invoke(path.world + 'SpawnNpcs'),
    npcTalkResponse : invoke(path.world + 'NpcTalkResponse'),
};

module.exports = World;
