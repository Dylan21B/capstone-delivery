"use strict";
console.log("hello");

let time = require('./time.js'),
    $ = require('jquery'),
    db = require('./db-interaction'),
    login = require("./user"),
    templates = require('./dom-builder'),
    firebase = require('./fb-config');

time.displayMoment();

// Using firebase // Loads list number 2
function loadDeliveriesToDOM() {
    console.log("get those deliveries");
    let currentUser = login.getUser();
    db.getDeliveries(currentUser)
    .then((deliveryData) => {
      console.log("here are the deliveries", deliveryData);
      templates.makeDelivery(deliveryData);
    });
}

// Click to show large details below
$(document).on("click", ".big-btn", function() {
    console.log("1 you clicked info button");
    let currentDelivery = $(this).data("big-id");
    db.getDelivery(currentDelivery)
    .then((deliveryId) => {
        console.log("2 here is a single delivery", deliveryId, currentDelivery);
        // templates.makeDeliveryBig(deliveryId);
        // console.log("delivery is rendered", deliveryId);
        loadDeliveriesDetails(currentDelivery);
    });
});

/// Using firebase // Loads list number 3 the big one
function loadDeliveriesDetails(deliveryId) {
    console.log("3 get the big deliveries", deliveryId);
    let currentUser = login.getUser();
    db.getDelivery(currentUser)
    .then((deliveryId) => {
        console.log("4 big delivery", deliveryId);
        templates.makeDeliveryBig(deliveryId);
        console.log("5 here is the delivery now", deliveryId);
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
    console.log("pressed the edit buton");
    let deliveryID = $(this).data("edit-id");
    db.getDelivery(deliveryID)
    .then((delivery) => {
        return templates.deliveryForm(delivery, deliveryID);
    }).then((finishedForm) => {
      $(".uiContainer---wrapper").html(finishedForm);
      console.log("edit button worked");
    });
});

//Save edited deliveries to firebase then reload Dom with updated data
$(document).on("click", ".save_edit_btn", function () {
    console.log("pressed save edit");
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


$("#add-delivery").click(function() {
    console.log("clicked for new delivery");
    var documentForm = templates.deliveryForm()
    .then(function(deliveryForm) {
        $(".uiContainer---wrapper").html(deliveryForm);
        // $(document).ready(function(){
        //     // Add smooth scrolling to all links
        //     $("a").on('click', function(event) {
          
        //       // Make sure this.hash has a value before overriding default behavior
        //       if (this.hash !== "") {
        //         // Prevent default anchor click behavior
        //         event.preventDefault();
          
        //         // Store hash
        //         var hash = this.hash;
          
        //         // Using jQuery's animate() method to add smooth page scroll
        //         // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        //         $('html, body').animate({
        //           scrollTop: $(hash).offset().top
        //         }, 800, function(){
             
        //           // Add hash (#) to URL when done scrolling (default click behavior)
        //           window.location.hash = hash;
        //         });
        //       } // End if
        //     });
        //   });
    });
});

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