// This call is required to enable the data tables
let jq = $.noConflict();

const tableContainer = jq('div#table-container');
const semesterDropdown = jq('select#semester');
let dataTable;

semesterDropdown.change(() => {
    loadData(semesterDropdown.val());
});

function loadData(semester) {
    jq('div.table-responsive-xs').remove();
    jq('label#no-data').remove();   

    let html = `<div class='scores-alert'>
                    <label>Loading data...</label>
                </div>`;
    tableContainer.append(html);

    jq.post('scores/get-data', { semester: semester }).then((data) => { 
        jq('div.scores-alert').remove();

        let players = data.playerScores;
        players = players.sort((a, b) => {return b.totalScore - a.totalScore;});
        console.log(players);

        let cols = getTableColumns(data);
        
        // Data for the table (later will get from database)
        let dataset = [];

        for (let i = 0; i < players.length; i++) {
            let row = [];
            let player = players[i]
            
            // Rank
            row.push(i + 1);
            // Name
            row.push(player.fullName);
            // Total
            row.push(player.totalScore);

            // Scores for the weeks
            cols.forEach(col => {
                row.push(scoreForDate(player, col));
            });

            dataset.push(row);
        }

        // Format the column titles to make them a little nicer
        cols = formatColumnTitles(cols);

        // Add the HTML for the table
        html = `<div class="table-responsive-xs">
                    <table class="table table-hover table-bordered" id="scores-table"/>
                </div>`;
        tableContainer.append(html);

        // Define the data table
        dataTable = jq('table#scores-table').DataTable( {
            data: dataset,
            columns: cols,
            scrollX: true
        });
    }).catch(() => {
        jq('div.scores-alert').remove();
        let html = `<div class='scores-alert'>
                        <label>No data to display!</label>
                    </div>`;
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
    data.playerScores.forEach(p => {
        p.scores.forEach(s => {
            if (cols.indexOf(s.date) === -1) {
                cols.push(s.date);
            }
        });
    });

    cols = cols.sort();

    return cols;
}

// Format the column titles
function formatColumnTitles(cols) {
    let columns = [];
    cols.forEach(c => {
        let tokens = c.split('-');
        let title = tokens[1] + '/' + tokens[2] + '/' + tokens[0];
        columns.push({title:title});
    });

    // Always add these columns at the front
    columns.unshift({title: 'Total'});
    columns.unshift({title: 'Name'});
    columns.unshift({title: 'Rank'});

    return columns;
}

// Get the score for a particular date from the user
function scoreForDate(player, date) {
    let entry;

    for (let i = 0; i < player.scores.length; i++) {
        if (player.scores[i].date == date) {
            entry = player.scores[i];
            break;
        }
    }

    return entry ? entry.score : '';
}