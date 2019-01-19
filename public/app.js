    $(".button-collapse").sideNav();
  
    $('.add-comment-button').on('click', function(){
  
      var articleId = $(this).data("id");
  
      var baseURL = window.location.origin;
  
      var frmName = "form-add-" + articleId;
      var frm = $('#' + frmName);
  
  
      $.ajax({
        url: baseURL + '/add/comment/' + articleId,
        type: 'POST',
        data: {
            title: $("#author_name").val(),
            body: $("#note_box").val()
          }
      })
      .done(function() {
        location.reload();
      });
      
      return false;
  
    });
  
  
    $('.delete-comment-button').on('click', function(){
  
      var commentId = $(this).data("id");
  
      var baseURL = window.location.origin;
  
      $.ajax({
        url: baseURL + '/remove/comment/' + commentId,
        type: 'POST',
      })
      .done(function() {
        location.reload();
      });
      
      return false;
  
    });
    