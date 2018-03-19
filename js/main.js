"use strict";
console.log("hello");

let time = require('./time.js'),
    $ = require('jquery'),
    db = require('./db-interaction'),
    login = require("./user"),
    templates = require('./dom-builder'),
    firebase = require('./fb-config');

time.displayMoment();

// Using firebase
function loadDeliveriesToDOM() {
    console.log("get those deliveries");
    let currentUser = login.getUser();
    db.getDeliveries(currentUser)
    .then((deliveryData) => {
      console.log("here are the deliveries", deliveryData);
      templates.makeDelivery(deliveryData);
    });
}

// Send newDelivery data to firebase db and then reload DOM with updated song data
$(document).on("click", ".save_new_btn", function() {
    let deliveryObj = buildDeliveryObj();
    db.addDelivery(deliveryObj)
    .then((deliveryId) => {
        console.log("new delivery:", deliveryId);
        loadDeliveriesToDOM();
    });
});

/// get delivery from firebase and then populate the form for editing
$(document).on("click", ".edit-btn", function () {
    let deliveryID = $(this).data("edit-id");
    db.getDelivery(deliveryID)
    .then((delivery) => {
        return templates.deliveryForm(delivery, deliveryID);
    }).then((finishedForm) => {
      $(".uiContainer--wrapper").html(finishedForm);
    });
});

//Save edited deliveries to firebase then reload Dom with updated data
$(document).on("click", ".save_edit-btn", function () {
    let deliveryObj = buildDeliveryObj(),
    deliveryID = $(this).attr("id");
    console.log("deliveryID", deliveryID);
    db.editDelivery(deliveryObj, deliveryID)
    .then((data) => {
        loadDeliveriesToDOM();
    });
});

//remove delivery then reload DOM without new song
$(document).on("click", ".delete-btn", function () {
    let deliveryID = $(this).data("delete-id");
    db.deleteDelivery(deliveryID).then(() => {
        loadDeliveriesToDOM();
    });
});


// Builds a song Object from form data.
function buildDeliveryObj() {
    let deliveryObj = {
        customer: $("#form--customer").val(),
        emInt: $("#form--emInt").val(),
        number: $("#form--number").val(),
        address: $("#form--address").val(),
        date: $("#form--date").val(),
        time: $("#form--time").val(),
        items: $("#form--items").val(),
        uid: login.getUser()
    };
    return deliveryObj;
}

$("#login").click(function(){
    console.log("clicked on Signin");
    login.logInGoogle()
    .then((result) => {
      console.log("result from login", result.user.uid);
      login.setUser(result.user.uid);
      $("#login").addClass("is-hidden");
      $("#logout").removeClass("is-hidden");
      console.log("User", result.user.displayName);
      loadDeliveriesToDOM();
    });
  });

  $("#logout").click(function(){
    console.log("logout clicked");
    login.logOut();
    $('#login').removeClass("is-hidden");
    $('#logout').addClass("is-hidden");
  });