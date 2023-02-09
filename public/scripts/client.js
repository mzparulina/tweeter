$(document).ready(function() {
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  /******************************
   * Auto Height TextArea
   *****************************/
  const limit = 80; //height limit

  $('#tweet-text').on('input', function(e) {
    if (e.target.value.length < 141) {
      $(".error").css("display", "none");
    }
    this.css("height", Math.min(this.scrollHeight, limit) + "px");
  });

  /******************************
   * Calling all Tweets
   *****************************/

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let i = 0; i < tweets.length; i++) {
      let $tweet = createTweetElement(tweets[i], i);
      $('.tweets-container').prepend($tweet);
    }
  };

  /******************************
   * Create a Tweet
   *****************************/

  const createTweetElement = function(tweet, id) {
    const tweetHandle = tweet.user.handle;
    const tweetAvatar = tweet.user.avatars;
    const tweetName = tweet.user.name;
    const tweetBody = escape(tweet.content.text);
    const tweetDate = timeago.format(tweet.created_at);

    let $tweet = `<article class="tweet" id="${id}">
      <header>
        <div class="tweet-header-wrapper">
          <img src="${tweetAvatar}"/>
          <span >${tweetName}</span>
        </div>
        <span class="tweets-handle"><b>${tweetHandle}</b></span>
      </header>
      <p class="tweets-body">${tweetBody}</p>
      <footer>
        <div class="timeago">${tweetDate}</div>
        <div id="twitterIcons">
          <span data-id="tweetID" class="heartClick"><i class="fa fa-heart" aria-hclassden="true"></i></span>
          <span class="retweetClick"><i class="fa fa-retweet" aria-hidden="true"></i></span>
          <span class="flagClick"><i class="fa fa-flag" aria-hidden="true"></i></span>
        </div>
      </footer>
    </article>`;

    return $tweet;
  };

  /******************************
   * Handles Form Submission
   *****************************/
  $(".tweet-form").on("submit", function(event) {
    event.preventDefault();
    // error validation if character count exceeds 140
    if ($(".form-textarea").val().length > 140) {
      $('.new-tweet').slideDown("fast");
      $(".form-textarea").focus();
      $(".warning1").css("display", "block");
      return;
    }
    // error validation if no user text input
    if ($(".form-textarea").val().length === 0 || $(".form-textarea").val().length === null) {
      $('.new-tweet').slideDown("fast");
      $(".form-textarea").focus();
      $(".warning2").css("display", "block");
      return;
    }

    $(".error-msg").css("display", "none");
    
    let data = $(this).serialize();
    let posting = $.post("/tweets/", data);
    posting.done(function() {
      $('.tweets-container').empty();

      $(".form-textarea").val("");
      $(".counter").text(140);
      loadTweets();

    });
    posting.fail(function(response) {
      $(".container").html(response.responseText);
    });
  });

  /******************************
   * Load all tweets
   *****************************/
  const loadTweets = () => {
    $.get('/tweets/', function(data) {
      renderTweets(data);
    });
  };

  loadTweets();

});