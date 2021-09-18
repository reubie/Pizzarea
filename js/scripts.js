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
  