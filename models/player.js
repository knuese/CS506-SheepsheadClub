class Player {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.scores = [];
        this.totalScore = 0;
    }
}

Player.prototype.alphabetize = function(that) {
    return this.name.localeCompare(that.name);
}

Player.prototype.addScore = function(scoreEntry) {
    this.scores.push(scoreEntry);
    this.totalScore += scoreEntry.score;
}

Player.prototype.scoreForDate = function(date) {
    let entry = this.scores.find(e => e.date = date);
    return entry ? entry.score : 0;
}

module.exports = Player;