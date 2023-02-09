$(document).ready(function() {

  /******************************
   * Character counter
  *****************************/
 
  $('#tweet-text').on('input', function(e) {
    let input = $(this).val();
    input = 140 - input.length;
    $('.counter').val(input);
    if (input < 0) {
      $('.counter').addClass("negative");
    } else {
      $('.counter').removeClass("negative");
    }
  });
});