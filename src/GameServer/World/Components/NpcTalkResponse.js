const ServerResponse = invoke('GameServer/Network/Send');
const DataCache      = invoke('GameServer/DataCache');

function npcTalkResponse(session, data) {
    let parts = data.link.split(' ') ?? [];

    switch (parts[0]) {
        case 'html':
            {
                const path = 'data/Html/';
                const filename = path + parts[1] + '.html';

                if (utils.fileExists(filename)) {
                    session.dataSend(
                        ServerResponse.npcHtml(7146, utils.parseRawFile(filename))
                    );
                    return;
                }
                utils.infoWarn('GameServer', 'html file "%s" does not exist', filename);
            }
            break;

        case 'admin-teleport':
            {
                const coords = {
                    locX: Number(parts[1]),
                    locY: Number(parts[2]),
                    locZ: Number(parts[3]),
                    head: session.actor.fetchHead()
                };

                session.actor.teleportTo(coords);
            }
            break;

        case 'admin-teleport-random':
            {
                const count    = utils.size(DataCache.npcSpawns);
                const selected = DataCache.npcSpawns[utils.randomNumber(count)];

                const coords = selected.bounds.map((bound) => {
                    return [bound.locX, bound.locY];
                });

                const pos = require('random-point-in-shape')(coords);
                session.actor.teleportTo({
                    locX: pos[0], locY: pos[1], locZ: selected.bounds[0].maxZ, head: utils.randomNumber(65536),
                });
            }
            break;

        default:
            utils.infoWarn('GameServer', 'unknown NPC response "%s"', parts[0]);
            break;
    }
}

module.exports = npcTalkResponse;
