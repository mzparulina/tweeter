$(document).ready(function() {

  /******************************
   * Stretch * Form Toggle
   *****************************/

  $(".compose").click(function() {
    $('.new-tweet').slideToggle("fast");
    $(".form-textarea").focus();
  });

  /******************************
   * Stretch * Second Toggle Button
   *****************************/
  $(window).scroll(function() {
    console.log('test');
    $(".toggle-btn").css('display', 'block');
  });
  
  $(".toggle-btn").click(function() {
    $(window).scrollTop(0);
  });
});