"use strict";

let $ = require('jquery');

///////////////********************************************************************** *//////////////////

/////////////   DOM-BUILDER.JS CREATES THE PRINT FUNCTION AND POPULATES FORM ////////////////////////////////




////// loads list number 3 ////////////////////////////////////////////////
function makeDeliveryBig(deliveryList) {
    let $deliveryDisplay =
    $(`<div class="uiContainer__delivery--list box col s12">
    <ul class="delivery--list">
    </ul>
    </div>`);
    $(".uiContainer---wrapper").html($deliveryDisplay);
    for (let delivery in deliveryList) {
        let currentDelivery = deliveryList[delivery],
        deliveryListItem = $("<ul>", {class: "delivery--list__item"}),
        customer = $("<span/>", {class: "customer-name"}).text(currentDelivery.customer),
        deliveryListData = $("<ul/>", {class: "delivery--list__item--data"}),
        deliveryListEdit = $("<a>", {"data-edit-id": delivery, class: "edit--btn btn-light btn-sm", text: "Edit"}),
        deliveryListDelete = $("<a>", {"data-delete-id": delivery, class: "delete--btn btn-outline-dark btn-sm", text: "Delete" });

    deliveryListData.append(
        `<li>${currentDelivery.date}</li>
        <li>${currentDelivery.time}</li>
        <li>${currentDelivery.number}</li>
        <li>${currentDelivery.address}</li>
        <li>${currentDelivery.items}</li>
        <li>${currentDelivery.emInt}</li>`);


        //// location printed to
    $(".delivery--list").append(deliveryListItem.append(customer));
    $(".delivery--list").append(deliveryListItem.append(deliveryListData).append(deliveryListDelete).append(deliveryListEdit));
    }
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
        customer = $("<span/>", {class: "customer-name"}).text(currentDelivery.customer),
        deliveryListData = $("<ul/>", {class: "delivery-list__item--data"}),
        deliveryListEdit = $("<a>", {"data-edit-id": delivery, class: "edit-btn btn-light btn-sm", text: "Edit"}),
        deliveryListDelete = $("<a>", {"data-delete-id": delivery, class: "delete-btn btn-outline-dark btn-sm", text: "Delete" }),
        deliveryListBig = $("<a>", {"data-big-id": delivery, class: "big-btn btn-info btn-sm", text: "Info" });

    deliveryListData.append(
        `<li>${currentDelivery.date}</li>
        <li>${currentDelivery.number}</li>
        <li>${currentDelivery.address}</li>`);

    $(".delivery-list").append(deliveryListItem.append(customer));
    $(".delivery-list").append(deliveryListItem.append(deliveryListData).append(deliveryListDelete).append(deliveryListEdit).append(deliveryListBig));
    }
}

///// loads list number 1 ///////////////////////////////////////////////////////
function makeDeliverySmall(deliveryList) {
    let $deliveryDisplay =
    $(`<div class="uiContainer__delivery-list box col s12">
    <ul class="delivery-list">
    </ul>
    </div>`);
    $(".uiContainer----wrapper").html($deliveryDisplay);
    for (let delivery in deliveryList) {
        let currentDelivery = deliveryList[delivery],
        deliveryListItem = $("<ul>", {class: "delivery-list__item"}),
        customer = $("<span/>", {class: "customer-name"}).text(currentDelivery.customer),
        deliveryListData = $("<ul/>", {class: "delivery-list__item--data"}),
        deliveryListBig = $("<a>", {"data-big-id": delivery, class: "big-btn btn-info btn-sm", text: "Info" });

    deliveryListData.append(
        `<li>${currentDelivery.date}</li>
        <li>${currentDelivery.number}</li>
        <li>${currentDelivery.address}</li>`);

    $(".delivery-list").append(deliveryListItem.append(customer));
    $(".delivery-list").append(deliveryListItem.append(deliveryListData).append(deliveryListBig));
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
          btnText: delivery ? "save changes" : "save delivery",
          btnId: delivery ? "save_edit_btn" : "save_new_btn"
        },
        form = 
        `<h3>${deliveryItem.formTitle}<h3>
        <div class="form-group col-lg-6" id="formLeft">
        <input type="text" class="form-control" id="form--emInt" placeholder="Employee" value="${deliveryItem.emInt}"></input><br>
        <input type="text" class="form-control" id="form--customer" placeholder="customer" value="${deliveryItem.customer}"></input><br>
        <input type="text" class="form-control" id="form--number" placeholder="number" value="${deliveryItem.number}"></input><br>
        <input type="text" class="form-control" id="form--address" placeholder="address" value="${deliveryItem.address}"></input><br>
        <input type="date" class="form-control" id="form--date" placeholder="date" value="${deliveryItem.date}"></input><br>
        <input type="text" class="form-control" id="form--time" placeholder="time" value="${deliveryItem.time}"></input></div>
        <div class="form-group col-lg-6" id="formRight">
        <input id="form--items" class="form-control" placeholder="items" value="${deliveryItem.items}"></input><br>
        <button id="${deliveryId}" class=${deliveryItem.btnId}>${deliveryItem.btnText}</button></div>`;
        resolve(form);
    });
}

module.exports = {
    makeDelivery,
    deliveryForm,
    makeDeliveryBig
};