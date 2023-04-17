const ServerResponse = invoke('GameServer/Network/Send');
const World          = invoke('GameServer/World/World');
const NpcMask        = invoke('GameServer/Npc/NpcMask');
const SpeckMath      = invoke('GameServer/SpeckMath');

function updateEnvironment() {
    const actorArea = new SpeckMath.Circle(this.fetchLocX(), this.fetchLocY(), 5000);
    const npcs = World.npc.spawns.filter((ob) => actorArea.contains(new SpeckMath.Point(ob.fetchLocX(), ob.fetchLocY()))) ?? [];

    if (new SpeckMath.Point(this.previousXY?.locX ?? 0, this.previousXY?.locY ?? 0).distance(new SpeckMath.Point(this.fetchLocX(), this.fetchLocY())) >= 1000) {
        npcs.forEach((npc) => { // Gives a sense of random NPC Animation to the actor
            setTimeout( () => { this.session.dataSend(ServerResponse.npcInfo(npc, new NpcMask([], npc.fetchName(), npc.fetchTitle()))); }, utils.randomNumber(2000));
        });

        this.previousXY = actorArea.toCoords();
    }
}

module.exports = updateEnvironment;
