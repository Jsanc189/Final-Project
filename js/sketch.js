//brick wall art from Maksym Tarkhov @ https://www.vecteezy.com/vector-art/27493030-cartoon-brick-wall-of-red-color-castle-tile-square-seamless-pattern

let img;
let FOODLIB;

function preload() {
  //load image
  img = loadImage("img/brick_background.png");

  let xhreq = new XMLHttpRequest();
  xhreq.open("GET", "./js/food.json", false);
  xhreq.send(null);
  FOODLIB = JSON.parse(xhreq.responseText);
  console.log(FOODLIB);
}

function setup() {
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized
  $(window).resize(function () {
    console.log("Resizing...");
    resizeCanvas(canvasContainer.width(), canvasContainer.height());
  });
  //Draw the loaded image onto the canvas
  image(img, 0, 0, width, height);
  Food.setBase(0, 0, width, height);
  var f1 = new Food("bacon", 200, 150, 30, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f2 = new Food("cheese", 260,150, 30, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f3 = new Food("dough", 320, 150, 30, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f4 = new Food("cheesy-dough", 380, 150, 30, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f5 = new Food("cheesier-dough", 440, 150, 30, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f6 = new Food("goop", 500, 150, 30, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f7 = new Food("mushroom", 560, 150, 30, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f8 = new Food("pepperoni", 620, 150, 30, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f9 = new Food("pizza", 680, 150, 30, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f10 = new Food("pizza-dough", 740, 150, 30, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f12 = new Food("tomato", 800, 150, 30, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);


  
  var f13 = new Food("blender", 0.4, 0.4, 45, FOODLIB, [], "tool", "tools", 0, 0, width, height);
  var f14 = new Food("knife", 0.5, 0.4, 30, FOODLIB, [], "tool", "tools", 0, 0, width, height);
  var f15 = new Food("oven", 0.6, 0.4, 60, FOODLIB, [], "tool", "tools", 0, 0, width, height);
}

function draw() {
  imageMode(CORNER);
  image(img, 0, 0, width, height);
  imageMode(CENTER);
  Food.drag(0, 0, width, height);
  Food.draw(0, 0, width, height);
}
