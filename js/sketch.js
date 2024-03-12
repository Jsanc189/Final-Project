//brick wall art from Maksym Tarkhov @ https://www.vecteezy.com/vector-art/27493030-cartoon-brick-wall-of-red-color-castle-tile-square-seamless-pattern

let img;
let oven;
let wtable;
let blender;
let knife;
let trash;
let pres_table;

let FOODLIB;

function preload() {
  //load image
  img = loadImage("img/brick_background.png");
  oven = loadImage("img/Oven.png");
  wtable = loadImage("img/work_table.png");
  blender = loadImage("img/blender.png");
  knife = loadImage("img/knife.png");
  trash = loadImage("img/trash.png");
  pres_table = loadImage("img/pres_table.png");

  let xhreq = new XMLHttpRequest();
  xhreq.open("GET", "./js/food.json", false);
  xhreq.send(null);
  FOODLIB = JSON.parse(xhreq.responseText);
  console.log(FOODLIB);

  Food.LoadImages(FOODLIB);
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
  var f1 = new Food("bacon", 20, 90, 4.5, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f2 = new Food("cheese", 26,90, 4.5, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f3 = new Food("dough", 32, 90, 4.5, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f4 = new Food("cheesy-dough", 38, 90, 4.5, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f5 = new Food("cheesier-dough", 44, 90, 4.5, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f6 = new Food("goop", 50, 90, 4.5, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f7 = new Food("mushroom", 56, 90, 4.5, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f8 = new Food("pepperoni", 62, 90, 4.5, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f9 = new Food("pizza", 68, 90, 4.5, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f10 = new Food("pizza-dough", 74, 90, 4.5, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f12 = new Food("tomato", 80, 90, 4.5, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);


  
  var f13 = new Food("blender", 50, 40, 3.5, FOODLIB, [], "tool", "tools", 0, 0, width, height);
  var f14 = new Food("knife", 79, 67, 2, FOODLIB, [], "tool", "tools", 0, 0, width, height);
  var f15 = new Food("oven", 75, 35, 10, FOODLIB, [], "tool", "tools", 0, 0, width, height);
  var f15 = new Food("trash", 92, 93, 7, FOODLIB, [], "tool", "tools", 0, 0, width, height);
  var f16 = new Food("pres_table", 17, 68, 6, FOODLIB, [], "tool", "tools", 0, 0, width, height);
}

var Img = function(img, x, y, w, h, xb, yb, wb, hb){
  //imageMode(CORNER);
  image(img, (xb + x*wb)/100,  (yb + y*hb)/100, (w*hb)/100, (h*hb)/100);
}

var ImgScale = function(img, x, y, s, xb, yb, wb, hb){
  //imageMode(CORNER);
  image(img, (xb + x*wb)/100,  (yb + y*hb)/100, (img.width*s*hb)/100000, (img.height*s*hb)/100000);
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
  Food.setBase(0, 0, W, H, 100);

  imageMode(CORNER);
  image(img, 0, 0, W, H);
  imageMode(CENTER);

  ImgScale(oven, 75, 35, 80, 0, 0, W, H);
  ImgScale(wtable, 66, 67, 65, 0, 0, W, H);
  ImgScale(blender, 50, 40, 60, 0, 0, W, H);
  ImgScale(knife, 80, 65, 60, 0, 0, W, H);
  ImgScale(trash, 92, 95, 70, 0, 0, W, H);
  ImgScale(pres_table, 17, 68, 60, 0, 0, W, H);

  Food.drag();
  Food.draw();


}
