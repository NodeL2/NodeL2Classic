global.invoke = (module) => {
    return require(__dirname + '/' + module);
};

global.utils = {
    infoSuccess(prefix, ...params) {
        console.info('\x1b[32m' + prefix.slice(0, 10) + ' '.repeat(10 - Math.min(prefix.length, 10)) + ' :: ' + require('util').format(...params) + '\x1b[0m');
    },

    infoWarn(prefix, ...params) {
        console.info('\x1b[33m' + prefix.slice(0, 10) + ' '.repeat(10 - Math.min(prefix.length, 10)) + ' :: ' + require('util').format(...params) + '\x1b[0m');
    },

    infoFail(prefix, ...params) {
        console.info('\x1b[31m' + prefix.slice(0, 10) + ' '.repeat(10 - Math.min(prefix.length, 10)) + ' :: ' + require('util').format(...params) + '\x1b[0m');
        process.exit();
    },

    currentDate() {
        return new Date().toISOString().slice(0, 10);
    },

    nodeVersion() {
        return process.versions.node;
    },

    buildNumber() {
        return require('../package').version;
    },

    size(array) {
        return array.length;
    },

    textSize: (string) => {
        return Buffer.byteLength(string, 'ucs2');
    },

    tuple() {
        return new Array()
    },

    tupleAlloc(count, data) {
        return new Array(count).fill(data);
    },

    randomNumber(max) {
        return Math.floor(Math.random() * max);
    },

    toHex(value, padding = 2) {
        return Number(value).toString(16).padStart(padding, '0');
    },

    stripNull(value) {
        return value.replace(/\u0000/gi, '');
    },

    fileExists(filename) {
        return require('fs').existsSync(filename);
    },

    parseRawFile(filename, charset = 'utf8') {
        return require('fs').readFileSync(filename, charset);
    },

    isAlphaNumeric(string) {
        return /^[A-Za-z0-9]*$/.test(string);
    },

    crushOb(ob) {
        return require('objcrush')(ob);
    },

    killSocket(socket) {
        socket.resetAndDestroy();
    }
};

global.options = {
    default: require('js-ini').parse(
        utils.parseRawFile('./config/default.ini')
    )
};

global.path = {
    databaseAuth: 'AuthenticationServer/Database/',
    databaseGame: 'GameServer/Database/',
           world: 'GameServer/World/Components/',
           actor: 'GameServer/Actor/Components/'
};
