// This call is required to enable the data tables
$.noConflict();

// Pass the $ in so that we can use regular jQuery syntax
// https://www.w3schools.com/jquery/jquery_noconflict.asp
jQuery(document).ready(function($) {

    // Data for the players table (later wiill get from database)
    const dataset = [
        ["Ryan", "Knuese", "Spring 200 BC", "Yes"],
        ["Emmet", "Ryan", "Spring 2019", "No"],
        ["Blake", "Baranowski", "Spring 2019", "Yes"],
        ["Evan", "Williams", "Fall 2018", "Yes"],
        ["Nafis", "Khan", "Fall 2017", "No"],
        ["Xiangjun", "Ma", "Spring 2019", "Yes"]
    ];

    // Columns for the table
    let cols = [
        { title: 'First Name' },
        { title: 'Last Name' },
        { title: 'Semester' },
	{ title: 'Dues Paid' }
    ];

    // Define the data table
    $('#players_table').DataTable( {
        data: dataset,
        columns: cols,
        scrollX: true
    });
});

