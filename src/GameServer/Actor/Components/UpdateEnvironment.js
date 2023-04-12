const ServerResponse = invoke('GameServer/Network/Send');
const World          = invoke('GameServer/World/World');
const SpeckMath      = invoke('GameServer/SpeckMath');

function updateEnvironment(session, actor) {
    const actorArea = new SpeckMath.Circle(actor.fetchLocX(), actor.fetchLocY(), 5000);
    const npcs = World.npc.spawns.filter((ob) => ob.state.fetchDead() === false && actorArea.contains(new SpeckMath.Point(ob.fetchLocX(), ob.fetchLocY()))) ?? [];

    if (new SpeckMath.Point(this.previousXY?.locX ?? 0, this.previousXY?.locY ?? 0).distance(new SpeckMath.Point(actor.fetchLocX(), actor.fetchLocY())) >= 1000) {
        npcs.forEach((npc) => { // Gives a sense of random NPC Animation to the actor
            setTimeout( () => { session.dataSend(ServerResponse.npcInfo(npc)); }, utils.randomNumber(2000));
        });

        actor.previousXY = actorArea.toCoords();
    }
}

module.exports = updateEnvironment;
