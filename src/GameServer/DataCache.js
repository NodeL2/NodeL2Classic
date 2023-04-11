const validateSchema = require('jsonschema').validate;

const DataCache = {
    init: () => {
        const path = '../data/';

        DataCache.classTemplates = validateModel(path + 'Templates/templates');
        DataCache.templateSpawns = validateModel(path + 'Templates/Spawns/spawns');

        utils.infoSuccess('Datapack', 'cached');
    },

    // Templates

    fetchTemplateFromClassId(classId, callback) {
        const item = structuredClone(DataCache.classTemplates.find(ob => classId === ob.classId));
        item ? callback(item) : utils.infoWarn('Datapack', 'unknown Template ClassId %d', classId);
    },

    fetchTemplateSpawnsFromClassId(classId, callback) {
        const item = structuredClone(DataCache.templateSpawns.find((ob) => classId === ob.classId));
        item ? callback(item) : utils.infoWarn('Datapack', 'unknown Template Spawns ClassId %d', classId);
    }
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
