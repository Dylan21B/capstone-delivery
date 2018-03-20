"use strict";

let $ = require('jquery'),
    firebase = require("./fb-config"),
    provider = new firebase.auth.GoogleAuthProvider();

//////////////// FIREBASE INTERACTIONS ////////////


function getFBDetails(user){
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}//user.json?orderBy="uid"&equalTo="${user}"`
    }).done((resolve) => {
        return resolve;
    }).fail((error) => {
        return error;
    });
}

function addUserFB(userObj){
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/user.json`,
        type: 'POST',
        data: JSON.stringify(userObj),
        dataType: 'json'
    }).done((fbID) => {
        return fbID;
    });
}

function updateUserFB(userObj){
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/user/${userObj.fbID}.json`,
        type: 'PUT',
        dtat: JSON.stringify(userObj),
        dataType: 'json'
    }).done((userID) => {
        return userID;
    });
}
//////////////////////////////////////////////////////////////


////////////////  GETTING AND SETTING DATA TO DB  ///////////////////

function getDeliveries(user) {
    return $.ajax({
        url:`${firebase.getFBsettings().databaseURL}/deliveries.json?orderBy="uid"&equalTo="${user}"`
    }).done((deliveryData) => {
        return deliveryData;
    });
}

function addDelivery(deliveryFormObj) {
    return $.ajax({
        url:`${firebase.getFBsettings().databaseURL}/deliveries.json`,
        type: 'POST',
        data: JSON.stringify(deliveryFormObj),
        dataType: 'json'
    }).done((deliveryId) =>{
        return deliveryId;
    });
}

function deleteDelivery(deliveryId) {
    return $.ajax( {
        url:`${firebase.getFBsettings().databaseURL}/deliveries/${deliveryId}.json`,
        method: "DELETE"
    }).done((data) => {
        return data;
    });
}

function getDelivery(deliveryId) {
    console.log("here is the problem");
    return $.ajax({
        url: `https://capstone-delivery-data.firebaseio.com/deliveries/${deliveryId}.json`
    }).done((deliveryData) => {
        return deliveryData;
    }).fail((error) => {
        return error;
    });
}

function editDelivery(deliveryFormObj, deliveryId) {
    return $.ajax({
        url: `https://crossorigin.me/https://capstone-delivery-data.firebaseio.com/deliveries/${deliveryId}.json`,
        type: 'PUT',
        data: JSON.stringify(deliveryFormObj)
    }).done((data) => {
        return data;
    });
}
// function createUser(userObj) {
//     return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
//         .catch(function(error) {
//             let errorCode = error.code;
//             let errorMessage = error.message;
//             console.log("error", errorCode, errorMessage);
//         });
// }

// function loginUser(userObj) {
//     return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
//        .catch(function (error) {
//            let errorCode = error.code;
//            let errorMessage = error.message;
//            console.log("error:", errorCode, errorMessage);
//        });
// }

module.exports= { getFBDetails,
    updateUserFB,
    addUserFB,
    getDeliveries,
    addDelivery,
    getDelivery,
    editDelivery,
    deleteDelivery
};