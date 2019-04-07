const semesterInput = $('#semester');
const datePicker = $('#date-picker');

$(document).ready(() => {
    datePicker.val(todayFormatted());
    semesterInput.prop('disabled', true);
    semesterInput.val(calculateSemester(datePicker.val()));
});

$(datePicker).change(() => {
    semesterInput.val(calculateSemester(datePicker.val()));
});

function todayFormatted() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? ('0' + month) : month;
    let day = date.getDate();
    day = day < 10 ? ('0' + day) : day;

    return year + '-' + month + '-' + day;
}

function calculateSemester(date) {
    let selectedDate = date.split('-');
    let year = selectedDate[0].substr(2, 2);
    let month = parseInt(selectedDate[1]);

    const season = month < 7 ? 'Spring' : 'Fall';

    return `${season} '${year}`;
}