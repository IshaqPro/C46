var balloon,balloonImage1,balloonImage2;
var database;
var height;

function preload(){
   bg =loadImage("assets/bg.png");
   balloonImage1=loadAnimation("assets/balloon1.png");
   balloonImage2=loadAnimation("assets/balloon1.png","assets/balloon1.png",
   "assets/balloon1.png","assets/balloon2.png","assets/balloon2.png",
   "assets/balloon2.png","assets/balloon3.png","assets/balloon3.png","assets/balloon3.png");
  }

//Function to set initial environment
function setup() {

   database=firebase.database();

  createCanvas(1500,700);

  ground=createSprite(20,700,3000);
  //ground.visible=false;

  balloon=createSprite(250,650,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonHeight=database.ref('balloon/height');
  balloonHeight.on("value",readHeight, showError);



  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

 function updateHeight(x,y){
   database.ref('balloon/height').set({
     'x': height.x + x ,
     'y': height.y + y
   })
 }


//CHOOSE THE CORRECT READHEIGHT FUNCTION
// function readHeight(data){
//   balloon.x = height.x;
//   balloon.y = height.y;
// }

 function readHeight(data){
   height = data.val();
   balloon.x = height.x;
   balloon.y = height.y;
 }

// function readHeight(data){
//   height = data.val();
// }

// function readHeight(){
//   height = val();
//   balloon.x = height.x;
//   balloon.y = height.y;
// }

function showError(){
  console.log("Error in writing to the database");
}