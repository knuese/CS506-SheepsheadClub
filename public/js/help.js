const roleDropdown = $('select#strategies-role');
const playDropdown = $('select#play-role');
const cardDropdown = $('select#card-dropdown');
const pickDropdown = $('select#picking-examples');
let dupErrorLabel = $('label#dup-error');
let correctPickLabel = $('label#correct-pick');
let incorrectPickLabel = $('label#incorrect-pick');

// Array of cards that have been selected
let hand = [];

$(document).ready(() => {
    // Start with general strategy selected
    $('button#strategy').trigger('click');
    $('button#pickup').trigger('click');
    $('button#pass').trigger('click');

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

pickDropdown.change(() => {
    $('#pick-text').load(`should-I-pick/${pickDropdown.val()}.html`);
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

$('button#pickup').on('click', () => {
    $('label#correct-pick').css('display', 'none');
    $('label#incorrect-pick').css('display', 'none');

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

$('button#pass').on('click', () => {
    $('label#correct-pick').css('display', 'none');
    $('label#incorrect-pick').css('display', 'none');

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

// Remove a card from both the hand array and the UI
function removeCard(event) {
    let toRemove = $(event.target.parentNode);
    
    let code = toRemove.attr('id');
    hand = hand.filter((card) => {
        return card.code != code;
    });

    toRemove.remove();
};

// Display the correct help information
function displayForSelection(id) {
    $('div.help-content').css('display', 'none');
    $(`div#${id}`).css('display', 'block');
}