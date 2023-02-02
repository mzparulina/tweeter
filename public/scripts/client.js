/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    for (let i = 0; i < tweets.length; i++) {
      let $tweet = createTweetElement(tweets[i], i);
      $('.tweets-container').append($tweet);
    }
  };

  const createTweetElement = function(tweet, id) {
    const tweetHandle = tweet.user.handle;
    const tweetAvatar = tweet.user.avatars;
    const tweetName = tweet.user.name;
    const tweetBody = tweet.content.text;
    const d = new Date(Date.now());
    const date = Math.floor((d  - new Date(tweet.created_at)) / 1000 / 60 / 60 / 24);
    const tweetDate = date < 0 ? '' : date + ' days ago';


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
        <span class="date">${tweetDate}</span>
        <div id="twitterIcons">
          <span data-id="tweetID" class="heartClick"><i class="fa fa-heart" aria-hclassden="true"></i></span>
          <span class="retweetClick"><i class="fa fa-retweet" aria-hidden="true"></i></span>
          <span class="flagClick"><i class="fa fa-flag" aria-hidden="true"></i></span>
        </div>
      </footer>
    </article>`;

    return $tweet;
  };

  renderTweets(data);
  
});