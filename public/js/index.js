const postButton = $('button#postButton');
const postContent = $('textarea#postContent');
const poster = $('input#poster');

//add event listener to each delete button for every post dynamically
Array.from(document.querySelectorAll('.deleteButton')).forEach(function(button) {
    $('#'+button.id).on('click', (event) => {
        console.log(button.id);
        $.ajax({
          type: 'POST',
          url: '/delete_post',
          data: {
              id: button.id
          },
          success: function(data){
            if(data == 'success'){
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
      success: function(data){
        if(data == 'success'){
            location.reload();
        }
      }
    });
});
