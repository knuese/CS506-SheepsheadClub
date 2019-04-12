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

    $.post( "players/get-data", function( data ){
        console.log(data);
        let players = data.tmp;
        let dataset = [];
        for (let i = 0; i < players.length; i++){
            let row = [];
            let cols = [];
            let player = players[i];
            row.push("Asdf");
            row.push(player.lastName);
            row.push(player.semester);

            dataset.push(row);
        }
       
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