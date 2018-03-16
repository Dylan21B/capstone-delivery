"use strict";
var moment = require('moment');
var date = moment().format('MM/DD/YYYY');

var NowMoment = moment();

function displayMoment() {
var eDisplayMoment = document.getElementById('displayMoment');
eDisplayMoment.innerHTML = NowMoment;
}

module.exports={displayMoment};