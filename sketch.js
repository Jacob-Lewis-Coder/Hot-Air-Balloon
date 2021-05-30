var Balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database, position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1356,598);

  Balloon=createSprite(250,450,150,150);
  Balloon.addAnimation("hotAirBalloon",balloonImage1);
  Balloon.scale=0.5;
 
  
  var BalloonPosition = database.ref('Balloon/Height');
  BalloonPosition.on("value", readHeight, showError);

}

function updateHeight(x, y){
  database.ref('Balloon/Height').set({
    'x' : Height.x + x,
    'y' : Height.y + y
  })
}

function readHeight(data){
  Height = data.val();
  Balloon.x = Height.x;
  Balloon.y = Height.y;
}

function showError(){
  console.log("Error in writing to the database");
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10, 0);
    Balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10, 0);
    Balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0, -10);
    Balloon.addAnimation("hotAirBalloon",balloonImage2);
    Balloon.scale = Balloon.scale - 0.01;
    //write code to move air balloon in up direction
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0, 10);
    Balloon.addAnimation("hotAirBalloon",balloonImage2);
    Balloon.scale = Balloon.scale + 0.01;
    //write code to move air balloon in down direction
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
