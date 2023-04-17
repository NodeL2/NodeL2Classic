function updatePosition(coords) {
    // TODO: Write less in DB about movement
    this.setLocXYZH(coords);

    // Update Online users, NPCs, underwater locations
    this.updateEnvironment();
}

module.exports = updatePosition;
