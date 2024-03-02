//brick wall art from Maksym Tarkhov @ https://www.vecteezy.com/vector-art/27493030-cartoon-brick-wall-of-red-color-castle-tile-square-seamless-pattern

let img;
let FOODLIB;

function preload() {
  //load image
  img = loadImage("background.png");

  let xhreq = new XMLHttpRequest();
  xhreq.open("GET", "./food.json", false);
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
}

function draw() {}
