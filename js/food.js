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
  static Xbase = 0;
  static Ybase = 0;
  static Widthbase = 0;
  static Heightbase = 0;
  static Scale;



  static images = {};
  static LoadImages(data){
    for(const entry in data.ingredients){
      var Img;
      if(data.ingredients[entry].img !== ""){
        Img = loadImage(data.ingredients[entry].img);
      }
      Food.images[data.ingredients[entry].img] = Img;
    }
  }



  static setBase(Xbase, Ybase, Widthbase, Heightbase, Scale){
    Food.Xbase = Xbase;
    Food.Ybase = Ybase;
    Food.Widthbase = Widthbase;
    Food.Heightbase = Heightbase;
    Food.Scale = Scale;
  }

  constructor(name, x, y, r, allCombos, ingredients = [], type = "food", category = "ingredients", Xbase, Ybase, Widthbase, Heightbase) {
    this.name = name; // name of food (string)
    this.ingredients = ingredients; // list of ingredients that make up food (List<Food>[])
    this.possibleCombos = {};
    this.img = "";
    this.Img = null;
    //Food.Xbase = Xbase;
    //Food.Ybase = Ybase;
    //Food.Widthbase = Widthbase;
    //Food.Heightbase = Heightbase;
    if(!Food.CombosLib){
      Food.CombosLib = allCombos;
    }
    if(allCombos[category][name]){
      this.possibleCombos = allCombos[category][name].plus;
      this.img = allCombos[category][name].img // dictionary of combinations for the food item, with entries being the result (Dict {})
    }
    if(this.img !== ""){
      //this.Img = loadImage(this.img);
      this.Img = Food.images[this.img];
      console.log("loading: " + this.img);
    }
    this.x = x;
    this.y = y;
    this.r = r;
    this.type = type;
    Food.instances.push(this);
  }
  X() {
    return (Food.Xbase + this.x*Food.Widthbase)/Food.Scale;
  }
  Y() {
    return (Food.Ybase + this.y*Food.Heightbase)/Food.Scale;
  }
  setX(x) {
    return ((x*Food.Scale)-Food.Xbase)/Food.Widthbase;
  }
  setY(y) {
    return ((y*Food.Scale)-Food.Ybase)/Food.Heightbase;
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
  Over(px, py, img, x, y, w, h){
    if(img){
        if(alpha(img.get(((px-x+w/2)/w)*img.width, ((py-y+h/2)/w)*img.height)) > 0){
        return true;
      }
    }
    return false;

  }
  static merge(index){
    var Outcomes = [];
    for(var i = 0; i < Food.instances.length; i++){
      if(i !== index){
        if(dist(Food.instances[index].X(), Food.instances[index].Y(), Food.instances[i].X(), Food.instances[i].Y()) < (Food.instances[i].r*Food.Heightbase)/Food.Scale + (Food.instances[index].r*Food.Heightbase)/Food.Scale && Food.instances[index].type !== "icon" && Food.instances[i].type !== "icon"){
          if(Food.instances[i].name === "trash"){
            return false;
          }
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
        if(Food.instances[picked.i] && Food.instances[picked.i].type === "food"){
          Food.instances.splice(picked.i, 1);
        }
        if(Food.instances[index] && Food.instances[index].type === "food"){
          Food.instances.splice(index, 1);
        }
      } else{
        if(Food.instances[index] && Food.instances[index].type === "food"){
          Food.instances.splice(index, 1);
        }
        if(Food.instances[picked.i] && Food.instances[picked.i].type === "food"){
          Food.instances.splice(picked.i, 1);
        }
      }
      var I = new Food(picked.name, i1.x, i1.y, i1.r, Food.CombosLib, [i1, i2], "food", "ingredients", Food.Xbase, Food.Ybase, Food.Widthbase, Food.Heightbase);
      console.log(I);
    }
    return true;
  }
  static drag(){
    Food.dragHandler.hoverIndex = -1;
    for(var i = 0; i < Food.instances.length; i++){
      if((Food.instances[i].img && Food.instances[i].Over(mouseX, mouseY, Food.instances[i].Img, Food.instances[i].X(), Food.instances[i].Y(), (Food.instances[i].r*2*Food.Heightbase)/Food.Scale, (Food.instances[i].r*2*Food.Heightbase)/Food.Scale)) || (!Food.instances[i].img && dist(mouseX, mouseY, Food.instances[i].X(), Food.instances[i].Y()) < (Food.instances[i].r*Food.Heightbase)/Food.Scale) && Food.instances[i].type !== "tool"){
        Food.dragHandler.hoverIndex = i;
      }
    }
    if(mouseIsPressed && Food.dragHandler.hoverIndex !== -1 && Food.dragHandler.dragging === false && Food.instances[Food.dragHandler.hoverIndex].type === "food"){
      Food.dragHandler.dragging = true;
      Shift(Food.instances, Food.dragHandler.hoverIndex);
      Food.dragHandler.xOffset = Food.instances[Food.instances.length-1].X() - mouseX;
      Food.dragHandler.yOffset = Food.instances[Food.instances.length-1].Y() - mouseY;
      //console.log(Food.dragHandler.xOffset + ", " + Food.dragHandler.yOffset);
    }
    else if(mouseIsPressed && Food.dragHandler.hoverIndex !== -1 && Food.dragHandler.dragging === false && Food.instances[Food.dragHandler.hoverIndex].type === "icon"){
      Food.dragHandler.dragging = true;
      //Shift(Food.instances, Food.dragHandler.hoverIndex);
      var li = Food.instances[Food.dragHandler.hoverIndex];
      var tmp = new Food(li.name, li.x, li.y, li.r, Food.CombosLib, [], "food", "ingredients", Food.Xbase, Food.Ybase, Food.Widthbase, Food.Heightbase);
      Food.dragHandler.xOffset = Food.instances[Food.instances.length-1].X() - mouseX;
      Food.dragHandler.yOffset = Food.instances[Food.instances.length-1].Y() - mouseY;
      console.log(Food.dragHandler.xOffset + ", " + Food.dragHandler.yOffset);
      //console.log(Food.instances[Food.instances.length-1].x);
      //console.log(Food.instances[Food.instances.length-1].setX(Food.instances[Food.instances.length-1].X()));
    }
    if(!mouseIsPressed && Food.dragHandler.dragging){
      var outcome = Food.merge(Food.instances.length-1);
      if(outcome === false){
        Food.instances.splice(Food.instances.length-1, 1);
      }
      Food.dragHandler.dragging = false;
    }
    if(Food.dragHandler.dragging){
      Food.dragHandler.hoverIndex = -1;
      Food.instances[Food.instances.length-1].x = Food.instances[Food.instances.length-1].setX(mouseX) + Food.instances[Food.instances.length-1].setX(Food.dragHandler.xOffset);
      Food.instances[Food.instances.length-1].y = Food.instances[Food.instances.length-1].setY(mouseY) + Food.instances[Food.instances.length-1].setY(Food.dragHandler.yOffset);
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
      //fill(Food.instances[i].Over(mouseX, mouseY, Food.instances[i].Img, Food.instances[i].X(), Food.instances[i].Y(), (Food.instances[i].r*2*Food.Heightbase)/Food.Scale, (Food.instances[i].r*2*Food.Heightbase)/Food.Scale));
      if(!Food.instances[i].Img || Food.instances[i].type === "icon"){
        ellipse(Food.instances[i].X(), Food.instances[i].Y(), (Food.instances[i].r*2*Food.Heightbase)/Food.Scale, (Food.instances[i].r*2*Food.Heightbase)/Food.Scale);
        fill(0);
        text(Food.instances[i].name, Food.instances[i].X(), Food.instances[i].Y());
      }
      if(Food.instances[i].Img){
        image(Food.instances[i].Img, Food.instances[i].X(), Food.instances[i].Y(), (Food.instances[i].r*2*Food.Heightbase)/Food.Scale, (Food.instances[i].r*2*Food.Heightbase)/Food.Scale);
        //ellipse(x + Food.instances[i].x, y + height - Food.instances[i].y, 5, 5);
      }
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
