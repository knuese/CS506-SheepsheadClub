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

Player.prototype.rank = function(that) {
    if (this.totalScore == that.totalScore)
        return this.alphabetize(that);
    else
        return this.totalScore - that.totalScore;
}

Player.prototype.addScore = function(scoreEntry) {
    this.scores.push(scoreEntry);
    this.totalScore += scoreEntry.score;
}

module.exports = Player;