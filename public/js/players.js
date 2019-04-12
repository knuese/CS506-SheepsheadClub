// This call is required to enable the data tables
let jq = $.noConflict();

const tableContainer = jq('div#table-container');
let dataTable;

function loadData() {
    jq('div.table-responsive-xs').remove();
    jq('label#no-data').remove();

    let html = `<div class='players-alert'>
		    <label>Loading data...</label>
		</div>`;

    tableContainer.append(html);

    $.post( "players/get-data", (data) => {
        jq('div.players-alert').remove();

        console.log(data.players);
        let players = data.players;
        let dataset = [];
        let cols = [
            { title: 'First Name' },
            { title: 'Last Name' },
            { title: 'Semester' },
            { title: 'Dues Paid On'}
        ];

        players.forEach(p => dataset.push([p.firstName, p.lastName, p.semester, p.duesPaidDate]));

        html = `<div class="table-responsive-xs">
                    <table class="table table-hover table-bordered" id="players-table"/>
                </div>`;
        tableContainer.append(html);

        dataTable = jq('table#players-table').DataTable( {
            data: dataset,
            columns: cols,
            scrollX: true
        });
    });
}

jq(document).ready(() => {
    loadData();
});