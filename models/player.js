class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.scores = [];
    }
}

Player.prototype.compare = function(that) {
    return this.name.localeCompare(that.name);
}

Player.prototype.addScore = function(scoreEntry) {
    this.scores.push(scoreEntry);
}

module.exports = Player;