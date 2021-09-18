// Business Logic
var totalPriceArray = []; 
function Order (customSize, cheese) {
  this.customSize = customSize;
  this.sauce = 1;
  this.cheese = cheese;
  this.veggie1 = 1;
  this.veggie2 = 1;
  this.meat = 2;
  this.pizzaPrice = 0;
  this.sidePrice = 3;
}
Order.prototype.pizzaCost = function () {
	if (this.customSize === "Small 10 in.") {
	  this.pizzaPrice += 6;
	} else if (this.customSize === "Medium 14 in.") {
	  this.pizzaPrice += 9;
	} else if (this.customSize === "Large 18 in.") {
	  this.pizzaPrice += 12;
	}
	if (this.cheese === "cheese") {
	  this.pizzaPrice += 1;
	} else if (this.cheese === "light cheese") {
	  this.pizzaPrice += 0.5;
	} else if (this.cheese === "extra cheese") {
	  this.pizzaPrice += 1.5;
	}
	this.pizzaPrice += this.sauce;
	this.pizzaPrice += this.veggie1;
	this.pizzaPrice += this.veggie2;
	this.pizzaPrice += this.meat;
	return this.pizzaPrice;
  }

Order.prototype.sideCost = function () {
	return this.sidePrice;
  }
  Order.prototype.finalCost = function () {
	var cartTotalPrice = 0;
	for (var arrayElement = 0; arrayElement < totalPriceArray.length; arrayElement ++) {
	  cartTotalPrice += totalPriceArray[arrayElement];
	}
	return cartTotalPrice;
  }

function Address (streetAddress, city, state, zipcode) {
	this.streetAddress = streetAddress;
	this.city = city;
	this.state = state;
	this.zipcode = zipcode;
	this.deliveryAddress = (streetAddress + "  " + city + ", " + state + "  " + zipcode);
  }

  //User Interface Logic
$(document).ready(function(event) {

  $("#pickup-btn").click(function() {
    $("#order-content").show();
    $("#landing-content").hide();
    $("#delivery-option").text("PICKUP BY CUSTOMER");
  });
  $("#delivery-btn").click(function() {
    $("#address").show();
    $("#pickup-btn,#delivery-btn,#landing-tagline").hide();
  });
  $("form#address-form").submit(function(event) {
    event.preventDefault();
    var streetAddress = $("input#street-add").val();
    var city = $("input#city-add").val();
    var state = $("select#state-select").val();
    var zipcode = $("input#zip-add").val();
    var newAddress = new Address(streetAddress, city, state, zipcode)
    $("#order-content").show();
    $("#landing-content").hide();
    $("#delivery-option").text("DELIVER TO: " + newAddress.deliveryAddress);
  });
  $("form#custom-pizza").submit(function(event) {
    event.preventDefault();
    var customSize = $("select#size").val();
    var sauce = $("select#sauce").val();
    var cheese = $("select#cheese").val();
    var veggie1 = $("select#veggie1").val();
    var veggie2 = $("select#veggie2").val();
    var meat = $("select#meat").val();
    var pizzaDetails = (customSize + " - " + sauce + ", " + cheese + ", " + veggie1 + ", " + veggie2 + ", " + meat);
    var newPizzaOrder = new Order(customSize, cheese);
    newPizzaOrder.pizzaCost();
    totalPriceArray.push(newPizzaOrder.pizzaPrice);
    $("#pizza-details-dropdown").show();
    $("#final-cost").text(newPizzaOrder.finalCost());
    $("#pizza-details").append("<ul><li>" + pizzaDetails + "</li></ul>");
    $("#size, #sauce, #cheese, #veggie1, #veggie2, #meat").val("");
  });
  $("#pizza-details-dropdown").click(function() {
    $("#pizza-details").toggle();
  });

  /////Side Orders
var newSideOrder = new Order();
  $("#breadsticks").click(function() {
    newSideOrder.sideCost();
    totalPriceArray.push(newSideOrder.sidePrice);
    $("#final-cost").text(newSideOrder.finalCost());
    $("#sides-dropdown").show();
    $("#sides-details").append("<ul><li>" + "3 garlic breadsticks" + "</li></ul>");
  });
  $("#brownie").click(function() {
    newSideOrder.sideCost();
    totalPriceArray.push(newSideOrder.sidePrice);
    $("#final-cost").text(newSideOrder.finalCost());
    $("#sides-dropdown").show();
    $("#sides-details").append("<ul><li>" + "1 jumbo, double-chocolate brownie" + "</li></ul>");
  });
  $("#soda").click(function() {
    newSideOrder.sideCost();
    totalPriceArray.push(newSideOrder.sidePrice);
    $("#final-cost").text(newSideOrder.finalCost());
    $("#sides-dropdown").show();
    $("#sides-details").append("<ul><li>" + "16oz., root-beer italian soda" + "</li></ul>");
  });
  $("#sides-dropdown").click(function() {
    $("#sides-details").toggle();
  });

  ///Checkout Btn
  $("#checkout-btn").click(function() {
    location.reload();
  });

  $("#order-proceed-btn").click(function() {
    alert("Your order is on the way please be patient!!");
    location.reload();
  });
});