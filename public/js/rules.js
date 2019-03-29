$(document).ready(() => {
    $('button.rules').on('click', (event) => {
        console.log('clicked');
        $('button.rules').removeClass('selected');
        $(event.target).addClass('selected');
        displayForSelection(event.target.id);
    });
    /*
    const roleDropdown = $('select#role');

    roleDropdown.change(() => {
        console.log(`/rules/${roleDropdown.val()}.html`);
        $('#cheetsheet-text').load(`rules/${roleDropdown.val()}.html`);
    });*/

    // Start with general cheetsheet selected
    $('button#cheatsheet').trigger('click');
    //roleDropdown.trigger('change');
});

function displayForSelection(id) {
    $('div.rules-content').css('display', 'none');
    $(`div#${id}`).css('display', 'block');
}