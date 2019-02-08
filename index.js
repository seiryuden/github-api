'use strict';


function displayResults(responseJson) {
 
  console.log("displayResults ran");
  console.log(responseJson);
  console.log(responseJson.html_url);
  console.log(responseJson.name);
  $('.repos-list').empty();
  $('#js-error-message').empty();
  

   for (let i=0; i < responseJson.length; i++ ){

    $('.repos-list').append(
      `<li>
      <h3><a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].name}</a></h3>
      </li>`);

   }
 
  $('#results').removeClass('hidden');
};

function getNews(query) {
  console.log("getNews ran");
  const url = `https://api.github.com/users/${query}/repos`

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  console.log("watchForm ran");
  $('form').submit(event => {
    event.preventDefault();
    const searchInput = $('.js-search-input').val();
    getNews(searchInput);
  });
}

$(watchForm);