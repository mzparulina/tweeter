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
  
  $(".toggle-btn").click(function() {
    $(window).scrollTop(0);
  });
});