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
    addUserFB
};