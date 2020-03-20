const apiKey = 'MW9S-E7SL-26DU-VV8V';

function getStationDepartures(stnInput) {
    fetch(`http://api.bart.gov/api/etd.aspx?cmd=etd&key=${apiKey}&orig=${stnInput}&json=y`)
      .then(response => response.json())
      .then(responseJson => 
        console.log(responseJson));
  }

function displayDepartures(){
  
}
  
  function watchSubmit() {
    $('.js-search-form').submit(function(event){
      event.preventDefault();
  
      let userStnInput = $('.station-options').val();
  
      getStationDepartures(userStnInput);
    });
  }

  function runApp() {
      watchSubmit();
  }

  $(runApp);