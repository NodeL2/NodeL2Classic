const validateSchema = require('jsonschema').validate;

const DataCache = {
    init: () => {
        const path = '../data/';

        DataCache.classTemplates    = validateModel(path + 'Templates/templates');
        DataCache.templateSpawns    = validateModel(path + 'Templates/Spawns/spawns');
        DataCache.templateShortcuts = validateModel(path + 'Templates/Shortcuts/shortcuts');
        DataCache.templateItems     = validateModel(path + 'Templates/Items/items');
        DataCache.npcs              = validateModel(path + 'Npcs/npcs');
        DataCache.npcSpawns         = validateModel(path + 'Npcs/Spawns/spawns');
        DataCache.skillTree         = validateModel(path + 'Skills/Tree/tree');

        DataCache.skills = [
            ...validateModel(path + 'Skills/Active/active'),
            ...validateModel(path + 'Skills/Passive/passive'),
            ...validateModel(path + 'Skills/Switch/switch')
        ];

        DataCache.items = [
            ...validateModel(path + 'Items/Armors/armors'),
            ...validateModel(path + 'Items/Weapons/weapons'),
            ...validateModel(path + 'Items/Others/others')
        ];

        utils.infoSuccess('Datapack', 'cached');
    },

    // Templates

    fetchTemplateFromClassId(classId, callback) {
        const item = structuredClone(DataCache.classTemplates.find(ob => ob.classId === classId));
        item ? callback(item) : utils.infoWarn('Datapack', 'unknown Template ClassId %d', classId);
    },

    fetchTemplateSpawnsFromClassId(classId, callback) {
        const item = structuredClone(DataCache.templateSpawns.find((ob) => ob.classId === classId));
        item ? callback(item) : utils.infoWarn('Datapack', 'unknown Template Spawns ClassId %d', classId);
    },

    fetchTemplateShortcutsFromClassId(classId, callback) {
        const item = structuredClone(DataCache.templateShortcuts.find((ob) => ob.classId === classId));
        item ? callback(item) : utils.infoWarn('Datapack', 'unknown Template Shortcuts ClassId %d', classId);
    },

    fetchTemplateItemsFromClassId(classId, callback) {
        const item = structuredClone(DataCache.templateItems.find((ob) => ob.classId === classId));
        item ? callback(item) : utils.infoWarn('Datapack', 'unknown Template Items ClassId %d', classId);
    },

    fetchNpcFromSelfId(selfId, callback) {
        const item = structuredClone(DataCache.npcs.find((ob) => ob.selfId === selfId));
        item ? callback(item) : utils.infoWarn('Datapack', 'unknown Npc SelfId %d', selfId);
    },

    fetchNpcFromSelfIdMuted(selfId, callback) {
        const item = structuredClone(DataCache.npcs.find((ob) => ob.selfId === selfId && ob.dispSelfId !== -1));
        item ? callback(item) : null;
    },

    fetchSkillTreeFromClassId(classId, callback) {
        const item = structuredClone(DataCache.skillTree.find((ob) => ob.classId === classId));
        item ? callback(item) : utils.infoWarn('Datapack', 'unknown SkillTree ClassId %d', classId);
    },

    fetchSkillFromSelfId(selfId, callback) {
        const item = structuredClone(DataCache.skills.find((ob) => ob.selfId === selfId));
        item ? callback(item) : utils.infoWarn('Datapack', 'unknown Skill SelfId %d', selfId);
    },
};

function validateModel(filepath) {
    const path   = require('path').dirname(filepath);
    const model  = invoke(filepath);
    const result = validateSchema(model, invoke(path + '/.schema'));

    if (!result.valid) {
        utils.infoWarn('Cache', 'failed to parse "%s" -> %s', filepath, result.errors[0].stack);
    }

    return model;
}

module.exports = DataCache;
