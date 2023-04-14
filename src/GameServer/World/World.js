const Npc       = invoke('GameServer/Npc/Npc');
const DataCache = invoke('GameServer/DataCache');

const World = {
    init() {
        this.npc   = { spawns: [], nextId: 1000000 };
        this.items = { spawns: [], nextId: 5000000 };

        World.spawnNpcs();
    },

    spawnNpcs() {
        function createNpc(npc, coords) {
            World.npc.spawns.push(
                new Npc(World.npc.nextId++, { ...utils.crushOb(npc), ...coords })
            );
        }

        DataCache.npcSpawns.forEach((item) => {
            const bounds = item.bounds;

            item.spawns.forEach((spawn) => {
                DataCache.fetchNpcFromSelfIdMuted(spawn.selfId, (npc) => {
                    const coords = bounds.map((bound) => {
                        return [bound.locX, bound.locY];
                    });

                    for (let i = 0; i < spawn.total; i++) {
                        if (utils.size(spawn.coords) > 0) { // Explicit location
                            spawn.coords.forEach((info) => {
                                createNpc(npc, {
                                    locX: info.locX, locY: info.locY, locZ: info.locZ,
                                    head: npc.template.kind === 'Monster' && info.head === 0 ? utils.randomNumber(65536) : info.head,
                                });
                            });
                        }
                        else { // Random location within bounds
                            const pos = require('random-point-in-shape')(coords);
                            createNpc(npc, {
                                locX: pos[0], locY: pos[1], locZ: bounds[0].maxZ, head: utils.randomNumber(65536),
                            });
                        }
                    }
                });
            });
        });

        utils.infoSuccess('Spawns', '%d Npcs & Monsters', utils.size(this.npc.spawns));
    }
};

module.exports = World;
