$(document).ready(() => {
    $('button.tutorial').on('click', (event) => {
        console.log('clicked');
        $('button.tutorial').removeClass('selected');
        $(event.target).addClass('selected');
        displayForSelection(event.target.id);
    });

    const roleDropdown = $('select#strategies-role');

    roleDropdown.change(() => {
        console.log(`/tutorials/${roleDropdown.val()}.html`);
        $('#strategy-text').load(`tutorials/${roleDropdown.val()}.html`);
    });

    // Start with general strategy selected
    $('button#strategy').trigger('click');
    roleDropdown.trigger('change');
});

function displayForSelection(id) {
    $('div.tutorial-content').css('display', 'none');
    $(`div#${id}`).css('display', 'block');
}