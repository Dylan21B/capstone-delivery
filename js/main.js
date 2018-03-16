"use strict";
console.log("hello");

let time = require('./time.js'),
    $ = require('jquery'),
    db = require('./db-interaction'),
    login = require("./user"),
    templates = require('./dom-builder'),
    firebase = require('./fb-config');

time.displayMoment();

$("#login").click(function(){
    console.log("clicked on Signin");
    login.logInGoogle()
    .then((result) => {
      console.log("result from login", result.user.uid);
      login.setUser(result.user.uid);
      $("#login").addClass("is-hidden");
      $("#logout").removeClass("is-hidden");
    });
  });