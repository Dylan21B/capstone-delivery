"use strict";

let $ = require('jquery');

///////////////********************************************************************** *//////////////////

/////////////   DOM-BUILDER.JS CREATES THE PRINT FUNCTION AND POPULATES FORM ////////////////////////////////




////// loads list number 3 ////////////////////////////////////////////////
function makeDeliveryBig(deliveryList, id) {
    console.log("here is begining of big template",deliveryList);
    let $deliveryDisplay =
    $(`<div class="uiContainer__delivery--list box col s12">
    <ul class="delivery--list">
    </ul>
    </div>`);
    $(".uiContainer---wrapper").html($deliveryDisplay);
    // for (let delivery in deliveryList) {
    //     let currentDelivery = deliveryList[delivery],
    let deliveryListItem = $("<ul>", {class: "delivery--list__item"}),
        customer = $("<h1/>","Customer:", {class: "customer-name"}).text(deliveryList.customer),
        deliveryListData = $("<ul/>", {class: "delivery--list__item--data"}),
        deliveryListEdit = $("<a>", {"data-edit-id": id, class: "edit-btn btn-light btn-sm", text: "Edit"}),
        deliveryListDelete = $("<a>", {"data-delete-id": id, class: "delete-btn btn-outline-dark btn-sm", text: "Delete" });

    deliveryListData.append(
        `<ul class="list-group list-group-flush" id="deliveryTable">
        <li class="list-group-item">Date:  ${deliveryList.date}</li>
        <li class="list-group-item">Time:  ${deliveryList.time}</li>
        <li class="list-group-item">Phone:  ${deliveryList.number}</li>
        <li class="list-group-item">Address:  ${deliveryList.address}</li>
        <li class="list-group-item">Items:  ${deliveryList.items}</li>
        <li class="list-group-item">Employee Initials:  ${deliveryList.emInt}</li>
        </ul>`);


        //// location printed to
    $(".delivery--list").append(deliveryListItem.append(customer));
    $(".delivery--list").append(deliveryListItem.append(deliveryListData).append(deliveryListDelete).append(deliveryListEdit));
    // }
}



////// loads list nuber 2 //////////////////////////////////////////////////
function makeDelivery(deliveryList) {
    let $deliveryDisplay =
    $(`<div class="uiContainer__delivery-list box col s12">
    <ul class="delivery-list">
    </ul>
    </div>`);
    $(".uiContainer--wrapper").html($deliveryDisplay);
    for (let delivery in deliveryList) {
        let currentDelivery = deliveryList[delivery],
        deliveryListItem = $("<ul>", {class: "delivery-list__item"}),
        customer = $("<nav/>", {class: "customer-name", id: "cardNav"}).text(currentDelivery.customer),
        deliveryListData = $("<ul/>", {class: "delivery-list__item--data"}),
        deliveryListEdit = $("<a>", {"data-edit-id": delivery, class: "edit-btn btn-light btn-sm", text: "Edit"}),
        deliveryListDelete = $("<a>", {"data-delete-id": delivery, class: "delete-btn btn-secondary btn-sm", text: "Delete" }),
        deliveryListBig = $("<a>", {"data-big-id": delivery, class: "big-btn btn-secondary btn-sm", text: "Info" });

    deliveryListData.append(
        `<li>${currentDelivery.date}</li>
        <li>${currentDelivery.number}</li>
        <li>${currentDelivery.address}</li>`);

    $(".delivery-list").append(deliveryListItem.append(customer));
    $(".delivery-list").append(deliveryListItem.append(deliveryListData).append(deliveryListDelete).append(deliveryListEdit).append(deliveryListBig));
    }
}

///// loads list number 1 ///////////////////////////////////////////////////////
function makeDeliverySmall(deliveries) {
    let $deliveryDisplay =
    $(`<div class="uiContainer__delivery---list box col s12">
    <ul class="delivery---list">
    </ul>
    </div>`);
    $(".uiContainer----wrapper").html($deliveryDisplay);
    for (let delivery in deliveries) {
        let currentDelivery = deliveries[delivery],
        deliveryListItem = $("<ul>", {class: "todayDelivery1-list__item"}),
        customer = $("<span/>", {class: "customer-name"}).text(currentDelivery.customer),
        deliveryListData = $("<ul/>", {class: "delivery-list__item--data"}),
        deliveryListBig = $("<a>", {"data-big-id": delivery, class: "big-btn btn-info btn-sm", text: "Info" });

    deliveryListData.append(
        `<li>${currentDelivery.date}</li>`);

    $(".delivery---list").append(deliveryListItem.append(customer));
    $(".delivery---list").append(deliveryListItem.append(deliveryListData).append(deliveryListBig));
    }
}

////  Template for the delivery forum  //////////////////////////////////////////
function deliveryForm(delivery, deliveryId) {
    return new Promise(function (resolve, reject) {
        let deliveryItem = {
          customer: delivery ? delivery.customer : "",
          emInt: delivery ? delivery.emInt : "",
          number: delivery ? delivery.number : "",
          address: delivery ? delivery.address : "",
          date: delivery ? delivery.date : "",
          time: delivery ? delivery.time : "",
          items: delivery ? delivery.items : "",
          formTitle: delivery ? `Edit "${delivery.customer}"` : "Add new delivery",
          btnText: delivery ? "Save Changes" : "Save Delivery",
          btnId: delivery ? "save_edit_btn" : "save_new_btn"
        },
        form = 
        `<div id="newFormJump">
        <h3>${deliveryItem.formTitle}<h3>
        <div class="form-group col-lg-6" id="formLeft">
        <input type="text" class="form-control" id="form--emInt" placeholder="Employee" value="${deliveryItem.emInt}"></input><br>
        <input type="text" class="form-control" id="form--customer" placeholder="Customer" value="${deliveryItem.customer}"></input><br>
        <input type="text" class="form-control" id="form--number" placeholder="Number" value="${deliveryItem.number}"></input><br>
        <input type="text" class="form-control" id="form--address" placeholder="Address" value="${deliveryItem.address}"></input><br>
        <input type="date" class="form-control" id="form--date" placeholder="Date" value="${deliveryItem.date}"></input><br>
        <input type="text" class="form-control" id="form--time" placeholder="Time" value="${deliveryItem.time}"></input></div>
        <div class="form-group col-lg-6" id="formRight">
        <input type="text" id="form--items" class="form-control" placeholder="Items" value="${deliveryItem.items}"></input><br>
        <button id="${deliveryId}" class=${deliveryItem.btnId}>${deliveryItem.btnText}</button></div></div>`;
        resolve(form);
    });
}

module.exports = {
    makeDelivery,
    deliveryForm,
    makeDeliveryBig,
    makeDeliverySmall
};