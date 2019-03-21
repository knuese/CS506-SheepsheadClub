// This call is required to enable the data tables
$.noConflict();

// Pass the $ in so that we can use regular jQuery syntax
// https://www.w3schools.com/jquery/jquery_noconflict.asp
jQuery(document).ready(function($) {
    // Load semesters into dropdown (later will get from database)
    const semesters = ["Spring '19", "Fall '18", "Spring '18", "Fall '17"];
    semesters.forEach(sem => $('#semester').append(new Option(sem)));

    // Data for the table (later will get from database)
    const dataset = [
        [1, "Ryan Knuese", 100, 30, 40, 30],
        [2, "Ethan Happ", 42, 23, -9, 28],
        [3, "Giannis Antetokounmpo", 34, 10, 20, 4],
        [4, "Aaron Rodgers", 12, 12, 0, '--'],
        [5, "Ryan Braun", 8, 0, '--', 8],
        [6, "Tracy Lewis-Williams", -29, -10, -8, -13],
        [7, "Anthony Rizzo", -42, -30, -2, -10]
    ];

    // Columns for the table
    let cols = [
        { title: 'Rank' },
        { title: 'Name' },
        { title: 'Total' }
    ];

    for (let i = 1; i < 4; i++) {
        cols.push({ title: `Week ${i}` });
    }

    // Define the data table
    $('#scores_table').DataTable( {
        data: dataset,
        columns: cols
    });
});