const ServerResponse = invoke('GameServer/Network/Send');
const DataCache      = invoke('GameServer/DataCache');
const PacketReceive  = invoke('Packet/Receive');
const Database       = invoke('Database');

function createNewChar(session, buffer) {
    const packet = new PacketReceive(buffer);

    packet
        .readS()  // Name
        .readD()  // Race
        .readD()  // Sex
        .readD()  // Class ID
        .readD()  // Int?
        .readD()  // Str?
        .readD()  // Con?
        .readD()  // Men?
        .readD()  // Dex?
        .readD()  // Wit?
        .readD()  // Hair
        .readD()  // Hair Color
        .readD(); // Face

    consume(session, {
             name: packet.data[ 0],
             race: packet.data[ 1],
              sex: packet.data[ 2],
          classId: packet.data[ 3],
             hair: packet.data[10],
        hairColor: packet.data[11],
             face: packet.data[12],
    });
}

function awardBaseSkills(id, classId) {
    DataCache.fetchSkillTreeFromClassId(classId, (skillTree) => {
        const skills = skillTree.skills;
        const level1 = skills?.filter((ob) => ob.levels.find((ob) => ob.pLevel === 1)) ?? [];

        level1.forEach((skill) => {
            skill.levels = skill.levels.filter((ob) => ob.pLevel === 1);
            DataCache.fetchSkillFromSelfId(skill.selfId, (skillDetails) => {
                skill = { ...utils.crushOb(skill), passive: skillDetails.template?.passive ?? false };
                Database.skillCreate(id, skill);
            });
        });
    });
}

function awardBaseGear(id, classId) {
    DataCache.fetchTemplateItemsFromClassId(classId, (templateItems) => {
        templateItems?.items.forEach((item) => {
            item.slot = DataCache.items.find((ob) => item.selfId === ob.selfId)?.etc?.slot ?? 0;
            Database.itemCreate(id, item);
        });
    });
}

function awardBaseShortcuts(id, classId) {
    DataCache.fetchTemplateShortcutsFromClassId(classId, (templateShortcuts) => {
        templateShortcuts?.shortcuts.forEach((shortcut) => {
            Database.shortcutCreate(id, shortcut);
        });
    });
}

function consume(session, data) {
    DataCache.fetchTemplateFromClassId(data.classId, (template) => {
        DataCache.fetchTemplateSpawnsFromClassId(data.classId, (templateSpawns) => {
            const spawns = templateSpawns?.spawns;
            const coords = spawns[utils.randomNumber(utils.size(spawns))];

            template = {
                ...template.vitals, ...data, ...coords
            };

            Database.characterCreate(session.accountId, template).then((packet) => {
                session.dataSend(
                    ServerResponse.charCreateSuccess()
                );

                const charId = Number(packet.insertId);
                awardBaseSkills    (charId, data.classId);
                awardBaseGear      (charId, data.classId);
                awardBaseShortcuts (charId, data.classId);
            });
        });
    });
}

module.exports = createNewChar;
