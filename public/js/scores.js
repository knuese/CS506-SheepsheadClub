// This call is required to enable the data tables
let jq = $.noConflict();

const tableContainer = jq('div#table-container');
const semesterDropdown = jq('select#semester');
let dataTable;

semesterDropdown.change(() => {
    loadData(semesterDropdown.val());
});

function loadData(semester) {
    if (dataTable) dataTable.destroy();
    jq('label#no-data').remove();   

    jq.post('scores/get-data', { semester: semester }).then((data) => { 
        console.log(data);
        let cols = getTableColumns(data);
        
        // Data for the table (later will get from database)
        const dataset = [
            [1, "Ryan Knuese", 100, 30, 40, 30],
            [2, "Ethan Happ", 42, 23, -9, 28],
            [3, "Giannis Antetokounmpo", 34, 10, 20, 4],
            [4, "Aaron Rodgers", 12, 12, 0, '--'],
            [5, "Ryan Braun", 8, 0, '--', 8],
            [6, "Tracy Lewis-Williams", -29, -10, -8, -13],
            [7, "Anthony Rizzo", -42, -30, -2, -10],
            [8, "A", -100, -100, 0, 0],
            [9, "B", -100, -100, 0, 0],
            [10, "C", -100, -100, 0, 0],
            [11, "D", -100, -100, 0, 0],
            [12, "E", -100, -100, 0, 0],
            [13, "F", -100, -100, 0, 0],
            [14, "G", -100, -100, 0, 0]
        ];

        // for (let i = 1; i < 15; i++) {
        //     if (i > 3) {
        //         dataset.forEach(set => set.push(0));
        //     }
        // }

        // Define the data table
        // dataTable = jq('#scores_table').DataTable( {
        //     columns: cols,
        //     scrollX: true
        // });
    }).catch(() => {
        let html = `<label id='no-data'>No data to display!</label>`;
        tableContainer.append(html);
    });
}

// Pass the $ in so that we can use regular jQuery syntax
// https://www.w3schools.com/jquery/jquery_noconflict.asp
jq(document).ready(() => {
    // Load semesters into dropdown (later will get from database)
    const semesters = ["Spring '19", "Fall '18", "Spring '18", "Fall '17"];
    semesters.forEach(sem => $('#semester').append(new Option(sem)));
    
    loadData(semesterDropdown.val());
});

// Get the columns for the data table
function getTableColumns(data) {
    let cols = [];
    data.playerScores.forEach(p => {
        p.scores.forEach(s => {
            if (cols.indexOf(s.date) === -1)
                cols.push(s.date);
        });
    });

    cols.sort();

    // Always add these columns at the front
    cols.unshift('Total');
    cols.unshift('Name');
    cols.unshift('Rank');

    return cols;
}