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
    });
    // jq.post('players/get-data').then((data) => {
    //     jq('div.players-alert').remove();
    //     console.log(data);
    // });

// 	let players = data.playerItems;
// 	console.log(players);

// 	let cols = getTableColumns(data);

// 	let dataset = [];

// 	for (let i = 0; i < players.length; i++){
//             let row = [];
// 	    let player = players[i]

// 	    //First Name
//             row.push(player.firstName);
// 	    //Last Name
//             row.push(player.lastName);
// 	    //Semester
//             row.push(player.semester);
	    
// 	}
//     }
// // Pass the $ in so that we can use regular jQuery syntax
// // https://www.w3schools.com/jquery/jquery_noconflict.asp
// jQuery(document).ready(function($) {

//     // Data for the players table (later wiill get from database)
//     const dataset = [
//         ["Ryan", "Knuese", "Spring 200 BC", "Yes"],
//         ["Emmet", "Ryan", "Spring 2019", "No"],
//         ["Blake", "Baranowski", "Spring 2019", "Yes"],
//         ["Evan", "Williams", "Fall 2018", "Yes"],
//         ["Nafis", "Khan", "Fall 2017", "No"],
//         ["Xiangjun", "Ma", "Spring 2019", "Yes"]
//     ];

//     // Columns for the table
//     let cols = [
//         { title: 'First Name' },
//         { title: 'Last Name' },
//         { title: 'Semester' },
// 	{ title: 'Dues Paid' }
//     ];

//     // Define the data table
//     $('#players_table').DataTable( {
//         data: dataset,
//         columns: cols,
//         scrollX: true
//     });

}

jq(document).ready(() => {
    loadData();
});



