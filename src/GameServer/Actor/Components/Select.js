const ServerResponse = invoke('GameServer/Network/Send');
const World          = invoke('GameServer/World/World');

function select(session, actor, data) {
    const Components = invoke(path.actor);

    if (actor.fetchId() === data.id) { // Click on self
        actor.setDestId(actor.fetchId());

        session.dataSend(
            ServerResponse.destSelected(actor.fetchDestId())
        );
        return;
    }

    World.fetchNpc(data.id, (npc) => {
        if (npc.fetchId() !== actor.fetchDestId()) { // First click on a Creature
            actor.setDestId(npc.fetchId());

            session.dataSend(
                ServerResponse.destSelected(actor.fetchDestId(), actor.fetchLevel() - npc.fetchLevel())
            );
        }
        else { // Second click on same Creature
            Components.attackRequest(session, actor, npc);
        }
    },

    () => {
        utils.infoWarn('GameServer', 'unknown WorldId %d', data.id);
    });
}

module.exports = select;
