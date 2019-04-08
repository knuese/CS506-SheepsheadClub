const playerSelect = $('select#player');
const semesterInput = $('input#semester');
const datePicker = $('input#date-picker');
const quickAddName = $('input#name');

$(document).ready(() => {
    datePicker.val(todayFormatted());
    semesterInput.prop('disabled', true);
    semesterInput.val(calculateSemester(datePicker.val()));
});

// When a different date is selected, recalculate the semester
$(datePicker).change(() => {
    semesterInput.val(calculateSemester(datePicker.val()));
});

// Format today's date so that the input element will accept it
function todayFormatted() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? ('0' + month) : month;
    let day = date.getDate();
    day = day < 10 ? ('0' + day) : day;

    return year + '-' + month + '-' + day;
}

// Determine the semester based on the date
function calculateSemester(date) {
    let selectedDate = date.split('-');
    let year = selectedDate[0].substr(2, 2);
    let month = parseInt(selectedDate[1]);

    const season = month < 7 ? 'Spring' : 'Fall';

    return `${season} '${year}`;
}

// Handler for when the save button is clicked for adding a player quickly
$('#save-player').click(() => {
    let name = quickAddName.val();

    if (name) {
        $.post('/enter-scores/add-player', {name: name})
            .then(location.reload())
            .catch((err) => {
                console.error(err);
            }
        );
    }
});