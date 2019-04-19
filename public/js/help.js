const roleDropdown = $('select#strategies-role');
const playDropdown = $('select#play-role');
const cardDropdown = $('select#card-dropdown');
const simulatorDropdown = $('select#picking-simulator');
const pickDropdown = $('select#picking-examples');
let dupErrorLabel = $('label#dup-error');
let correctPickLabel = $('label#correct-pick');
let maybePickLabel = $('label#maybe-pick');
let incorrectPickLabel = $('label#incorrect-pick');

let random_hand = [];

let simulatorFlag = false;

// Array of cards that have been selected
let hand = [];

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

roleDropdown.change(() => {
    $('#strategy-text').load(`help-files/${roleDropdown.val()}.html`);
});

playDropdown.change(() => {
    $('#play-text').load(`what-to-play/${playDropdown.val()}.html`);
});

simulatorDropdown.change(() => {
    if(simulatorDropdown.val() == "hard_coded") {
        simulatorFlag = false;
        $('.hardcode').css('display', 'block');
        $('.hardcode#pick-text').load(`should-I-pick/${pickDropdown.val()}.html`);
        $('.random').css('display', 'none');
    }
    else {
        simulatorFlag = true;
        $('.random').css('display', 'block');
        $('.hardcode').css('display', 'none');
        randomHand();

    }
});

pickDropdown.change(() => {
    $('.hardcode#pick-text').load(`should-I-pick/${pickDropdown.val()}.html`);
});

// Hide the error when a different card is selected so as not to be confusing
cardDropdown.change(() => {
    dupErrorLabel.css('display', 'none');
});

pickDropdown.change(() => {
    correctPickLabel.css('display', 'none');
    incorrectPickLabel.css('display', 'none');
});

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

    // If not found, add the HTML to display the card
    if (!found) {
        hand.push(card);

        cardsRow.append(`<div class='card my-card' id='${card.code}'>
                            <img src='/images/cards/${card.code}.png' class='card'/>
                            <label style='font-weight:bold'>${card.name}</label>
                            <label>Point value: ${card.pointValue}</label>
                            <label>Is trump? ${card.isTrump ? 'Yes' : 'No'}</label>
                            <button class='remove-card'>Remove</button>
                         </div>`);

        // Add click handler for injected button
        $(document).on('click','.remove-card', (event) => {
            removeCard(event);    
        });
    } else {
        $('label#dup-error').css('display', 'block');

        // Hide label after 1 second
        setTimeout(() => dupErrorLabel.css('display', 'none'), 1000);
    }
});

$('button#pickuphard').on('click', () => {
    clearMessage();

    if(pickDropdown.val() == 'example1' || pickDropdown.val() == 'example3') {
        $('label#correct-pick').css('display', 'block');

        // Hide label after 10 second        
        setTimeout(() => correctPickLabel.css('display', 'none'), 10000);

    }
    else {
        $('label#incorrect-pick').css('display', 'block');

        // Hide label after 10 second
        setTimeout(() => incorrectPickLabel.css('display', 'none'), 10000);
    }
});

$('button#passhard').on('click', () => {
    clearMessage();

    if(pickDropdown.val() == 'example1' || pickDropdown.val() == 'example3') {
        $('label#incorrect-pick').css('display', 'block');

        // Hide label after 10 second        
        setTimeout(() => incorrectPickLabel.css('display', 'none'), 10000);

    }
    else {
        $('label#correct-pick').css('display', 'block');

        // Hide label after 10 second
        setTimeout(() => correctPickLabel.css('display', 'none'), 10000);
    }
});

$('button#pickuprandom').on('click', () => {
    clearMessage();

    check_hand = checkHand();
    if(check_hand == 1){
        $('label#correct-pick').css('display', 'block');

        // Hide label after 10 second        
        setTimeout(() => correctPickLabel.css('display', 'none'), 10000);
    }
    else if(check_hand == 2){
        $('label#maybe-pick').css('display', 'block');
        
        // Hide label after 10 second        
        setTimeout(() => maybePickLabel.css('display', 'none'), 10000);
    }
    else {
        $('label#incorrect-pick').css('display', 'block');

        // Hide label after 10 second
        setTimeout(() => incorrectPickLabel.css('display', 'none'), 10000);
    }
});

$('button#passrandom').on('click', () => {
    clearMessage();

    check_hand = checkHand();
    if(check_hand == 0){
        $('label#correct-pick').css('display', 'block');

        // Hide label after 10 second        
        setTimeout(() => correctPickLabel.css('display', 'none'), 10000);
    }
    else if(check_hand == 2){
        $('label#maybe-pick').css('display', 'block');
        
        // Hide label after 10 second        
        setTimeout(() => maybePickLabel.css('display', 'none'), 10000);
    }
    else {
        $('label#incorrect-pick').css('display', 'block');

        // Hide label after 10 second
        setTimeout(() => incorrectPickLabel.css('display', 'none'), 10000);
    }
});

$('button#newdeal').on('click', () => {
    clearMessage();
    randomHand();
});

// Remove a card from both the hand array and the UI
function removeCard(event) {
    let toRemove = $(event.target.parentNode);
    
    let code = toRemove.attr('id');
    hand = hand.filter((card) => {
        return card.code != code;
    });

    toRemove.remove();
};

function clearMessage(){
    $('label#correct-pick').css('display', 'none');
    $('label#maybe-pick').css('display', 'none');
    $('label#incorrect-pick').css('display', 'none');
}

function checkHand() {
    let trump_count = 0;
    let queen_count = 0;
    let jack_count = 0;
    let total_points = 0;
    for(let i = 0; i < random_hand.length; i++) {
        if(random_hand[i].code[0] == "Q"){
            queen_count++;
        }
        if(random_hand[i].code[0] == "J"){
            jack_count++;
        }
        if(random_hand[i].isTrump == true){
            trump_count++;
        }
        total_points += random_hand[i].pointValue;
    }

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
    else if(trump_count >= 3 && total_points >=30){
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

    
    $(".displayed").remove();

    random_hand = [];
    let random_num_list = [];
    
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