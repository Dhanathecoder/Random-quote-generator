$(document).ready(function() {
  // Function to fetch the initial "Quote of the Day"
  function getQuoteOfTheDay() {
    var quoteAPI = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
    
    $.getJSON(quoteAPI)
      .done(function(json) {
        updateQuote(json);
      })
      .fail(function(jqxhr, textStatus, err) {
        errMsg(jqxhr, textStatus, err);
      });
  }

  // Function to update the quote on the page
  function updateQuote(json) {
    var quoteTxt = json.quoteText;
    var quoteAut = json.quoteAuthor;

    if (quoteAut === "") {
      quoteAut = "Anonymous";
    }

    var jsontext = JSON.stringify(quoteTxt).replace(/"/g, "");
    var jsonauthor = JSON.stringify(quoteAut).replace(/"/g, "");

    $('#quote-text').html(jsontext);
    $('#quote-author').html("- " + jsonauthor);
  }

  // Function to handle searching for quotes
  function searchQuotes(query) {
    var searchAPI = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
    var searchData = {
      method: 'getQuote',
      lang: 'en',
      format: 'jsonp',
      jsonp: '?'
    };

    // If the query is not empty, add it to the searchData object
    if (query) {
      searchData.quoteAuthor = query; // assuming query is author name
    }

    $.getJSON(searchAPI, searchData)
      .done(function(json) {
        updateQuote(json);
      })
      .fail(function(jqxhr, textStatus, err) {
        errMsg(jqxhr, textStatus, err);
      });
  }

  // Event listener for the initial "Quote of the Day" button
  $('#getquote').click(function() {
    getQuoteOfTheDay();
  });

  // Event listener for the search button
  $('#search').click(function() {
    var query = $('#author-topic-input').val();
    searchQuotes(query);
  });

  // Fetch initial "Quote of the Day" when the page loads
  getQuoteOfTheDay();
});

// Function to handle error messages
function errMsg(jqxhr, textStatus, err) {
  console.log("Request Failed: " + textStatus + ", " + err);
}
