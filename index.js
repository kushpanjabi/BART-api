'use strict';

const apiKey = 'MW9S-E7SL-26DU-VV8V';


// Fetches the BART API data for Real Time Estimates //

function getStationDepartures(stnInput) {
	fetch(`https://api.bart.gov/api/etd.aspx?cmd=etd&key=${apiKey}&orig=${stnInput}&json=y`)
		.then(response => response.json())
		.then(responseJson =>
			displayDepartures(responseJson))
		.catch(error => alert("Something went wrong. Try again later."));

}


// Displays the Real Time Departure information by station selected // 

function displayDepartures(responseJson) {
	$('#search').empty();
	$('#search').append(`
    <p class="station-name">${responseJson.root.station[0].name}<p>
    <p class="time inline">${responseJson.root.time}</p><hr>
    `)

	for (let i = 0; i < responseJson.root.station[0].etd.length; i++) {
		$('#search').append(`
      <p class="destination">${responseJson.root.station[0].etd[i].destination} <img src="images/bart-logo-sm.png" alt="small bart logo" class="small-logo"></p>
      `)
		for (let j = 0; j < responseJson.root.station[0].etd[i].estimate.length; j++) {
			$('#search').append(`
      <p class="${responseJson.root.station[0].etd[i].estimate[j].color} lh eta">${responseJson.root.station[0].etd[i].estimate[j].minutes} mins</p>
    `)
		}
	}
}

// Fetches the BART API data for advisories //

function getAdvisories() {
	fetch(`https://api.bart.gov/api/bsa.aspx?cmd=bsa&key=${apiKey}&json=y`)
		.then(response => response.json())
		.then(responseJsonAdv =>
			displayAdvisories(responseJsonAdv))
		.catch(error => alert("Something went wrong. Try again later."));

}


// Displays the current BART advisories //

function displayAdvisories(responseJsonAdv) {
	$('.advisory').append(`
  <ul>
    <li class="ls-circle"><p class=adv-text>${responseJsonAdv.root.bsa["0"].description["#cdata-section"]}</li></p>
  </ul>
  `)
}


// Listens for a submit button click, pulls data, and displays chosen station departure estimates //

function watchSubmit() {
	$('.js-search-form').submit(function (event) {
		event.preventDefault();

		const userStnInput = $('.station-options').val();

		if (userStnInput === "") {
			alert('You must select a station!')
		} else {
			getStationDepartures(userStnInput);
		}
	});
}

function runApp() {
	watchSubmit();
	getAdvisories();
}

$(runApp);