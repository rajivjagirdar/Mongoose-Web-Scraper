    $(".button-collapse").sideNav();
  
    $('.add-note-button').on('click', function(){
  
        var thisId = $(this).attr("data-id");
  
      $.ajax({
        url: '/add/note/' + thisId,
        type: 'POST',
        data: {
            author: $("#author_name").val(),
            body: $("#note_box").val()
          }
      })
      .then(function(data) {
          console.log(data)
        
        $("#notes").empty();

        
      });
      $("#titleinput").val("");
        $("#bodyinput").val("");
      res.redirect('/')      
    });
  
  
    $('.delete-note-button').on('click', function(){
  
      var noteId = $(this).attr("data-id");
  
      $.ajax({
        url: '/remove/note/' + noteId,
        type: 'POST',
      })
      .then(function() {
        res.redirect('/')
      });
      
      return false;
  
    });
    