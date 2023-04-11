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

function awardBaseGear(id, classId) {
    DataCache.fetchTemplateItemsFromClassId(classId, (templateItems) => {
        templateItems?.items.forEach((item) => {
            console.info(item.selfId);
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

            Database.createCharacter(session.accountId, template).then((packet) => {
                session.dataSend(
                    ServerResponse.charCreateSuccess()
                );

                const charId = Number(packet.insertId);
                awardBaseGear(charId, data.classId);
            });
        });
    });
}

module.exports = createNewChar;
