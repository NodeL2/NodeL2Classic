const SelectedModel = invoke('GameServer/Model/Selected');
const StateModel    = invoke('GameServer/Model/State');

class CreatureModel extends SelectedModel {
    constructor(data) {
        // Parent inheritance
        super();

        this.model = data;
        this.state = new StateModel();
    }

    // Set

    setId(data) {
        this.model.id = data;
    }

    setLocX(data) {
        this.model.locX = data;
    }

    setLocY(data) {
        this.model.locY = data;
    }

    setLocZ(data) {
        this.model.locZ = data;
    }

    setHead(data) {
        this.model.head = data;
    }

    setLocXYZ(coords) {
        this.setLocX(coords.locX);
        this.setLocY(coords.locY);
        this.setLocZ(coords.locZ);
    }

    setLocXYZH(coords) {
        this.setLocXYZ(coords);
        this.setHead(coords.head);
    }

    // Get

    fetchId() {
        return this.model.id;
    }

    fetchName() {
        return this.model.name;
    }

    fetchTitle() {
        return this.model.title;
    }

    fetchLevel() {
        return this.model.level;
    }

    fetchHp() {
        return this.model.hp;
    }

    fetchMaxHp() {
        return this.model.maxHp;
    }

    fetchMp() {
        return this.model.mp;
    }

    fetchMaxMp() {
        return this.model.maxMp;
    }

    fetchStr() {
        return this.model.str;
    }

    fetchDex() {
        return this.model.dex;
    }

    fetchCon() {
        return this.model.con;
    }

    fetchInt() {
        return this.model.int;
    }

    fetchWit() {
        return this.model.wit;
    }

    fetchMen() {
        return this.model.men;
    }

    fetchPAtk() {
        return this.model.pAtk;
    }

    fetchMAtk() {
        return this.model.mAtk;
    }

    fetchPDef() {
        return this.model.pDef;
    }

    fetchMDef() {
        return this.model.mDef;
    }

    fetchAtkSpd() {
        return this.model.atkSpd;
    }

    fetchCastSpd() {
        return this.model.castSpd;
    }

    fetchWalkSpd() {
        return this.model.walk;
    }

    fetchRunSpd() {
        return this.model.run;
    }

    fetchRadius() {
        return this.model.radius;
    }

    fetchSize() {
        return this.model.size;
    }

    fetchLocX() {
        return this.model.locX;
    }

    fetchLocY() {
        return this.model.locY;
    }

    fetchLocZ() {
        return this.model.locZ;
    }

    fetchHead() {
        return this.model.head;
    }
}

module.exports = CreatureModel;
