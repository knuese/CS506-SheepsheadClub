$(document).ready(() => {
    const navButton = $('button#nav_button');
    const navMenu = $('#nav_menu');

    navButton.on('click', () => {
        if (navMenu.css('display') === 'none') {
            navMenu.show('slide');
        } else {
            navMenu.hide('slide');
        }
    });
})