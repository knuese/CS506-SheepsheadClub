const roleDropdown = $('select#strategies-role');
const cardDropdown = $('select#card-dropdown');

let hand = [];

$(document).ready(() => {
    // Start with general strategy selected
    $('button#strategy').trigger('click');
    roleDropdown.trigger('change');
});

$('button.tutorial').on('click', (event) => {
    $('button.tutorial').removeClass('selected');
    $(event.target).addClass('selected');
    displayForSelection(event.target.id);
});

roleDropdown.change(() => {
    $('#strategy-text').load(`tutorials/${roleDropdown.val()}.html`);
});

$('button#add-button').on('click', () => {
    let cardsRow = $('div#cards-row');
    let card = cards.find(card => card.code == cardDropdown.val());

    hand.push(card);
    
    cardsRow.append(`<div class='card my-card' id='${card.code}'>
                        <img src='/img/cards/${card.code}.png' class='card'>${card.name}</img>
                     </div>`);
});

function displayForSelection(id) {
    $('div.tutorial-content').css('display', 'none');
    $(`div#${id}`).css('display', 'block');
}