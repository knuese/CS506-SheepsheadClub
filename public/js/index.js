const postButton = $('button#postButton');
const postContent = $('textarea#postContent');
const poster = $('input#poster');

//add event listener to each delete button for every post dynamically
Array.from(document.querySelectorAll('.deleteButton')).forEach(function (button) {
    $('#' + button.id).on('click', (event) => {
        $.ajax({
            type: 'POST',
            url: '/delete_post',
            data: {
                id: button.id
            },
            success: function (data) {
                if (data == 'success') {
                    location.reload();
                }
            }
        });
    });
});

postButton.on('click', (event) => {

    let posterName = poster.val();
    let content = postContent.val();

    $.ajax({
        type: 'POST',
        url: '/submit_post',
        data: {
            posterName: posterName,
            content: content
        },
        success: function (data) {
            if (data == 'success') {
                location.reload();
            }
        }
    });
});

// for pagination of announcement 
var paginationHandler = function () {
    // store pagination container so we only select it once
    var $paginationContainer = $(".pagination-container"),
        $pagination = $paginationContainer.find('.pagination ul');
    // click event
    $pagination.find("li a").on('click.pageChange', function (e) {
        e.preventDefault();
        // get parent li's data-page attribute and current page
        var parentLiPage = $(this).parent('li').data("page"),
            currentPage = parseInt($(".pagination-container div[data-page]:visible").data('page')),
            numPages = $paginationContainer.find("div[data-page]").length;
        // make sure they aren't clicking the current page
        if (parseInt(parentLiPage) !== parseInt(currentPage)) {
            // hide the current page
            $paginationContainer.find("div[data-page]:visible").hide();
            if (parentLiPage === '+') {
                // next page
                $paginationContainer.find("div[data-page=" + (currentPage + 1 > numPages ? numPages : currentPage + 1) + "]").show();
            } else if (parentLiPage === '-') {
                // previous page
                $paginationContainer.find("div[data-page=" + (currentPage - 1 < 1 ? 1 : currentPage - 1) + "]").show();
            } else {
                // specific page
                $paginationContainer.find("div[data-page=" + parseInt(parentLiPage) + "]").show();
            }
        }
    });
};
$(document).ready(paginationHandler);
