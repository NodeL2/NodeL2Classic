const QualifiedUsers = {
    // A method to keep track of authenticated users and their information
    table: utils.tuple(),

    insert(username, secret) {
        this.table = this.table.filter((ob) => username !== ob.username);
        this.table.push({ username: username, secret: secret, date: Date.now() });
    },

    find(username, secret) {
        return this.table.find((ob) => username === ob.username && secret === ob.secret);
    }
};

module.exports = QualifiedUsers;
