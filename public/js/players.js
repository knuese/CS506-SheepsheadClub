// This call is required to enable the data tables
let jq = $.noConflict();

const tableContainer = jq('div#table-container');
let dataTable;
let selectedRow;

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
            { title: 'ID' },
            { title: 'First Name' },
            { title: 'Last Name' },
            { title: 'Semester' },
            { title: 'Dues Paid On'}
        ];

        players.forEach(p => dataset.push([p.id, p.firstName, p.lastName, p.semester, p.duesPaidDate]));

        html = `<div class="table-responsive-xs">
                    <table class="table table-hover table-bordered" id="players-table"/>
                </div>`;
        tableContainer.append(html);

        dataTable = jq('table#players-table').DataTable( {
            data: dataset,
            columns: cols,
            scrollX: true,
            columnDefs: [
                {
                    'targets': [0],
                    'visible': false,
                    'searchable': false
                }
            ]
        });

        jq('#players-table tbody').on('click', 'tr', function(e) {
            e.stopPropagation();

            selectedRow = dataTable.row(this).data();

            $("#players-table tbody tr").removeClass('row-selected');        
            $(this).addClass('row-selected');
            
            jq('a#update').removeClass('disabled');
            jq('a#delete').removeClass('disabled');
        });
    });
}


jq(document).ready(() => {
    jq('a#update').addClass('disabled');
    jq('a#delete').addClass('disabled');

    loadData();
});

jq('a#update').click(() => {
    let id = selectedRow[0];
    let firstName = selectedRow[1];
    let lastName = selectedRow[2];
    let semester = selectedRow[3];
    let duesPaidDate = selectedRow[4];

    $('#update-modal #id').val(id);
    $('#update-modal #fn').val(firstName);
    $('#update-modal #ln').val(lastName);
    $('#update-modal #sem').val(semester);
    $('#update-modal #dp').val(duesPaidDate);
});

jq('a#delete').click(() => {
    let id = selectedRow[0];
    let firstName = selectedRow[1];

    $('#delete-modal #id').val(id);
    $('#delete-modal label#name').val(`Are you sure you want to delete ${firstName}?`);
});

jq(document).click(() => {
    jq("#players-table tbody tr").removeClass('row-selected');  
    jq('a#update').addClass('disabled');
    jq('a#delete').addClass('disabled'); 
});