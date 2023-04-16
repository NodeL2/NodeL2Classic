const Database = {
    init: (callback) => {
        const optn = options.default.Database;

        require('mariadb').createConnection({
            host     : optn.hostname,
            port     : optn.port,
            user     : optn.user,
            password : optn.password,
            database : optn.databaseName

        }).then((instance) => {
            utils.infoSuccess('DB', 'connected');
            Database.conn = instance;
            callback();

        }).catch(error => {
            utils.infoFail('DB', 'failed(%d) -> %s', error.errno, error.text);
        });
    },

    execute: (sql) => {
        return Database.conn.query(sql[0], sql[1]);
    },

    // Authentication Server

    createAccount      : invoke(path.databaseAuth + 'CreateAccount'),
    fetchUserPassword  : invoke(path.databaseAuth + 'FetchUserPassword'),
    fetchAllCharacters : invoke(path.databaseAuth + 'FetchAllCharacters'),

    // Game Server

    fetchCharacters    : invoke(path.databaseGame + 'FetchCharacters'),
    createCharacter    : invoke(path.databaseGame + 'CreateCharacter'),
    deleteCharacter    : invoke(path.databaseGame + 'DeleteCharacter'),
    fetchSkills        : invoke(path.databaseGame + 'FetchSkills'),
    deleteSkills       : invoke(path.databaseGame + 'DeleteSkills'),
    setSkill           : invoke(path.databaseGame + 'SetSkill'),
    fetchItems         : invoke(path.databaseGame + 'FetchItems'),
    setItem            : invoke(path.databaseGame + 'SetItem'),
    deleteItems        : invoke(path.databaseGame + 'DeleteItems'),
    fetchShortcuts     : invoke(path.databaseGame + 'FetchShortcuts'),
    setShortcut        : invoke(path.databaseGame + 'SetShortcut'),
    deleteShortcut     : invoke(path.databaseGame + 'DeleteShortcut'),
    deleteShortcuts    : invoke(path.databaseGame + 'DeleteShortcuts')
};

module.exports = Database;
