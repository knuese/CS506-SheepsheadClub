class Card {
    constructor(name, code, pointValue, isTrump) {
        this.name = name;
        this.code = code;
        this.pointValue = pointValue;
        this.isTrump = isTrump;
    }
}

let cards = [];
cards.push(new Card('Queen of Clubs', 'QC', 3, true));
cards.push(new Card('Queen of Spades', 'QS', 3, true));
cards.push(new Card('Queen of Hearts', 'QH', 3, true));
cards.push(new Card('Queen of Diamonds', 'QD', 3, true));
cards.push(new Card('Jack of Clubs', 'JC', 2, true));
cards.push(new Card('Jack of Spades', 'JS', 2, true));
cards.push(new Card('Jack of Hearts', 'JH', 2, true));
cards.push(new Card('Jack of Diamonds', 'JD', 2, true));
cards.push(new Card('Ace of Diamonds', 'AD', 11, true));
cards.push(new Card('Ten of Diamonds', '10D', 10, true));
cards.push(new Card('King of Diamonds', 'KD', 4, true));
cards.push(new Card('Nine of Diamonds', '9D', 0, true));
cards.push(new Card('Eight of Diamonds', '8D', 0, true));
cards.push(new Card('Seven of Diamonds', '7D', 0, true));
cards.push(new Card('Ace of Clubs', 'AC', 11, false));
cards.push(new Card('Ten of Clubs', '10C', 10, false));
cards.push(new Card('King of Clubs', 'KC', 4, false));
cards.push(new Card('Nine of Clubs', '9C', 0, false));
cards.push(new Card('Eight of Clubs', '8C', 0, false));
cards.push(new Card('Seven of Clubs', '7C', 0, false));
cards.push(new Card('Ace of Spades', 'AS', 11, false));
cards.push(new Card('Ten of Spades', '10S', 10, false));
cards.push(new Card('King of Spades', 'KS', 4, false));
cards.push(new Card('Nine of Spades', '9S', 0, false));
cards.push(new Card('Eight of Spades', '8S', 0, false));
cards.push(new Card('Seven of Spades', '7S', 0, false));
cards.push(new Card('Ace of Hearts', 'AH', 11, false));
cards.push(new Card('Ten of Hearts', '10H', 10, false));
cards.push(new Card('King of Hearts', 'KH', 4, false));
cards.push(new Card('Nine of Hearts', '9H', 0, false));
cards.push(new Card('Eight of Hearts', '8H', 0, false));
cards.push(new Card('Seven of Hearts', '7H', 0, false));

module.exports = cards;