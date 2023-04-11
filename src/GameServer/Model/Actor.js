const CreatureModel = invoke('GameServer/Model/Creature');

class ActorModel extends CreatureModel {

    // Get

    fetchUsername() {
        return this.model.username;
    }

    fetchClassId() {
        return this.model.classId;
    }

    fetchRace() {
        return this.model.race;
    }

    fetchExp() {
        return this.model.exp;
    }

    fetchSp() {
        return this.model.sp;
    }

    fetchAccur() {
        return 0;
    }

    fetchEvasion() {
        return 0;
    }

    fetchCritical() {
        return this.model.crit;
    }

    fetchMaxLoad() {
        return this.model.maxLoad;
    }

    fetchSwim() {
        return this.model.swim;
    }
    
    fetchPvp() {
        return this.model.pvp;
    }

    fetchPk() {
        return this.model.pk;
    }

    fetchSex() {
        return this.model.sex;
    }

    fetchFace() {
        return this.model.face;
    }

    fetchHair() {
        return this.model.hair;
    }

    fetchHairColor() {
        return this.model.hairColor;
    }

    fetchKarma() {
        return this.model.karma;
    }

    fetchEvalScore() {
        return this.model.evalScore;
    }

    fetchRecRemain() {
        return this.model.recRemain;
    }

    fetchCrafter() {
        return this.model.crafter;
    }

    fetchGM() {
        return this.model.isGM;
    }

    fetchOnline() {
        return this.model.isOnline;
    }

    fetchActive() {
        return this.model.isActive;
    }
}

module.exports = ActorModel;
