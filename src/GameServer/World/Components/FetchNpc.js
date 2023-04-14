function fetchNpc(id, success, fail) {
    const item = this.npc.spawns.find((ob) => ob.fetchId() === id);
    item ? success(item) : fail();
}

module.exports = fetchNpc;
