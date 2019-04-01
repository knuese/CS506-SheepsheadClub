const roleDropdown = $('select#strategies-role');
const cardDropdown = $('select#card-dropdown');
let dupErrorLabel = $('label#dup-error');

// Array of cards that have been selected
let hand = [];

$(document).ready(() => {
    // Start with general strategy selected
    $('button#strategy').trigger('click');
    roleDropdown.trigger('change');
});

$('button.help').on('click', (event) => {
    $('button.help').removeClass('selected');
    $(event.target).addClass('selected');
    displayForSelection(event.target.id);
});

roleDropdown.change(() => {
    $('#strategy-text').load(`help-files/${roleDropdown.val()}.html`);
});

// Hide the error when a different card is selected so as not to be confusing
cardDropdown.change(() => {
    dupErrorLabel.css('display', 'none');
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