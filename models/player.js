class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

Player.prototype.compare = function(that) {
    return this.name.localeCompare(that.name);
}

module.exports = Player;