$(document).ready(function() {
    // Need this otherwise the data table doesn't work
    $.noConflict();

    const dataset = [
        [1, "Ryan Knuese", 100, 30, 40, 30],
        [2, "Ethan Happ", 42, 23, -9, 28],
        [3, "Giannis Antetokounmpo", 34, 10, 20, 4],
        [4, "Aaron Rodgers", 12, 12, 0, '--'],
        [5, "Ryan Braun", 8, 0, '--', 8],
        [6, "Tracy Lewis-Williams", -29, -10, -8, -13],
        [7, "Anthony Rizzo", -42, -30, -2, -10]
    ];

    let cols = [
        { title: 'Rank' },
        { title: 'Name' },
        { title: 'Total' }
    ];

    for (let i = 1; i < 4; i++) {
        cols.push({ title: `Week ${i}` });
    }

    $('#scores_table').DataTable( {
        data: dataset,
        columns: cols
    });
});