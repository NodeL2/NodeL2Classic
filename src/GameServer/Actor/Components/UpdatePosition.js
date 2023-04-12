const Database = invoke('Database');

function updatePosition(session, actor, coords) {
    actor.setLocXYZH(coords);
}

module.exports = updatePosition;
