$('button.fun').on('click', (event) => {
    $('button.fun').removeClass('selected');
    $(event.target).addClass('selected');
    displayForSelection(event.target.id);
});

$(document).ready(() => {
    $('button#vocab').trigger('click');
});

function displayForSelection(id) {
    $('div.fun-content').css('display', 'none');
    $(`div#${id}`).css('display', 'block');
}