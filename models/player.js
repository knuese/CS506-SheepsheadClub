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

Player.prototype.scoreForDate = function(date) {
    let entry = this.scores.find(e => e.date = date);
    return entry ? entry.score : 0;
}

module.exports = Player;