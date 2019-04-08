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
            [1, "Ryan Knuese", 100],
            [2, "Ethan Happ", 42],
            [3, "Giannis Antetokounmpo", 34],
        ];

        for (let i = 0; i < cols.length - 3; i++) {
            dataset.forEach(set => set.push(0));
        }

        //Define the data table
        dataTable = jq('#scores_table').DataTable( {
            data: dataset,
            columns: cols,
            scrollX: true
        });
    }).catch(() => {
        let html = `<label id='no-data'>No data to display!</label>`;
        tableContainer.append(html);
    });
}

// Pass the $ in so that we can use regular jQuery syntax
// https://www.w3schools.com/jquery/jquery_noconflict.asp
jq(document).ready(() => {
    // Load semesters into dropdown (later will get from database)
    jq.post('scores/get-semesters').then((data) => {
        data.semesters.forEach(sem => $('#semester').append(new Option(sem)));
        loadData(semesterDropdown.val());
    })    
});

// Get the columns for the data table
function getTableColumns(data) {
    let cols = [];
    let datesSeen = [];
    data.playerScores.forEach(p => {
        p.scores.forEach(s => {
            if (datesSeen.indexOf(s.date) === -1) {
                cols.push({title: s.date});
                datesSeen.push(s.date);
            }
        });
    });

    cols.sort();

    // Always add these columns at the front
    cols.unshift({title: 'Total'});
    cols.unshift({title: 'Name'});
    cols.unshift({title: 'Rank'});

    return cols;
}