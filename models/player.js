class Player {
    constructor(id, firstName, lastName) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + lastName;
        this.scores = [];
        this.totalScore = 0;
    }
}

Player.prototype.alphabetize = function(that) {
    return this.fullName.localeCompare(that.fullName);
}

Player.prototype.addScore = function(scoreEntry) {
    this.scores.push(scoreEntry);
    this.totalScore += scoreEntry.score;
}

module.exports = Player;