const playerSelect = $('select#player');
const semesterInput = $('input#semester');
const datePicker = $('input#date-picker');
const scoreInput = $('input#score');
const saveScoreButton = $('button#save-score');
const clearButton = $('button#clear');
const saveErrLabel = $('label#save-error');

const quickAddName = $('input#name');
const savePlayerButton = $('button#save-player');

// Initialize the page
playerSelect.val('');
datePicker.val(todayFormatted());
semesterInput.prop('disabled', true);
semesterInput.val(calculateSemester(datePicker.val()));

// When a different date is selected, recalculate the semester
$(datePicker).change(() => {
    semesterInput.val(calculateSemester(datePicker.val()));
});

// Handler for the Save button to save a score
$(saveScoreButton).click(() => {
    let playerId = playerSelect.val();
    let semester = semesterInput.val();
    let date = datePicker.val();
    let score = scoreInput.val();

    if (!playerId || !score) {
        $(saveErrLabel).css('display', 'inline-block');
        // Hide label after 1 second
        setTimeout(() => saveErrLabel.css('display', 'none'), 1000);
    } else {
        // Save score
        $.post('/enter-scores/save-score', {
            playerId: playerId,
            semester: semester,
            date: date,
            score: score
        })
        .then(location.reload())
        .catch((err) => console.error(err));
    }
});

// Handler for when the Clear button is clicked
$(clearButton).click(() => {
    playerSelect.val('');
    scoreInput.val('');
});

// Handler for when the Save button is clicked for adding a player quickly
$(savePlayerButton).click(() => {
    let name = quickAddName.val();

    if (name) {
        $.post('/enter-scores/add-player', {
            name: name,
            semester: semesterInput.val()
        })
            .then(location.reload())
            .catch((err) => {
                console.error(err);
            });
    }
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