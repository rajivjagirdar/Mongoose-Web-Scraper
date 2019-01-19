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
      .done(function() {
        
        $("#notes").empty();

        $("#titleinput").val("");
        $("#bodyinput").val("");
      });
      res.redirect('/')
      return false;
      
    });
  
  
    $('.delete-note-button').on('click', function(){
  
      var commentId = $(this).attr("data-id");
  
      $.ajax({
        url: '/remove/note/' + commentId,
        type: 'POST',
      })
      .done(function() {
        res.redirect('/')
      });
      
      return false;
  
    });
    