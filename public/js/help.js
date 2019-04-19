// Declaring constants for the dropdown selections
const roleDropdown = $('select#strategies-role');
const playDropdown = $('select#play-role');
const cardDropdown = $('select#card-dropdown');
const simulatorDropdown = $('select#picking-simulator');
const pickDropdown = $('select#picking-examples');

// Declaring message response labels for the 'Should I Pick?' section


let correctPickLabel = $('label#correct-pick');
let maybePickLabel = $('label#maybe-pick');
let incorrectPickLabel = $('label#incorrect-pick');

// Array of cards selected for a random hand in the 'Should I Pick' section
let random_hand = [];

// Array of cards selected for hand assistance
let hand = [];

// Declaring message labels for the 'Hand Assistance' section
let dupErrorLabel = $('label#dup-error');
let goodHandLabel = $('label#good-hand');
let goodOkayLabel = $('label#okay-hand');
let goodBadLabel = $('label#bad-hand');


$(document).ready(() => {
    // Start with general strategy selected
    $('button#strategy').trigger('click');
    $('button#pickuphard').trigger('click');
    $('button#passhard').trigger('click');

    roleDropdown.trigger('change');
    playDropdown.trigger('change');
    pickDropdown.trigger('change');
});

$('button.help').on('click', (event) => {
    $('button.help').removeClass('selected');
    $(event.target).addClass('selected');
    displayForSelection(event.target.id);
});

// Switching between the html strategy dropdown selections
roleDropdown.change(() => {
    $('#strategy-text').load(`help-files/${roleDropdown.val()}.html`);
});

// Switching between the html what to play dropdown selections
playDropdown.change(() => {
    $('#play-text').load(`what-to-play/${playDropdown.val()}.html`);
});

// Switching between the hardcode and randomized 'Should I Pick?' dropdown selections
simulatorDropdown.change(() => {
    clearMessage();
    if(simulatorDropdown.val() == "hard_coded") {
        $('.hardcode').css('display', 'block');
        $('.hardcode#pick-text').load(`should-I-pick/${pickDropdown.val()}.html`);
        $('.random').css('display', 'none');
    }
    else {
        $('.random').css('display', 'block');
        $('.hardcode').css('display', 'none');
        randomHand();

    }
});

// Switching between the html strategy dropdown selections
pickDropdown.change(() => {
    $('.hardcode#pick-text').load(`should-I-pick/${pickDropdown.val()}.html`);
});

// Hide the error when a different card is selected
cardDropdown.change(() => {
    dupErrorLabel.css('display', 'none');
});

// Hide correct/incorrect pick when you change the hardcoded example
pickDropdown.change(() => {
    clearMessage();
});

// Add a new card when you click the add button (as long as it's less than 6 cards)
$('button#add-button').on('click', () => {
    let cardsRow = $('div#cards-row');

    let card = cards.find(card => card.code == cardDropdown.val());

    // Make sure the card hasn't already been selected
    let found = false;
    for (let i = 0; i < hand.length; i++) {
        if (card.code == hand[i].code) {
            found = true;
            break;
        }
    }

    // If not found and hand still not at 6 cards, add card
    if (!found && hand.length <= 5) {
        hand.push(card);

        cardsRow.append(`<div class='card my-card clear' id='${card.code}'>
                            <img src='/images/cards/${card.code}.png' class='card'/>
                            <p><b>${card.name}</b></br>
                            Point value: ${card.pointValue}</br>
                            Is trump? ${card.isTrump ? 'Yes' : 'No'}</p>
                            <button class='remove-card'>Remove</button>
                         </div>`);

        // Add click handler for injected button
        $(document).on('click','.remove-card', (event) => {
            removeCard(event);    
        });
    } else {
        // Display error message
        $('label#dup-error').css('display', 'block');

        // Hide label after 5 second
        setTimeout(() => dupErrorLabel.css('display', 'none'), 5000);
    }

    // Display how strong the hand is
    if (hand.length == 6){
        let check_hand = checkHand(hand);
        if(check_hand == 0){
            $('label#bad-hand').css('display', 'block');
        }
        else if(check_hand=1){
            $('label#good-hand').css('display', 'block');
        }
        else {
            $('label#okay-hand').css('display', 'block');

        }
    }
});

// Clears all the cards in the current hand-assistance hand
$('button#clear-button').on('click', () => {
    clearMessage();
    $('.clear').remove();
    hand = []
});

// Checks if pick up was the right decision for hard coded examples
$('button#pickuphard').on('click', () => {
    clearMessage();

    if(pickDropdown.val() == 'example1' || pickDropdown.val() == 'example3') {
        // Display correct pick
        $('label#correct-pick').css('display', 'block');

        // Hide label after 10 second        
        setTimeout(() => correctPickLabel.css('display', 'none'), 10000);

    }
    else {
        // Display incorrect pick
        $('label#incorrect-pick').css('display', 'block');

        // Hide label after 10 second
        setTimeout(() => incorrectPickLabel.css('display', 'none'), 10000);
    }
});

