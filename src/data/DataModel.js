const httpOptions = {
  headers: {'X-Mashape-Key': 'YOUR_API_KEY'}
};

const DataModel = function () {

  let numberOfGuests = 4;
  let observers = [];
  let listOfFoodItems = [];
 

  var FoodItem = function(id,name, price, quantity,used,wasted,wastedPrecentage, times_bought) {
  this.id = id
  this.name = name
  this.price = price
  this.quantity = quantity
  this.used = used
  this.wasted = wasted
  this.wastedPrecentage = wastedPrecentage
  this.times_bought = times_bought
  }

  var testFood1 = new FoodItem(0,"Milk", 1.5, "3",true,false,0, 9);
  var testFood2 = new FoodItem(1,"Bread", 1.05, "1",false,false,0, 4);
  var testFood3 = new FoodItem(2,"Cucumber", .07, "3",true,false,0, 2);
  var testFood4 = new FoodItem(3,"Chocolate", 1.25, "2",false,false,0, 1);
  var testFood5 = new FoodItem(4,"Mango", 3.5, "100",false,false,0, 3);

  listOfFoodItems.push(testFood1);
  listOfFoodItems.push(testFood2);
  listOfFoodItems.push(testFood3);
  listOfFoodItems.push(testFood4);
  listOfFoodItems.push(testFood5);

  this.getlistOfFoodItems = function () {
    console.log(listOfFoodItems)
    return listOfFoodItems;
  };

  let listofShoppingCart = [];
  
  this.getShoppingList = function() {
    var i;
    for (i = 0; i < listOfFoodItems.length; i++) { 
      if(listOfFoodItems[i].times_bought > 3){
        listofShoppingCart.push(listOfFoodItems[i])
      }
    }
    return listofShoppingCart;
  }

  this.deleteItem = function(id){
    var i;
    var j;
    /*for (i = 0; i < listOfFoodItems.length; i++) { 
      if(listOfFoodItems[i].id == id){
        console.log("this item will be removed: ")
        console.log(listOfFoodItems[i].name)
        console.log(listOfFoodItems[i].id)
        listOfFoodItems.splice(i,1)
      }
    }*/
    listOfFoodItems.splice(id,1)
    this.updateFoodList()
    for(j = 0; j < listOfFoodItems.length; j ++){
        console.log(j + "  List of items :  " + listOfFoodItems[j].name)
    }
    return listOfFoodItems;
  }

  this.updateFoodList = function(){
    var i; 
    for (i = 0; i < listOfFoodItems.length; i++) { 
      listOfFoodItems[i].id =i

    }
  }

  let sliderValue = 0;

  this.setSliderValue = function (value) {
    sliderValue = value;
    notifyObservers();
  };

  this.getSliderValue = function () {
    return sliderValue;
  };

  this.getItemName = function(id) {
    return listOfFoodItems[id].name;
  }

  this.getItemPrice = function(id) {
    return listOfFoodItems[id].price;
  }

  this.setNumberOfGuests = function (num) {
    numberOfGuests = num;
    notifyObservers();
  };

  this.getNumberOfGuests = function () {
    return numberOfGuests;
  };

  // API Calls

  this.getAllDishes = function () {
    const url = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search'
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }
  
  // API Helper methods

  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }
  
  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getAllDishes() API Error:', error.message || error)
      })
    } else {
      console.error('getAllDishes() API Error:', error.message || error)
    }
  }

  // Observer pattern

  this.addObserver = function (observer) {
    observers.push(observer);
  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());
  };
};

export const modelInstance = new DataModel();
