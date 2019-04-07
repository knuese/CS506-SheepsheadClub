$(document).ready(() => {
    $('#date-picker').val(todayFormatted());
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