// Checks if pass was right decision for hard coded examples
$('button#passhard').on('click', () => {
    clearMessage();

    if(pickDropdown.val() == 'example1' || pickDropdown.val() == 'example3') {
        // Display incorrect pick
        $('label#incorrect-pick').css('display', 'block');

        // Hide label after 10 second        
        setTimeout(() => incorrectPickLabel.css('display', 'none'), 10000);

    }
    else {
        // Display correct pick
        $('label#correct-pick').css('display', 'block');

        // Hide label after 10 second
        setTimeout(() => correctPickLabel.css('display', 'none'), 10000);
    }
});

// Checks if pick up was the right decision for random examples
$('button#pickuprandom').on('click', () => {
    clearMessage();

    let check_hand = checkHand(random_hand);
    if(check_hand == 1){
        // Display correct pick
        $('label#correct-pick').css('display', 'block');

        // Hide label after 10 second        
        setTimeout(() => correctPickLabel.css('display', 'none'), 10000);
    }
    else if(check_hand == 2){
        // Display tentative pick
        $('label#maybe-pick').css('display', 'block');
        
        // Hide label after 10 second        
        setTimeout(() => maybePickLabel.css('display', 'none'), 10000);
    }
    else {
        // Display incorrect pick
        $('label#incorrect-pick').css('display', 'block');

        // Hide label after 10 second
        setTimeout(() => incorrectPickLabel.css('display', 'none'), 10000);
    }
});

// Checks if pass was the right decision for random examples
$('button#passrandom').on('click', () => {
    clearMessage();

    let check_hand = checkHand(random_hand);
    if(check_hand == 0){
        // Display correct pick
        $('label#correct-pick').css('display', 'block');

        // Hide label after 10 second        
        setTimeout(() => correctPickLabel.css('display', 'none'), 10000);
    }
    else if(check_hand == 2){
        // Display tentative pick
        $('label#maybe-pick').css('display', 'block');
        
        // Hide label after 10 second        
        setTimeout(() => maybePickLabel.css('display', 'none'), 10000);
    }
    else {
        // Display incorrect pick
        $('label#incorrect-pick').css('display', 'block');

        // Hide label after 10 second
        setTimeout(() => incorrectPickLabel.css('display', 'none'), 10000);
    }
});

// Gives a new random deal for 'Should I Pick?' section
$('button#newdeal').on('click', () => {
    clearMessage();
    randomHand();
});

// Remove a card from both the hand array and the UI for hand assistance
function removeCard(event) {
    let toRemove = $(event.target.parentNode);
    
    let code = toRemove.attr('id');
    hand = hand.filter((card) => {
        return card.code != code;
    });

    toRemove.remove();
    clearMessage();
};

// Function that clears all error/info messages
function clearMessage(){
    $('label#correct-pick').css('display', 'none');
    $('label#maybe-pick').css('display', 'none');
    $('label#incorrect-pick').css('display', 'none');
    $('label#good-hand').css('display', 'none');
    $('label#okay-hand').css('display', 'none');
    $('label#bad-hand').css('display', 'none');
}

// Function that checks the strength of the hand based on trump/points
// Returns 0 for bad, 1 for good, and 2 for okay
function checkHand(current_hand) {
    let trump_count = 0;
    let queen_count = 0;
    let jack_count = 0;
    let total_points = 0;

    // Searching for all the trump, queens, and jacks (while adding up point total as well)
    for(let i = 0; i < current_hand.length; i++) {
        if(current_hand[i].code[0] == "Q"){
            queen_count++;
        }
        if(current_hand[i].code[0] == "J"){
            jack_count++;
        }
        if(current_hand[i].isTrump == true){
            trump_count++;
        }
        total_points += current_hand[i].pointValue;
    }

    // Determine strength of hand
    if(queen_count >= 3){
        return 1;
    }
    else if(queen_count >= 2 && trump_count >= 3){
        return 1;
    }
    else if(trump_count >= 4){
        return 1;
    }
    else if(queen_count >= 2 && total_points >= 35){
        return 2;
    }
    else if(trump_count >= 3 && total_points >=35){
        return 2;
    }
    else {
        return 0;
    }
};

// Retreives a random hand for the Should I Pick?
function randomHand() {
    
    let cardsRow = $('div#pick-text-random');
    $('.random').css('display', 'flex');

    // Clears screen of the previous random hand
    $(".displayed").remove();

    // Reset the random hand
    random_hand = [];
    let random_num_list = [];
    
    // Pick 6 random cards based on random number generator
    for(let i = 0; i < 6; i++) {
        let randomNum = Math.floor(Math.random() * 32);
        if (random_num_list.indexOf(randomNum) == -1) {
            random_hand.push(cards[randomNum]);
            random_num_list.push(randomNum);
        }
        else {
            i--;
        }
    }

    // Adds new random cards to view/screen
    for(let i = 0; i < random_hand.length; i++) {
        cardsRow.append(`<div class='card my-card displayed' id='${random_hand[i].code}'>
                            <img src='/images/cards/${random_hand[i].code}.png' class='card'/>
                            <p><b>${random_hand[i].name}</b><br/>
                            Point value: ${random_hand[i].pointValue}<br/>
                            Is trump? ${random_hand[i].isTrump ? 'Yes' : 'No'}</p>
                        </div>`);
    }


};

// Display the correct help information
function displayForSelection(id) {
    $('div.help-content').css('display', 'none');
    $(`div#${id}`).css('display', 'block');
};