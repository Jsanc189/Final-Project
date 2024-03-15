var OnLine = function(x,y,x1,y1,x2,y2){
  return (x - x1)*(x2 - x1) + (y - y1)*(y2 - y1) > 0 && (x - x2)*(x1 - x2) + (y - y2)*(y1 - y2) > 0;
}
var lineS = function(x1,y1,x2,y2,x3,y3,x4,y4){
  if(abs(x1 - x3) < 0.0000001 && abs(y1 - y3) < 0.0000001 && abs(x2 - x4) < 0.0000001 && abs(y2 - y4) < 0.0000001){
    return {x:x1,y:y1,t: true};
  }
  if(abs(x1 - x4) < 0.0000001 && abs(y1 - y4) < 0.0000001 && abs(x2 - x3) < 0.0000001 && abs(y2 - y3) < 0.0000001){
    return {x:x1,y:y1,t: true};
  }
  var ua0 = ((y4 - y3)*(x2 - x1) - (x4 - x3)*(y2 - y1));
  var ua;
  if(ua0 !== 0){
    ua = ((x4 - x3)*(y1 - y3) - (y4 - y3)*(x1 - x3))/ua0;
  } else{
    return {x:0,y:0,t: false};
  }
  var x = x1 + ua*(x2-x1);
  var y = y1 + ua*(y2-y1);
  if(!x || !y){
      x = 0;
      y = 0;
  }
  if(OnLine(x, y, x1, y1, x2, y2) && OnLine(x, y, x3 ,y3 ,x4 ,y4)){
  stroke(0);
  ellipse(x, y, 2, 2);
  stroke(255, 0, 0);
    line(x1, y1, x2, y2);
  line(x3, y3, x4, y4);
  stroke(0);
  }
  return {x:x,y:y,t: OnLine(x, y, x1, y1, x2, y2) && OnLine(x, y, x3 ,y3 ,x4 ,y4)};
};
var lineS1 = function(x1,y1,x2,y2,x3,y3,x4,y4){
  if(abs(x1 - x3) < 0.0000001 && abs(y1 - y3) < 0.0000001 && abs(x2 - x4) < 0.0000001 && abs(y2 - y4) < 0.0000001){
    return {x:x1,y:y1,t: true};
  }
  if(abs(x1 - x4) < 0.0000001 && abs(y1 - y4) < 0.0000001 && abs(x2 - x3) < 0.0000001 && abs(y2 - y3) < 0.0000001){
    return {x:x1,y:y1,t: true};
  }
  var ua0 = ((y4 - y3)*(x2 - x1) - (x4 - x3)*(y2 - y1));
  var ua;
  if(ua0 !== 0){
    ua = ((x4 - x3)*(y1 - y3) - (y4 - y3)*(x1 - x3))/ua0;
  } else{
    return {x:0,y:0,t: false};
  }
  var x = x1 + ua*(x2-x1);
  var y = y1 + ua*(y2-y1);
  if(!x || !y){
      x = 0;
      y = 0;
  }
  return {x:x,y:y,t: OnLine(x, y, x3 ,y3 ,x4 ,y4)};
};
var lineS2 = function(x1,y1,x2,y2,x3,y3,x4,y4){
  if(abs(x1 - x3) < 0.0000001 && abs(y1 - y3) < 0.0000001 && abs(x2 - x4) < 0.0000001 && abs(y2 - y4) < 0.0000001){
    return {x:x1,y:y1,t: true};
  }
  if(abs(x1 - x4) < 0.0000001 && abs(y1 - y4) < 0.0000001 && abs(x2 - x3) < 0.0000001 && abs(y2 - y3) < 0.0000001){
    return {x:x1,y:y1,t: true};
  }
  var ua0 = ((y4 - y3)*(x2 - x1) - (x4 - x3)*(y2 - y1));
  var ua;
  if(ua0 !== 0){
    ua = ((x4 - x3)*(y1 - y3) - (y4 - y3)*(x1 - x3))/ua0;
  } else{
    return {x:0,y:0,t: false};
  }
  var x = x1 + ua*(x2-x1);
  var y = y1 + ua*(y2-y1);
  if(!x || !y){
      x = 0;
      y = 0;
  }
  return {x:x,y:y,t: OnLine(x, y, x1, y1, x2, y2)};
};
var lineC = function(x1,y1,x2,y2,x3,y3,r){
  var cx = x2-x1;
  var cy = y2-y1;
  var d1 = dist(x1,y1,x2,y2);
  //line(x3, y3, x3 + cy, y3 - cx);
  //x=sqrt(r^2-y^2)
  var p = lineS2(x1,y1,x2,y2, x3, y3, x3 + cy, y3 - cx);
  var d = dist(x3, y3, p.x, p.y);
  var s = sqrt(abs((r*r)-(d*d)));
  var t = (p.t && d <= r);
  var p1;
  var p2;
  if(d1 === 0){
    p1 = {x:p.x, y: p.y}
    p2 = {x:p.x, y: p.y}
  } else{
    p1 = {x:p.x - (cx/d1)*s, y: p.y - (cy/d1)*s}
    p2 = {x:p.x + (cx/d1)*s, y: p.y + (cy/d1)*s}
  }
  //fill(0);
  //ellipse(p1.x, p1.y, 2, 2);
  //fill(255, 0, 0);
  //ellipse(p2.x, p2.y, 2, 2);
  var t2 = OnLine(p1.x, p1.y, x1,y1,x2,y2);
  return {x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, t: t2 && (t || dist(x2, y2, x3, y3) <= r)};
}
var inside = function(x, y, r, shape){
  noFill();
  beginShape();
  for(var i = 0; i < shape.length; i++){
    vertex(shape[i].x + 100, shape[i].y + 100);
  }
  if(shape.length > 0){
    vertex(shape[0].x + 100, shape[0].y + 100);
  }
  endShape();
  var count = 0;
  for(var i = 0; i < shape.length; i++){
    var ip = i + 1;
    if(i >= shape.length - 1){
      ip = 0;
    }
    //if(lineS(x, y, x, -99999999, shape[i].x, shape[i].y, shape[ip].x, shape[ip].y).t){
      //count++;
    //}
    if(lineC(shape[i].x, shape[i].y, shape[ip].x, shape[ip].y, x, y, r).t || dist(shape[i].x, shape[i].y, x, y) < r){
      return true;
    }
    //line(shape[i].x, shape[i].y, shape[ip].x, shape[ip].y);
    //lineS(x, y, x, -99999999, shape[i].x, shape[i].y, shape[ip].x, shape[ip].y);
  }
  //if(count%2 !== 0){
  //  return true;
  //}
  
  
  
  ellipse(x + 100, y + 100, r*2, r*2);
  return false;
}
//Food.instances[i].X() + (col[o].x*Food.Heightbase)/tmp
var inside2 = function(x, y, x2, y2, r, shape, HB, TMP){
  //noFill();
  //beginShape();
  for(var i = 0; i < shape.length; i++){
    //vertex(x2 + (shape[i].x*HB)/TMP, y2 + (shape[i].y*HB)/TMP);
  }
  if(shape.length > 0){
    //vertex(x2 + (shape[0].x*HB)/TMP, y2 + (shape[0].y*HB)/TMP);
  }
  //endShape();
  var count = 0;
  for(var i = 0; i < shape.length; i++){
    var ip = i + 1;
    if(i >= shape.length - 1){
      ip = 0;
    }
    //if(lineS(x, y, x, -99999999, shape[i].x, shape[i].y, shape[ip].x, shape[ip].y).t){
      //count++;
    //}
    if(lineC(x2 + (shape[i].x*HB)/TMP, y2 + (shape[i].y*HB)/TMP, x2 + (shape[ip].x*HB)/TMP, y2 + (shape[ip].y*HB)/TMP, x, y, r).t || dist(x2 + (shape[i].x*HB)/TMP, y2 + (shape[i].y*HB)/TMP, x, y) < r){
      return true;
    }
    //line(shape[i].x, shape[i].y, shape[ip].x, shape[ip].y);
    //lineS(x, y, x, -99999999, shape[i].x, shape[i].y, shape[ip].x, shape[ip].y);
  }
  //if(count%2 !== 0){
  //  return true;
  //}
  
  
  
  //ellipse(x2, y2, r*3, r*3);
  return false;
}

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
  static colliders = {
    blender: {height: 594.6666666666666, array:[
    {
        "x": -66,
        "y": 120.13333333333335
    },
    {
        "x": -67,
        "y": 103.13333333333335
    },
    {
        "x": -57,
        "y": 88.13333333333335
    },
    {
        "x": -42,
        "y": 76.13333333333335
    },
    {
        "x": -28,
        "y": 68.13333333333335
    },
    {
        "x": -24,
        "y": 65.13333333333335
    },
    {
        "x": -31,
        "y": 20.133333333333354
    },
    {
        "x": -37,
        "y": -5.866666666666646
    },
    {
        "x": -43,
        "y": -11.866666666666646
    },
    {
        "x": -47,
        "y": -20.866666666666646
    },
    {
        "x": -43,
        "y": -21.866666666666646
    },
    {
        "x": -41,
        "y": -28.866666666666646
    },
    {
        "x": -36,
        "y": -33.866666666666646
    },
    {
        "x": -30,
        "y": -33.866666666666646
    },
    {
        "x": -20,
        "y": -34.866666666666646
    },
    {
        "x": -15,
        "y": -41.866666666666646
    },
    {
        "x": -11,
        "y": -40.866666666666646
    },
    {
        "x": 0,
        "y": -39.866666666666646
    },
    {
        "x": 4,
        "y": -33.866666666666646
    },
    {
        "x": 15,
        "y": -31.866666666666646
    },
    {
        "x": 21,
        "y": -25.866666666666646
    },
    {
        "x": 24,
        "y": -17.866666666666646
    },
    {
        "x": 32,
        "y": -12.866666666666646
    },
    {
        "x": 38,
        "y": -1.8666666666666458
    },
    {
        "x": 42,
        "y": 11.133333333333354
    },
    {
        "x": 42,
        "y": 23.133333333333354
    },
    {
        "x": 40,
        "y": 34.133333333333354
    },
    {
        "x": 37,
        "y": 42.133333333333354
    },
    {
        "x": 31,
        "y": 49.133333333333354
    },
    {
        "x": 27,
        "y": 53.133333333333354
    },
    {
        "x": 19,
        "y": 53.133333333333354
    },
    {
        "x": 18,
        "y": 64.13333333333335
    },
    {
        "x": 22,
        "y": 68.13333333333335
    },
    {
        "x": 31,
        "y": 69.13333333333335
    },
    {
        "x": 38,
        "y": 75.13333333333335
    },
    {
        "x": 41,
        "y": 88.13333333333335
    },
    {
        "x": 43,
        "y": 98.13333333333335
    },
    {
        "x": 42,
        "y": 110.13333333333335
    },
    {
        "x": -4,
        "y": 128.13333333333335
    },
    {
        "x": -68,
        "y": 118.13333333333335
    },
    {
        "x": 3,
        "y": 80
    },
    {
        "x": 2,
        "y": 0
    },
    {
        "x": 1,
        "y": 80
    }
  ]},
  pres_table: {height: 578.222, array:[
    {
        "x": -85.42279685121107,
        "y": 37.155700000000024
    },
    {
        "x": -53.410506193771624,
        "y": 44.155700000000024
    },
    {
        "x": -25.399751868512098,
        "y": 48.155700000000024
    },
    {
        "x": 6.612538788927338,
        "y": 48.155700000000024
    },
    {
        "x": 37.6244453633218,
        "y": 46.155700000000024
    },
    {
        "x": 71.63750418685123,
        "y": 39.155700000000024
    },
    {
        "x": 94.64633809688581,
        "y": 30.155700000000024
    },
    {
        "x": 112.65325159169552,
        "y": 18.155700000000024
    },
    {
        "x": 117.65517200692042,
        "y": 6.155700000000024
    },
    {
        "x": 114.65401975778545,
        "y": -3.8442999999999756
    },
    {
        "x": 104.65017892733565,
        "y": -13.844299999999976
    },
    {
        "x": 90.6448017647059,
        "y": -21.844299999999976
    },
    {
        "x": 60.63327927335641,
        "y": -30.844299999999976
    },
    {
        "x": 29.62137269896195,
        "y": -36.844299999999976
    },
    {
        "x": -1.39053387543251,
        "y": -37.844299999999976
    },
    {
        "x": -35.40359269896193,
        "y": -35.844299999999976
    },
    {
        "x": -79.42049235294117,
        "y": -27.844299999999976
    },
    {
        "x": -111.43278301038062,
        "y": -13.844299999999976
    },
    {
        "x": -125.43816017301037,
        "y": -1.8442999999999756
    },
    {
        "x": -127.43892833910034,
        "y": 5.155700000000024
    },
    {
        "x": -122.43700792387543,
        "y": 16.155700000000024
    },
    {
        "x": -104.43009442906573,
        "y": 30.155700000000024
    },
    {
        "x": -83.4220286851211,
        "y": 37.155700000000024
    },
    {
        "x": -91.42510134948097,
        "y": -3.8442999999999756
    },
    {
        "x": -55.41127435986158,
        "y": -15.844299999999976
    },
    {
        "x": 46.627902110726666,
        "y": -11.844299999999976
    },
    {
        "x": 83.64211318339102,
        "y": 2.1557000000000244
    },
    {
        "x": 76.63942460207613,
        "y": 20.155700000000024
    },
    {
        "x": 42.62636577854673,
        "y": 26.155700000000024
    },
    {
        "x": -53.410506193771624,
        "y": 12.155700000000024
    }
  ]},
  knife: {height: 578.222, array:[
    {
        "x": 18.076940380622773,
        "y": 20.591260000000034
    },
    {
        "x": 25.079628961937715,
        "y": 27.591260000000034
    },
    {
        "x": 35.08346979238752,
        "y": 38.591260000000034
    },
    {
        "x": 43.08654245674734,
        "y": 48.591260000000034
    },
    {
        "x": 47.088078788927305,
        "y": 53.591260000000034
    },
    {
        "x": 51.08961512110727,
        "y": 50.591260000000034
    },
    {
        "x": 50.08923103806228,
        "y": 44.591260000000034
    },
    {
        "x": 42.08615837370235,
        "y": 32.591260000000034
    },
    {
        "x": 26.080013044982707,
        "y": 14.591260000000034
    },
    {
        "x": 14.07540404844292,
        "y": 0.5912600000000339
    },
    {
        "x": -1.930741280276834,
        "y": -15.408739999999966
    },
    {
        "x": -10.934198027681646,
        "y": -24.408739999999966
    },
    {
        "x": -18.93727069204158,
        "y": -28.408739999999966
    },
    {
        "x": -21.938422941176555,
        "y": -28.408739999999966
    },
    {
        "x": -24.939575190311416,
        "y": -28.408739999999966
    },
    {
        "x": -24.939575190311416,
        "y": -25.408739999999966
    },
    {
        "x": -21.938422941176555,
        "y": -16.408739999999966
    },
    {
        "x": -14.935734359861613,
        "y": -5.408739999999966
    },
    {
        "x": -0.9303571972318423,
        "y": 14.591260000000034
    },
    {
        "x": 8.07309955017297,
        "y": 25.591260000000034
    },
    {
        "x": 18.076940380622773,
        "y": 19.591260000000034
    },
    {
        "x": -14.935734359861613,
        "y": -19.408739999999966
    }
]},
trash: {height: 578.222, array:[
  {
      "x": -45.65752955017308,
      "y": 40.253540000000044
  },
  {
      "x": -49.659065882352934,
      "y": 16.253540000000044
  },
  {
      "x": -54.66098629757789,
      "y": -11.746459999999956
  },
  {
      "x": -48.65868179930794,
      "y": -30.746459999999956
  },
  {
      "x": -37.65445688581315,
      "y": -36.746459999999956
  },
  {
      "x": -25.64984788927336,
      "y": -40.746459999999956
  },
  {
      "x": -12.644854809688582,
      "y": -43.746459999999956
  },
  {
      "x": 6.362442768166034,
      "y": -43.746459999999956
  },
  {
      "x": 24.36935626297577,
      "y": -39.746459999999956
  },
  {
      "x": 36.37396525951556,
      "y": -35.746459999999956
  },
  {
      "x": 46.37780608996536,
      "y": -29.746459999999956
  },
  {
      "x": 51.37972650519032,
      "y": -23.746459999999956
  },
  {
      "x": 52.38011058823531,
      "y": -13.746459999999956
  },
  {
      "x": 52.38011058823531,
      "y": -2.7464599999999564
  },
  {
      "x": 47.37819017301035,
      "y": 24.253540000000044
  },
  {
      "x": 44.37703792387538,
      "y": 39.253540000000044
  },
  {
      "x": -45.65752955017308,
      "y": 39.253540000000044
  },
  {
      "x": -27.650616055363344,
      "y": 14.253540000000044
  },
  {
      "x": -26.650231972318352,
      "y": -15.746459999999956
  },
  {
      "x": 29.37127667820073,
      "y": -18.746459999999956
  },
  {
      "x": 29.37127667820073,
      "y": 14.253540000000044
  },
  {
      "x": -3.64139806228377,
      "y": 19.253540000000044
  },
  {
      "x": -1.6406298961937864,
      "y": -23.746459999999956
  }
]},
oven: {height: 578.222, array:[
  {
      "x": -124.30772615916965,
      "y": 40.71120000000002
  },
  {
      "x": -125.30811024221464,
      "y": 12.71120000000002
  },
  {
      "x": -121.30657391003467,
      "y": -15.28879999999998
  },
  {
      "x": -114.30388532871984,
      "y": -43.28879999999998
  },
  {
      "x": -102.29927633217994,
      "y": -72.28879999999998
  },
  {
      "x": -89.29428325259516,
      "y": -98.28879999999998
  },
  {
      "x": -68.28621750865057,
      "y": -118.28879999999998
  },
  {
      "x": -42.27623134948101,
      "y": -131.28879999999998
  },
  {
      "x": -16.26624519031145,
      "y": -137.28879999999998
  },
  {
      "x": 12.744893217992967,
      "y": -137.28879999999998
  },
  {
      "x": 40.75564754325251,
      "y": -129.28879999999998
  },
  {
      "x": 65.76524961937707,
      "y": -115.28879999999998
  },
  {
      "x": 87.77369944636666,
      "y": -97.28879999999998
  },
  {
      "x": 100.77869252595144,
      "y": -71.28879999999998
  },
  {
      "x": 111.78291743944635,
      "y": -43.28879999999998
  },
  {
      "x": 119.78599010380617,
      "y": -13.28879999999998
  },
  {
      "x": 122.78714235294115,
      "y": 10.71120000000002
  },
  {
      "x": 122.78714235294115,
      "y": 38.71120000000002
  },
  {
      "x": -124.30772615916965,
      "y": 40.71120000000002
  },
  {
      "x": -75.28890608996551,
      "y": 2.7112000000000194
  },
  {
      "x": -68.28621750865057,
      "y": -57.28879999999998
  },
  {
      "x": -56.28160851211078,
      "y": -87.28879999999998
  },
  {
      "x": -28.27085418685124,
      "y": -101.28879999999998
  },
  {
      "x": 9.743740968858106,
      "y": -103.28879999999998
  },
  {
      "x": 36.754111211072654,
      "y": -85.28879999999998
  },
  {
      "x": 58.762561038062245,
      "y": -73.28879999999998
  },
  {
      "x": 70.76717003460203,
      "y": -49.28879999999998
  },
  {
      "x": 82.77177903114182,
      "y": -24.28879999999998
  },
  {
      "x": 92.77561986159162,
      "y": 10.71120000000002
  },
  {
      "x": 46.75795204152246,
      "y": 12.71120000000002
  },
  {
      "x": -50.27930401384094,
      "y": 18.71120000000002
  },
  {
      "x": -98.29774000000009,
      "y": -15.28879999999998
  },
  {
      "x": -36.27392685121117,
      "y": -38.28879999999998
  },
  {
      "x": -23.268933771626394,
      "y": -67.28879999999998
  },
  {
      "x": 9.743740968858106,
      "y": -68.28879999999998
  },
  {
      "x": 33.75295896193768,
      "y": -45.28879999999998
  },
  {
      "x": 45.757567958477466,
      "y": -19.28879999999998
  },
  {
      "x": -42.27623134948101,
      "y": -9.28879999999998
  },
  {
      "x": -4.261636193771665,
      "y": -43.28879999999998
  }
]}
};
/*
[
  {
      "x": -85.42279685121107,
      "y": 37.155700000000024
  },
  {
      "x": -53.410506193771624,
      "y": 44.155700000000024
  },
  {
      "x": -25.399751868512098,
      "y": 48.155700000000024
  },
  {
      "x": 6.612538788927338,
      "y": 48.155700000000024
  },
  {
      "x": 37.6244453633218,
      "y": 46.155700000000024
  },
  {
      "x": 71.63750418685123,
      "y": 39.155700000000024
  },
  {
      "x": 94.64633809688581,
      "y": 30.155700000000024
  },
  {
      "x": 112.65325159169552,
      "y": 18.155700000000024
  },
  {
      "x": 117.65517200692042,
      "y": 6.155700000000024
  },
  {
      "x": 114.65401975778545,
      "y": -3.8442999999999756
  },
  {
      "x": 104.65017892733565,
      "y": -13.844299999999976
  },
  {
      "x": 90.6448017647059,
      "y": -21.844299999999976
  },
  {
      "x": 60.63327927335641,
      "y": -30.844299999999976
  },
  {
      "x": 29.62137269896195,
      "y": -36.844299999999976
  },
  {
      "x": -1.39053387543251,
      "y": -37.844299999999976
  },
  {
      "x": -35.40359269896193,
      "y": -35.844299999999976
  },
  {
      "x": -79.42049235294117,
      "y": -27.844299999999976
  },
  {
      "x": -111.43278301038062,
      "y": -13.844299999999976
  },
  {
      "x": -125.43816017301037,
      "y": -1.8442999999999756
  },
  {
      "x": -127.43892833910034,
      "y": 5.155700000000024
  },
  {
      "x": -122.43700792387543,
      "y": 16.155700000000024
  },
  {
      "x": -104.43009442906573,
      "y": 30.155700000000024
  },
  {
      "x": -83.4220286851211,
      "y": 37.155700000000024
  },
  {
      "x": -91.42510134948097,
      "y": -3.8442999999999756
  },
  {
      "x": -55.41127435986158,
      "y": -15.844299999999976
  },
  {
      "x": 46.627902110726666,
      "y": -11.844299999999976
  },
  {
      "x": 83.64211318339102,
      "y": 2.1557000000000244
  },
  {
      "x": 76.63942460207613,
      "y": 20.155700000000024
  },
  {
      "x": 42.62636577854673,
      "y": 26.155700000000024
  },
  {
      "x": -53.410506193771624,
      "y": 12.155700000000024
  }
]











[
    {
        "x": 18.076940380622773,
        "y": 20.591260000000034
    },
    {
        "x": 25.079628961937715,
        "y": 27.591260000000034
    },
    {
        "x": 35.08346979238752,
        "y": 38.591260000000034
    },
    {
        "x": 43.08654245674734,
        "y": 48.591260000000034
    },
    {
        "x": 47.088078788927305,
        "y": 53.591260000000034
    },
    {
        "x": 51.08961512110727,
        "y": 50.591260000000034
    },
    {
        "x": 50.08923103806228,
        "y": 44.591260000000034
    },
    {
        "x": 42.08615837370235,
        "y": 32.591260000000034
    },
    {
        "x": 26.080013044982707,
        "y": 14.591260000000034
    },
    {
        "x": 14.07540404844292,
        "y": 0.5912600000000339
    },
    {
        "x": -1.930741280276834,
        "y": -15.408739999999966
    },
    {
        "x": -10.934198027681646,
        "y": -24.408739999999966
    },
    {
        "x": -18.93727069204158,
        "y": -28.408739999999966
    },
    {
        "x": -21.938422941176555,
        "y": -28.408739999999966
    },
    {
        "x": -24.939575190311416,
        "y": -28.408739999999966
    },
    {
        "x": -24.939575190311416,
        "y": -25.408739999999966
    },
    {
        "x": -21.938422941176555,
        "y": -16.408739999999966
    },
    {
        "x": -14.935734359861613,
        "y": -5.408739999999966
    },
    {
        "x": -0.9303571972318423,
        "y": 14.591260000000034
    },
    {
        "x": 8.07309955017297,
        "y": 25.591260000000034
    },
    {
        "x": 18.076940380622773,
        "y": 19.591260000000034
    },
    {
        "x": -14.935734359861613,
        "y": -19.408739999999966
    }
]
578.222





[
    {
        "x": -45.65752955017308,
        "y": 40.253540000000044
    },
    {
        "x": -49.659065882352934,
        "y": 16.253540000000044
    },
    {
        "x": -54.66098629757789,
        "y": -11.746459999999956
    },
    {
        "x": -48.65868179930794,
        "y": -30.746459999999956
    },
    {
        "x": -37.65445688581315,
        "y": -36.746459999999956
    },
    {
        "x": -25.64984788927336,
        "y": -40.746459999999956
    },
    {
        "x": -12.644854809688582,
        "y": -43.746459999999956
    },
    {
        "x": 6.362442768166034,
        "y": -43.746459999999956
    },
    {
        "x": 24.36935626297577,
        "y": -39.746459999999956
    },
    {
        "x": 36.37396525951556,
        "y": -35.746459999999956
    },
    {
        "x": 46.37780608996536,
        "y": -29.746459999999956
    },
    {
        "x": 51.37972650519032,
        "y": -23.746459999999956
    },
    {
        "x": 52.38011058823531,
        "y": -13.746459999999956
    },
    {
        "x": 52.38011058823531,
        "y": -2.7464599999999564
    },
    {
        "x": 47.37819017301035,
        "y": 24.253540000000044
    },
    {
        "x": 44.37703792387538,
        "y": 39.253540000000044
    },
    {
        "x": -45.65752955017308,
        "y": 39.253540000000044
    },
    {
        "x": -27.650616055363344,
        "y": 14.253540000000044
    },
    {
        "x": -26.650231972318352,
        "y": -15.746459999999956
    },
    {
        "x": 29.37127667820073,
        "y": -18.746459999999956
    },
    {
        "x": 29.37127667820073,
        "y": 14.253540000000044
    },
    {
        "x": -3.64139806228377,
        "y": 19.253540000000044
    },
    {
        "x": -1.6406298961937864,
        "y": -23.746459999999956
    }
]

578.222





[
    {
        "x": -124.30772615916965,
        "y": 40.71120000000002
    },
    {
        "x": -125.30811024221464,
        "y": 12.71120000000002
    },
    {
        "x": -121.30657391003467,
        "y": -15.28879999999998
    },
    {
        "x": -114.30388532871984,
        "y": -43.28879999999998
    },
    {
        "x": -102.29927633217994,
        "y": -72.28879999999998
    },
    {
        "x": -89.29428325259516,
        "y": -98.28879999999998
    },
    {
        "x": -68.28621750865057,
        "y": -118.28879999999998
    },
    {
        "x": -42.27623134948101,
        "y": -131.28879999999998
    },
    {
        "x": -16.26624519031145,
        "y": -137.28879999999998
    },
    {
        "x": 12.744893217992967,
        "y": -137.28879999999998
    },
    {
        "x": 40.75564754325251,
        "y": -129.28879999999998
    },
    {
        "x": 65.76524961937707,
        "y": -115.28879999999998
    },
    {
        "x": 87.77369944636666,
        "y": -97.28879999999998
    },
    {
        "x": 100.77869252595144,
        "y": -71.28879999999998
    },
    {
        "x": 111.78291743944635,
        "y": -43.28879999999998
    },
    {
        "x": 119.78599010380617,
        "y": -13.28879999999998
    },
    {
        "x": 122.78714235294115,
        "y": 10.71120000000002
    },
    {
        "x": 122.78714235294115,
        "y": 38.71120000000002
    },
    {
        "x": -124.30772615916965,
        "y": 40.71120000000002
    },
    {
        "x": -75.28890608996551,
        "y": 2.7112000000000194
    },
    {
        "x": -68.28621750865057,
        "y": -57.28879999999998
    },
    {
        "x": -56.28160851211078,
        "y": -87.28879999999998
    },
    {
        "x": -28.27085418685124,
        "y": -101.28879999999998
    },
    {
        "x": 9.743740968858106,
        "y": -103.28879999999998
    },
    {
        "x": 36.754111211072654,
        "y": -85.28879999999998
    },
    {
        "x": 58.762561038062245,
        "y": -73.28879999999998
    },
    {
        "x": 70.76717003460203,
        "y": -49.28879999999998
    },
    {
        "x": 82.77177903114182,
        "y": -24.28879999999998
    },
    {
        "x": 92.77561986159162,
        "y": 10.71120000000002
    },
    {
        "x": 46.75795204152246,
        "y": 12.71120000000002
    },
    {
        "x": -50.27930401384094,
        "y": 18.71120000000002
    },
    {
        "x": -98.29774000000009,
        "y": -15.28879999999998
    },
    {
        "x": -36.27392685121117,
        "y": -38.28879999999998
    },
    {
        "x": -23.268933771626394,
        "y": -67.28879999999998
    },
    {
        "x": 9.743740968858106,
        "y": -68.28879999999998
    },
    {
        "x": 33.75295896193768,
        "y": -45.28879999999998
    },
    {
        "x": 45.757567958477466,
        "y": -19.28879999999998
    },
    {
        "x": -42.27623134948101,
        "y": -9.28879999999998
    },
    {
        "x": -4.261636193771665,
        "y": -43.28879999999998
    }
]

578.222
*/
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
    var Array = [];
    for(var i = 0; i < this.ingredients.length; i++){
      if(this.ingredients[i] && Food.CombosLib["ingredients"][this.ingredients[i].name]){
        Array.push(this.ingredients[i].name);
      }
    }
    for(var i = 0; i < this.ingredients.length; i++){
      if(this.ingredients[i]){
        Array = Array.concat(this.ingredients[i].getIngredients());
      }
    }


    return Array;
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
        if((dist(Food.instances[index].X(), Food.instances[index].Y(), Food.instances[i].X(), Food.instances[i].Y()) < (Food.instances[i].r*Food.Heightbase)/Food.Scale + (Food.instances[index].r*Food.Heightbase)/Food.Scale && Food.instances[index].type !== "icon" && Food.instances[i].type !== "icon") || (Food.colliders[Food.instances[i].name] && inside2(Food.instances[index].X(), Food.instances[index].Y(), Food.instances[i].X(), Food.instances[i].Y(), (Food.instances[index].r*Food.Heightbase)/Food.Scale, Food.colliders[Food.instances[i].name].array, Food.Heightbase, Food.colliders[Food.instances[i].name].height) && Food.instances[index].type !== "icon" && Food.instances[i].type === "tool")){
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
      for(var i = 0; i < Food.instances.length; i++){
      //if(Food.colliders[Food.instances[i].name] && inside(Food.instances[Food.instances.length-1].X() - Food.instances[i].X(), Food.instances[Food.instances.length-1].Y() - Food.instances[i].Y(), (Food.instances[Food.instances.length-1].r*Food.Heightbase)/Food.Scale, Food.colliders[Food.instances[i].name].array)){

      //}
      }
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
      //for(var i = 0; i < Food.instances.length; i++){
      //  if((Food.colliders[Food.instances[i].name] && Food.instances[Food.instances.length-1].type !== "icon" && Food.instances[i].type === "tool")){
      //    inside2(Food.instances[Food.instances.length-1].X(), Food.instances[Food.instances.length-1].Y(), Food.instances[i].X(), Food.instances[i].Y(), (Food.instances[Food.instances.length-1].r*Food.Heightbase)/Food.Scale, Food.colliders[Food.instances[i].name].array, Food.Heightbase, Food.colliders[Food.instances[i].name].height);
      //  }
      //}
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
      //ellipse(Food.instances[i].X(), Food.instances[i].Y(), (Food.instances[i].r*2*Food.Heightbase)/Food.Scale, (Food.instances[i].r*2*Food.Heightbase)/Food.Scale);
      //fill(Food.instances[i].Over(mouseX, mouseY, Food.instances[i].Img, Food.instances[i].X(), Food.instances[i].Y(), (Food.instances[i].r*2*Food.Heightbase)/Food.Scale, (Food.instances[i].r*2*Food.Heightbase)/Food.Scale));
      if((!Food.instances[i].Img || Food.instances[i].type === "icon") && !Food.colliders[Food.instances[i].name]){
        ellipse(Food.instances[i].X(), Food.instances[i].Y(), (Food.instances[i].r*2*Food.Heightbase)/Food.Scale, (Food.instances[i].r*2*Food.Heightbase)/Food.Scale);
        //fill(0);
      //text(Food.instances[i].name, Food.instances[i].X(), Food.instances[i].Y());
      } 
      if(!Food.instances[i].Img){
        fill(0);
         text(Food.instances[i].name, Food.instances[i].X(), Food.instances[i].Y());
      } else{
        fill(0);
        //text(Food.instances[i].name + ":\n[" + Food.instances[i].getIngredients() + "]", Food.instances[i].X(), Food.instances[i].Y() + (Food.instances[i].r*Food.Heightbase)/Food.Scale + 7);
      }
      text(Food.instances[i].name + i + ":\n[" + Food.instances[i].getIngredients() + "]", Food.instances[i].X(), Food.instances[i].Y() + (Food.instances[i].r*Food.Heightbase)/Food.Scale + 7);
      if(Food.instances[i].Img){
        image(Food.instances[i].Img, Food.instances[i].X(), Food.instances[i].Y(), (Food.instances[i].r*2*Food.Heightbase)/Food.Scale, (Food.instances[i].r*2*Food.Heightbase)/Food.Scale);
        //ellipse(x + Food.instances[i].x, y + height - Food.instances[i].y, 5, 5);
      }
      /*
      if(Food.instances[i].type === "tool"){
        var col = Food.colliders[Food.instances[i].name];
        if(col){
          var colt = col.height;
          col = col.array;
          for(var o = 0; o < col.length - 1; o++){
            var tmp = colt;
            line(Food.instances[i].X() + (col[o].x*Food.Heightbase)/tmp, Food.instances[i].Y() + (col[o].y*Food.Heightbase)/tmp, Food.instances[i].X() + (col[o+1].x*Food.Heightbase)/tmp, Food.instances[i].Y() + (col[o+1].y*Food.Heightbase)/tmp);
          }
        }
      }
      */
    }
  }
}
