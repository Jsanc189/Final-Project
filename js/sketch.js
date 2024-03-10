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
  //image(img, 0, 0, width, height);
  Food.setBase(0, 0, width, height);
  var f1 = new Food("bacon", 200, 900, 45, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f2 = new Food("cheese", 260,900, 45, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f3 = new Food("dough", 320, 900, 45, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f4 = new Food("cheesy-dough", 380, 900, 45, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f5 = new Food("cheesier-dough", 440, 900, 45, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f6 = new Food("goop", 500, 900, 45, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f7 = new Food("mushroom", 560, 900, 45, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f8 = new Food("pepperoni", 620, 900, 45, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f9 = new Food("pizza", 680, 900, 45, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f10 = new Food("pizza-dough", 740, 900, 45, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f12 = new Food("tomato", 800, 900, 45, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);


  
  var f13 = new Food("blender", 400, 500, 45, FOODLIB, [], "tool", "tools", 0, 0, width, height);
  var f14 = new Food("knife", 500, 500, 30, FOODLIB, [], "tool", "tools", 0, 0, width, height);
  var f15 = new Food("oven", 600, 500, 60, FOODLIB, [], "tool", "tools", 0, 0, width, height);
}

function draw() {
  var ratio = 1.5;
  var Scale = 1;
  var W = width;
  var H = height;
  if(W/ratio > H){
    W = H*ratio;
  }else if(H*ratio > W){
    H = W/ratio;
  }
  Food.setBase(0, 0, W, H, 1000);

  imageMode(CORNER);
  image(img, 0, 0, W, H);
  imageMode(CENTER);
  Food.drag();
  Food.draw();
}
