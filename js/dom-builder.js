"use strict";

let $ = require('jquery');

///////////////********************************************************************** *//////////////////

/////////////   DOM-BUILDER.JS CREATES THE PRINT FUNCTION AND POPULATES FORM ////////////////////////////////

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
        deliveryListDelete = $("<a>", {"data-delete-id": delivery, class: "delete-btn btn-danger btn-sm", text: "Delete" });

    deliveryListData.append(
        `<li>${currentDelivery.date}</li>
        <li>${currentDelivery.number}</li>
        <li>${currentDelivery.address}</li>`);

    $(".delivery-list").append(deliveryListItem.append(customer));
    $(".delivery-list").append(deliveryListItem.append(deliveryListData).append(deliveryListDelete).append(deliveryListEdit));
    }
}

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
        <input type="text" id="form--emInt" placeholder="Employee" value="${deliveryItem.emInt}"></input>
        <input type="text" id="form--customer" placeholder="customer" value="${deliveryItem.customer}"></input><br>
        <input type="text" id="form--number" placeholder="number" value="${deliveryItem.number}"></input><br>
        <input type="text" id="form--address" placeholder="address" value="${deliveryItem.address}"></input><br>
        <input type="date" id="form--date" placeholder="date" value="${deliveryItem.date}"></input>
        <input type="text" id="form--time" placeholder="time" value="${deliveryItem.time}"></input>
        <button id="${deliveryId}" class=${deliveryItem.btnId}>${deliveryItem.btnText}</button>`;
        resolve(form);
    });
}

module.exports = {
    makeDelivery,
    deliveryForm
};