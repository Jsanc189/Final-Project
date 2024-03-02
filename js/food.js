var Shift = function(arr, i){
  var tmp = arr[i];
  arr.splice(i,1);
  arr.push(tmp);
  return arr;
}

class Food {
  static dragHandler = {
    xOffset: 0,
    yOffset: 0,
    dragging: false,
    hoverIndex: -1
  };
  static instances = [];
  constructor(name, ingredients, possibleCombos, x, y, r) {
    this.name = name; // name of food (string)
    this.ingredients = ingredients; // list of ingredients that make up food (List<string>[])
    this.possibleCombos = possibleCombos; // dictionary of combinations for the food item, with entries being the result (Dict {})
    this.x = x;
    this.y = y;
    this.r = r;
    Food.instances.push(this);
  }
  getIngredients() {
    // returns the list of ingredients that make up the food item, if the food item is itself an ingredient, returns itself.
    if (this.ingredients.length == 0) return this.name;
    return this.ingredients;
  }

  // takes a Food objects name property (Food.name) as a parameter or cooking method (oven, blender, etc.)
  getOutcome(item) {
    // checks if it's a possible combo, if not returns null (we can change this later).
    if (!(item in this.possibleCombos)) return null;
    return this.possibleCombos[item]; // if a possible combo exists, returns a string of the name
  }
  static drag(){
    Food.dragHandler.hoverIndex = -1;
    for(var i = 0; i < Food.instances.length; i++){
      if(dist(mouseX, mouseY, Food.instances[i].x, Food.instances[i].y) < Food.instances[i].r){
        Food.dragHandler.hoverIndex = i;
      }
    }
    if(mouseIsPressed && Food.dragHandler.hoverIndex !== -1 && Food.dragHandler.dragging === false){
      Food.dragHandler.dragging = true;
      Shift(Food.instances, Food.dragHandler.hoverIndex);
      Food.dragHandler.xOffset = Food.instances[Food.instances.length-1].x - mouseX;
      Food.dragHandler.yOffset = Food.instances[Food.instances.length-1].y - mouseY;
    }
    if(!mouseIsPressed){
      Food.dragHandler.dragging = false;
    }
    if(Food.dragHandler.dragging){
      Food.dragHandler.hoverIndex = -1;
      Food.instances[Food.instances.length-1].x = mouseX + Food.dragHandler.xOffset;
      Food.instances[Food.instances.length-1].y = mouseY + Food.dragHandler.yOffset;
    }
  }
  static draw(){
    fill(0);
    text("hello", 30, 30);
    for(var i = 0; i < Food.instances.length; i++){
      fill(255);
      if(i === Food.dragHandler.hoverIndex){
        fill(200);
      }
      if(Food.dragHandler.dragging && i === Food.instances.length - 1){
        fill(200);
      }
      ellipse(Food.instances[i].x, Food.instances[i].y, Food.instances[i].r*2, Food.instances[i].r*2);
    }
  }
}

// These ideas are subject to change, these are just what I had in mind
// If remembering ingredients is important, we may need to also create JSON object for those too

// Ex.

// IngredientsDict = {
//     PepperoniPizza: ["Dough", "Cheese", "Pepperoni", "Oven"],
//     Sandwich: ...
//     ...
// }

// Example of what kind of object "ingredients" would look like

// Example of what kind of object "possibleCombos" looks like

// DoughCombos = {
//     Cheese: "Unbaked Cheese Pizza",
//     Oven: "Bread",
//     Cherry: "Unbaked Cherry Pie",
//     BlueBerry: "Unbaked Blueberry Pie",
// }
