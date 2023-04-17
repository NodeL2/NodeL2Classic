const ServerResponse = invoke('GameServer/Network/Send');
const World          = invoke('GameServer/World/World');

function select(data) {
    if (this.fetchId() === data.id) { // Click on self
        this.setDestId(this.fetchId());

        this.session.dataSend(
            ServerResponse.destSelected(this.fetchDestId())
        );
        return;
    }

    World.fetchNpc(data.id, (npc) => {
        if (npc.fetchId() !== this.fetchDestId()) { // First click on a Creature
            this.setDestId(npc.fetchId());

            this.session.dataSend(
                ServerResponse.destSelected(this.fetchDestId(), this.fetchLevel() - npc.fetchLevel())
            );
        }
        else { // Second click on same Creature
            this.attackRequest(npc);
        }
    },

    () => {
        utils.infoWarn('GameServer', 'unknown WorldId %d', data.id);
    });
}

module.exports = select;
