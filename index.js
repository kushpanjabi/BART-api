const apiKey = 'MW9S-E7SL-26DU-VV8V';

function getStationDepartures(stnInput) {
    fetch(`https://api.bart.gov/api/etd.aspx?cmd=etd&key=${apiKey}&orig=${stnInput}&json=y`)
      .then(response => response.json())
      .then(responseJson => 
        displayDepartures(responseJson));
  }

function displayDepartures(responseJson){
  console.log(responseJson);
  $('#search').empty();
  $('#search').append(`
    <p class="station-name">${responseJson.root.station[0].name} Trains<p>
    <p class="time inline">${responseJson.root.time}</p><hr>
    `)
  
    for (i=0; i<responseJson.root.station[0].etd.length; i++){
    $('#search').append(`
      <p class="destination">${responseJson.root.station[0].etd[i].destination} <img src="images/bart-logo-sm.png" alt="small bart logo" class="small-logo"></p>
      `)
      for (j=0; j<responseJson.root.station[0].etd[i].estimate.length; j++) {
        $('#search').append(`
      <p class="${responseJson.root.station[0].etd[i].estimate[j].color} lh">${responseJson.root.station[0].etd[i].estimate[j].minutes} mins</p>

    `)
    } 
    }
  
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