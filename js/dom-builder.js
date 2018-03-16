"use strict";

let $ = require('jquery');

function makeDelivery(deliveryList) {
    let $deliveryDisplay =
    $(`<div class="uiContainer__delivery-list box col s12">
    <ul class="delivery-list">
    </ul>
    </div>`);
    $(".uiContainer--wrapper").html($deliveryDisplay);
    for (let delivery in deliveryList) {
        let currentDelivery = deliveryList[delivery],
        deliveryListItem = $("<li>", {class: "delivery-list__item"}),
        customer = $("<span/>", {class: "customer-name"}).text(currentDelivery.customer),
        deliveryListData = $("<ul/>", {class: "delivery-list__item--data"}),
        deliveryListEdit = $("<a>", {"data-edit-id": delivery, class: "edit-btn waves-effect waves-light btn", text: "edit"}),
        deliveryListDelete = $("<a>", {"data-delete-id": delivery, class: "delete-btn waves-effect waves-light btn", text: "delete" });

    deliveryListData.append(
        `<li>${currentDelivery.name}</li>
        <li>${currentDelivery.phone}</li>
        <li>${currentDelivery.address}</li>`);

    $(".delivery-list").append(deliveryListItem.append(customer));
    $(".song-list").append(deliveryListItem.append(deliveryListData).append(deliveryListDelete).append(deliveryListEdit));
    }
}
