class Food {
  constructor(name, ingredients, possibleCombos) {
    this.name = name; // name of food (string)
    this.ingredients = ingredients; // list of ingredients that make up food (List<string>[])
    this.possibleCombos = possibleCombos; // dictionary of combinations for the food item, with entries being the result (Dict {})
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
