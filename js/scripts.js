$ (document).ready(function() {
	// calcBtn click function
	$("#calcBtn").click(function() {	
	
		// start with no error messages displayed
		clearErrorMsg();
		var errorMsg="";
		
		// get entries from checked radio buttons. Display an error if nothing was selected.
		var size = document.querySelector('input[name="selectedSize"]:checked');
		var crust = document.querySelector('input[name="selectedCrust"]:checked');
		var sauce = document.querySelector('input[name="selectedSauce"]:checked');
		var cheese = document.querySelector('input[name="selectedCheese"]:checked');
		
		// get values of checked checkboxes (an array). Display an error if nothing was selected.
		var meat = $('#meatSelection input').filter(':checked').map(function() {
		  return this.nextElementSibling.innerHTML.trim();
		}).get();
		var veggie = $('#veggieSelection input').filter(':checked').map(function() {
		  return this.nextElementSibling.innerHTML.trim();
		}).get();
		
		// check for errors: all required except for meat and veggie
		if (isEmpty(size)) {
			if (errorMsg !== null && errorMsg!=="") {errorMsg = errorMsg + ",";}
			errorMsg = errorMsg + " size";
			document.getElementById("pizza-size-header").style.color = "#c4122f";
		};
		if (isEmpty(crust)) {
			if (errorMsg !== null && errorMsg!=="") {errorMsg = errorMsg + ",";}
			errorMsg = errorMsg + " crust";
			document.getElementById("crustBtn").style.color = "#c4122f";
		};
		if (isEmpty(sauce)) {
			if (errorMsg !== null && errorMsg!=="") {errorMsg = errorMsg + ",";}
			errorMsg = errorMsg + " sauce";
			document.getElementById("sauceBtn").style.color = "#c4122f";
		};
		if (isEmpty(cheese)) {
			if (errorMsg !== null && errorMsg!=="") {errorMsg = errorMsg + ",";}
			errorMsg = errorMsg + " cheese";
			document.getElementById("cheeseBtn").style.color = "#c4122f";
		};
		
		/* don't require meat or veggies
		if (isEmpty(meat)) {
			if (errorMsg !== null && errorMsg!=="") {errorMsg = errorMsg + ",";}
			errorMsg = errorMsg + " meat";
			document.getElementById("meatBtn").style.color = "#c4122f";
		};
		if (isEmpty(veggie)) {
			if (errorMsg !== null && errorMsg!=="") {errorMsg = errorMsg + ",";}
			errorMsg = errorMsg + " veggie";
			document.getElementById("veggieBtn").style.color = "#c4122f";
		};
		*/
				
		// construct final error message
		if (errorMsg!==null && errorMsg!=="") {
			errorMsg = "Please select at least one:" + errorMsg;
			addErrorMsg(errorMsg);
		};

		// if no errors, continue
		if (errorMsg==null || errorMsg=="") {
			// price arrays
			var arraySize = [
				{ price:6 }, 
				{ price:10 },	
				{ price:14 },
				{ price:16 }
			]
			var arrayCrust = [
				{ price:0 },
				{ price:0 },
				{ price:3 },
				{ price:0 },
				{ price:0 }
			]
			var arrayCheese = [
				{ price:0 },
				{ price:3 },
				{ price:0 }
			]
			
			// get selected item names and prices
			// -- from radio button groups
			var sizeName = size.nextElementSibling.innerHTML;		// OR, using jQuery:	var sizeName = $('input[name="selectedSize"]:checked + label').text();
			var sizePrice = arraySize[size.value].price;
			console.log(sizeName + " $" + sizePrice);
			
			var crustName = crust.nextElementSibling.innerHTML;	
			var crustPrice = arrayCrust[crust.value].price;
			console.log(crustName + " $" + crustPrice);
			
			var sauceName = sauce.nextElementSibling.innerHTML;	
			var saucePrice = 0;
			console.log(sauceName + " $" + saucePrice);
			
			var cheeseName = cheese.nextElementSibling.innerHTML;	
			var cheesePrice = arrayCheese[cheese.value].price;
			console.log(cheeseName + " $" + cheesePrice);
			
			// -- from checkbox groups
			var meatName = meat.join(", ");
			var meatPrice = meat.length - 1;
			if (meatPrice < 0) { meatPrice=0 };
			console.log(meatName + " $" + meatPrice);
			
			var veggieName = veggie.join(", ");
			var veggiePrice = veggie.length - 1;
			if (veggiePrice < 0) { veggiePrice=0 };
			console.log(veggieName + " $" + veggiePrice);
			
			// calc total
			var total = sizePrice + crustPrice + saucePrice + cheesePrice + meatPrice + veggiePrice;
			console.log("Total = $" + total);

			// put items and prices into the total form
			itemNames=document.getElementsByClassName("itemName");
			itemPrices=document.getElementsByClassName("itemPrice");
			itemTotal=document.getElementById("totalPrice");
			
			itemNames[0].innerHTML = sizeName + " Pizza";
			itemPrices[0].innerHTML = "$" + sizePrice.toFixed(2);
			
			itemNames[1].innerHTML = crustName;
			if (crustPrice > 0) {itemPrices[1].innerHTML = "$" + crustPrice.toFixed(2)};
			
			itemNames[2].innerHTML = sauceName;
			
			
			itemNames[3].innerHTML = cheeseName;
			if (cheesePrice > 0) {itemPrices[3].innerHTML = "$" + cheesePrice.toFixed(2)};
			
			itemNames[4].innerHTML = meatName;
			if (meatPrice > 0) {itemPrices[4].innerHTML = "$" + meatPrice.toFixed(2)};
			
			itemNames[5].innerHTML = veggieName;
			if (veggiePrice > 0) itemPrices[5].innerHTML = "$" + veggiePrice.toFixed(2);
			
			itemTotal.innerHTML = "$" + total.toFixed(2);
			
			// open the total form
			$("#orderTotalModal").modal()
		};
			
	});
	// end of calcBtn click function
	
	// used to test whether a selection was made
		function isEmpty(obj){	
			// obj will be an array if a checkbox was tested and a string if a radio button was tested
			if (Array.isArray(obj)) {
				if (obj.length == 0) { return true; }
				else { return false; }
			} else {
				if (obj==null || obj == "") { return true; }
				else if (obj.length === 0) { return true; }
				return false;
			};
		};
	
	// display error message
	function addErrorMsg(errorMsg) {
		$("#orderErrorMsg").text(errorMsg);			// OR: document.getElementById("orderErrorMsg").innerHTML = errorMsg;
		$("#orderErrorMsg").show();					// display the error div
	};

	// hide error message section and reset color on headers
	function clearErrorMsg() {
		$("#orderErrorMsg").hide();
		document.getElementById("pizza-size-header").style.color = "#231f20";
		document.getElementById("crustBtn").style.color = "#fff";
		document.getElementById("sauceBtn").style.color = "#fff";
		document.getElementById("cheeseBtn").style.color = "#fff";
		document.getElementById("meatBtn").style.color = "#fff";
		document.getElementById("veggieBtn").style.color = "#fff";
	};	
	
});

// Delivery function

function finalCost(){
	var foodItem = document.getElementById("food_item").value;
	var specialItemm = document.getElementById("special_item").value;
	var foodQuatity = document.getElementById("food_quantity").value;
	var deliveryType = document.getElementById("delivery_type").value;
	var deliveryArea = document.getElementById("delivery_area").value;

	var all_food = (parseInt(foodItem)*7) + (parseInt(specialItemm)*3) + ((foodQuatity)*2) + (parseInt(deliveryType)*4) + (parseInt(deliveryArea)*3)
	document.getElementById("result").innerHTML = all_food;
}
function ok_result(){
	document.getElementById("okResult").style.display="block";
	document.getElementById("okResult").style.backgroundColor="#DCE775";
	document.getElementById("input_box").style.display="none";
}






// Business Logic
var totalPriceArray = []; //Only global variable in code
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
    cartTotalPrice += totalPriceArray[arrayElement]; //////////////////////IMPORTANT!!! How to add contents of an array together
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
/////Landing Page Btns
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
});