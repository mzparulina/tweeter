/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let i = 0; i < tweets.length; i++) {
      let $tweet = createTweetElement(tweets[i], i);
      $('.tweets-container').prepend($tweet);
    }
  };

  const createTweetElement = function(tweet, id) {
    const tweetHandle = tweet.user.handle;
    const tweetAvatar = tweet.user.avatars;
    const tweetName = tweet.user.name;
    const tweetBody = tweet.content.text;
    const tweetDate = timeago.format(tweet.created_at);

    let $tweet = `<article class="tweet" id="${id}">
      <header>
        <div class="tweet-header-wrapper">
          <img class="profileAvatar" src="${tweetAvatar}">
          <span class="tweets-name">${tweetName}</span>
        </div>
        <span class="tweets-handle"><b${tweetHandle}</b></span>
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

  //handles form submission
  $(".tweet-form").on("submit", function(event) {
    event.preventDefault();
    if ($(".form-textarea").val().length > 140) {
      alert('Character count limit exceeded');
      return;
    }
    if ($(".form-textarea").val().length === 0 || $(".form-textarea").val().length === null) {
      alert('Input field is empty');
      return;
    }

    let data =  $(this).serialize();

    $.post("/tweets/", data, function() {
      loadTweets();
      $(".form-textarea").val("");
      $(".counter").text(140);
    });
  });

  const loadTweets = () => {
    $.get('/tweets/', function(data) {
      renderTweets(data);
    });
  };

  loadTweets();
});