//brick wall art from Maksym Tarkhov @ https://www.vecteezy.com/vector-art/27493030-cartoon-brick-wall-of-red-color-castle-tile-square-seamless-pattern
//audio from pixabay @ pxiabay.com/sound-effects/
let img;
let oven;
let wtable;
let blender;
let knife;
let trash;
let pres_table;
let yes = true;
let my_text;
let bg_music;

let grammar; //stores the text for reviews of food

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
  bg_music = loadSound('./audio/Streets_Of_Little_Italy.mp3')

  let xhreq = new XMLHttpRequest();
  xhreq.open("GET", "./js/food.json", false);
  xhreq.send(null);
  FOODLIB = JSON.parse(xhreq.responseText);
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

  bg_music.setVolume(0.5);
  window.addEventListener('click', playSong);
  //text for debugging
  my_text = loadGeneratedText("pizza", ["cheese", "goop", "pepperoni", "mushroom"]).Text;

  //Draw the loaded image onto the canvas
  //image(img, 0, 0, width, height);
  Food.setBase(0, 0, width, height);
  var f1 = new Food("bacon", 20 + 12, 90, 4.5, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f2 = new Food("cheese", 26 + 12,90, 4.5, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f3 = new Food("dough", 32 + 12, 90, 4.5, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f4 = new Food("goop", 38 + 12, 90, 4.5, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f5 = new Food("mushroom", 44 + 12, 90, 4.5, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f6 = new Food("pepperoni", 50 + 12, 90, 4.5, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  var f7 = new Food("tomato", 56 + 12, 90, 4.5, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  // var f8 = new Food("pepperoni", 62, 90, 4.5, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  // var f9 = new Food("pizza", 68, 90, 4.5, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  // var f10 = new Food("pizza-dough", 74, 90, 4.5, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);
  // var f12 = new Food("tomato", 80, 90, 4.5, FOODLIB, [], "icon", "ingredients", 0, 0, width, height);


  
  var f13 = new Food("blender", 50, 40, 3.5, FOODLIB, [], "tool", "tools", 0, 0, width, height);
  var f14 = new Food("knife", 79, 67, 2, FOODLIB, [], "tool", "tools", 0, 0, width, height);
  var f15 = new Food("oven", 78, 40, 5, FOODLIB, [], "tool", "tools", 0, 0, width, height);
  var f15 = new Food("trash", 92, 93, 7, FOODLIB, [], "tool", "tools", 0, 0, width, height);
  var f16 = new Food("pres_table", 17, 65, 6, FOODLIB, [], "tool", "tools", 0, 0, width, height);
}

var Img = function(img, x, y, w, h, xb, yb, wb, hb){
  //imageMode(CORNER);
  image(img, (xb + x*wb)/100,  (yb + y*hb)/100, (w*hb)/100, (h*hb)/100);
}

var ImgScale = function(img, x, y, s, xb, yb, wb, hb){
  //imageMode(CORNER);
  image(img, (xb + x*wb)/100,  (yb + y*hb)/100, (img.width*s*hb)/100000, (img.height*s*hb)/100000);
}

var TT = 0;
var I = 9;
var arr = [];
var currentReview = "";
function draw() {
  background(255);
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

  for(var i = 0; i < arr.length - 1; i++){
    line(Food.instances[I].X() + arr[i].x, Food.instances[I].Y() + arr[i].y, Food.instances[I].X() + arr[i+1].x, Food.instances[I].Y() + arr[i+1].y);
  }
  if(mouseIsPressed && TT < 0){
    //arr.push({x:mouseX - Food.instances[I].X(), y:mouseY - Food.instances[I].Y()});
    //console.log(arr);
    //console.log(H);
    //Food.SaveHoverImages(0,9);
    Food.SaveHoverImages(10,100);
    TT = 10;
  }
  TT--;
  //console.log(H);
  fill(0);
  review(currentReview, W, H);

}

function loadGeneratedText(food, toppings) {
  let randomIndex = Math.floor(Math.random() * toppings.length);
  let topping1 = toppings[randomIndex];
  randomIndex = Math.floor(Math.random() * toppings.length);
  let topping2 = toppings[randomIndex];
  var words = 
    {
        origin:{
            "rating": ["5 OUT OF 5 STARS!  #positive_event#.", 
                      "4 out of 5 stars.  #positive_event#.", 
                      "3 out of 5 stars.  #neutral_event#.",
                      "2 out of 5 stars.  #neutral_event#", 
                      "1 out of 5 stars.  #negative_event#.", 
                      "0 OUT OF 5 STARS!  #negative_event#" 
                     ],
            "positive_event": ["Enjoy a cozy Italian restaurant ambiance. #food# was topped with fresh #topping1#.  What a delight!",
                               "Picture a bustling pizzeria where skilled chefs craft pizzas in a roaring wood fired oven. The #food# tasted just premium!",
                               "Step into a trendy pizzeria with colorful, stunning pizzas!  Each bite of #food# tastes handcrafted with care and devotion.  Loved the fresh #topping1#!",
                               "Experience the classic taste of Naples with this #food# topped with #topping1# and #topping2#.  It's a taste of tradition, simple yet sublime.",
                               "From farm to table!  This place sources all its #topping1# and #topping2# from local farms.  Its a taste of the countrside with the #food#!" 
                            ],
            "neutral_event":  ["Nothing to special. The famed #topping1# was not up to the hype others built.",
                              "The #food# was kinda mid, nothing impressive",
                              "The #food# wasn't bad, but I've had better at different pizzaera.  The #topping1# and #topping2# were meh.",
                              "The #food# was good, but I think the price was a bit too high than what it's worth.  Maybe better #topping2# will change my mind",
                              "A not too expensive place to get a #food# if you don't want to pay too much for one. Kinda stale, but not bad to where you'll regret buying it"
                            ],
            "negative_event": ["Taking a bite of what appears to be a normal #food#, you're met with the unexpected texture of #topping1#. The shock was too much!",
                               "THIS PLACE IS THE WORST!  BURNDE MY #FOOD#! RUD CUSTOMER SERVICE! WILL NOT BE COMING BACK!!!! Also, just bad #topping1#",
                               "After indulging in what seemed like a casual #food# dinner at a local joint, you wake up in the middle of the night with food poisoing!  NEVER COMING BACK!",
                               "Soggy #food#.  The #topping1# was not fresh.  Won't be coming back....",
                               "Sad, limp crust on #food#.   It felt like it was frozen for a month before they microwaved and served it to me.  Gross."
                            ],
            "food":[food],
            "FOOD":[food.toUpperCase()],
            "topping1":[topping1],
            "topping2":[topping2]
        },
    };

    var traceryGrammar = tracery.createGrammar(words.origin);
    generatedText = traceryGrammar.flatten('#rating#');
    console.log("Generated Text:", generatedText);
    console.log("finished loading!");

    return{
      Text: generatedText
    };
}

function review(reviewText, width, height){
  let maxWidth = width/4;
  let y = height/14;
  let x = width/6;
  let fontSize = width/40;
  textSize(fontSize);

  // Split the text into words
  let words = reviewText.split(' ');
  let line = '';
 
  for (let i = 0; i < words.length; i++) {
    let testLine = line + words[i] + ' ';
    let testWidth = textWidth(testLine);
    if (testWidth > maxWidth) {
      text(line, x, y); // Draw the line
      line = words[i] + ' '; // Start a new line
      y += fontSize; // Move to the next line
    } else {
      line = testLine;
    }
 }
 text(line, x, y);
  //text(reviewText, 600, 300);

  setTimeout(function(){
    //clear();
  })
}

function playSong() {
  // Check if the song is loaded before playing
  if (bg_music.isLoaded()) {
    // Play the song
    bg_music.loop();
    // Remove the event listener after the user gesture
    window.removeEventListener('click', playSong);
  } else {
    console.log('Song is not loaded yet.');
  }
}
