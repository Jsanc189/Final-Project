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
  static CombosLib = null;


  constructor(name, x, y, r, allCombos, ingredients = []) {
    this.name = name; // name of food (string)
    this.ingredients = ingredients; // list of ingredients that make up food (List<Food>[])
    this.possibleCombos = {};
    if(!Food.CombosLib){
      Food.CombosLib = allCombos;
    }
    if(allCombos[name]){
      this.possibleCombos = allCombos[name].plus; // dictionary of combinations for the food item, with entries being the result (Dict {})
    }
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
  static merge(index){
    var Outcomes = [];
    for(var i = 0; i < Food.instances.length; i++){
      if(i !== index){
        if(dist(Food.instances[index].x, Food.instances[index].y, Food.instances[i].x, Food.instances[i].y) < Food.instances[i].r + Food.instances[index].r){
          var Outcome1 = Food.instances[i].getOutcome(Food.instances[index].name);
          var Outcome2 = Food.instances[index].getOutcome(Food.instances[i].name);
          console.log(Outcome1);
          console.log(Outcome2);
          if(Outcome1){
            Outcomes.push({name: Outcome1, i:i});
          }
          if(Outcome2){
            Outcomes.push({name: Outcome2, i:i});
          }
        }
      }
    }
    if(Outcomes.length > 0){
      var picked = random(Outcomes);
      var i1 = Food.instances[index];
      var i2 = Food.instances[picked.i];
      if(picked.i > index){
        Food.instances.splice(picked.i, 1);
        Food.instances.splice(index, 1);
      } else{
        Food.instances.splice(index, 1);
        Food.instances.splice(picked.i, 1);
      }
      var I = new Food(picked.name, i1.x, i1.y, i1.r, Food.CombosLib, [i1, i2]);
      console.log(I);
    }
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
    if(!mouseIsPressed && Food.dragHandler.dragging){
      Food.merge(Food.instances.length-1);
      Food.dragHandler.dragging = false;
    }
    if(Food.dragHandler.dragging){
      Food.dragHandler.hoverIndex = -1;
      Food.instances[Food.instances.length-1].x = mouseX + Food.dragHandler.xOffset;
      Food.instances[Food.instances.length-1].y = mouseY + Food.dragHandler.yOffset;
    }
  }
  static draw(){
    textAlign(CENTER, CENTER);
    textSize(7);
    for(var i = 0; i < Food.instances.length; i++){
      fill(255);
      if(i === Food.dragHandler.hoverIndex){
        fill(200);
      }
      if(Food.dragHandler.dragging && i === Food.instances.length - 1){
        fill(200);
      }
      ellipse(Food.instances[i].x, Food.instances[i].y, Food.instances[i].r*2, Food.instances[i].r*2);
      fill(0);
      text(Food.instances[i].name, Food.instances[i].x, Food.instances[i].y);
  
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
