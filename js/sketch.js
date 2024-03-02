//brick wall art from Maksym Tarkhov @ https://www.vecteezy.com/vector-art/27493030-cartoon-brick-wall-of-red-color-castle-tile-square-seamless-pattern

let img;
let FOODLIB;

function preload() {
  //load image
  img = loadImage("background.png");

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
  var f1 = new Food("bacon", 200, 1200, 30, FOODLIB);
  var f2 = new Food("cheese", 260,1200, 30, FOODLIB);
  var f3 = new Food("dough", 320, 1200, 30, FOODLIB);
  var f4 = new Food("cheesy-dough", 380, 1200, 30, FOODLIB);
  var f5 = new Food("cheesier-dough", 440, 1200, 30, FOODLIB);
  var f6 = new Food("goop", 500, 1200, 30, FOODLIB);
  var f7 = new Food("mushroom", 560, 1200, 30, FOODLIB);
  var f8 = new Food("pepperoni", 620, 1200, 30, FOODLIB);
  var f9 = new Food("pizza", 680, 1200, 30, FOODLIB);
  var f10 = new Food("pizza-dough", 740, 1200, 30, FOODLIB);
  var f12 = new Food("tomato", 800, 1200, 30, FOODLIB);
  var f13 = new Food("bender", 860, 1200, 30, FOODLIB);
  var f14 = new Food("knife", 920, 1200, 30, FOODLIB);
  var f15 = new Food("oven", 980, 1200, 30, FOODLIB);
}

function draw() {
  image(img, 0, 0, width, height);
  Food.drag();
  Food.draw();
}
