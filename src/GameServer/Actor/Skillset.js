const SkillModel = invoke('GameServer/Model/Skill');
const DataCache  = invoke('GameServer/DataCache');
const Database   = invoke('Database');

class Skillset {
    constructor() {
        this.resetSkills();
    }

    resetSkills() {
        this.skills = [];
    }

    fetchSkills() {
        return this.skills;
    }

    populate(characterId, callback = () => {}) {
        // Start anew
        this.resetSkills();

        const skillLevelLookup = (skill, level, success) => {
            const item = skill.levels?.find((ob) => ob.level === level);
            item ? success(item) : utils.infoWarn('GameServer', 'unknown Skill Id %d with Level %d', skill.selfId, level);
        };

        Database.fetchSkills(characterId).then((ownedSkills) => {
            ownedSkills.forEach((ownedSkill) => {
                DataCache.fetchSkillFromSelfId(ownedSkill.selfId, (skill) => {
                    skillLevelLookup(skill, ownedSkill.level, (level) => {
                        delete skill.levels; this.skills.push(new SkillModel({
                            ...utils.crushOb(skill), ...level
                        }));
                    });
                });
            });

            callback();
        });
    }
}

module.exports = Skillset;
