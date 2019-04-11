$(document).ready(() => {
    const navButton = $('button#nav-button');
    const navMenu = $('#nav-menu');

    navButton.on('click', () => {
        if (navMenu.css('display') === 'none') {
            navMenu.show('slide');
        } else {
            navMenu.hide('slide');
        }
    });
})