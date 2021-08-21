
var trex ,trex_running;

var ground, ground_image;

var dummuyGround, invisible_ground;

var clouds, clouds_image, cloud_group;

var cactus, obstacle_1, obstacle_2, obstacle_3, obstacle_4, obstacle_5,obstacle_6, cactus_group;
var PLAY=1;
var END=0;
var gameState=PLAY;
 
var score=0;
function preload(){
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");

  ground_image=loadImage("ground2.png");

  clouds_image=loadImage("cloud.png");

  obstacle_1=loadImage("obstacle1.png");

  obstacle_2=loadImage("obstacle2.png");

  obstacle_3=loadImage("obstacle3.png");

  obstacle_4=loadImage("obstacle4.png");

  obstacle_5=loadImage("obstacle5.png");

  obstacle_6=loadImage("obstacle6.png");
}

function setup(){
  createCanvas(600,200)
  
 trex=createSprite(300,100,20,20);
 trex.addAnimation("running",trex_running);
 trex.scale=0.5;


 ground=createSprite(300,170,600,20);
 ground.addImage("infinite",ground_image);
 ground.velocityX=-2

 dummyGround=createSprite(300,180,600,20);

 var randomNo=Math.round(random(1,10));
 console.log(randomNo);

 //creating Groups
 cloud_group=new Group ();
 cactus_group=new Group ();
}

function draw(){

  background("white")

  text("Score="+score,520,20);

  if (gameState==PLAY) {
    //reseting ground
  if(ground.x<0){
    ground.x=ground.width/2
  }
  //Increacsing the score
  score=score+Math.round(frameCount/200);
  createClouds();
  createCactus();
 //trex jumping
 if(keyDown("up")&&trex.collide(dummyGround)){
  trex.velocityY= -10
}
  // Gravity
  trex.velocityY=trex.velocityY+0.5;
  if(cactus_group.isTouching(trex)){
    gameState=END
  }
  }
  else if(gameState==END){
  ground.velocityX=0;
  cloud_group.setVelocityXEach(0);
  cactus_group.setVelocityXEach(0);
  }



  
  
 
   trex.collide(dummyGround);
  dummyGround.visible=false;

  

  console.log(frameCount);
drawSprites();
}

function createClouds(){

  if(frameCount%100===0){
    clouds=createSprite(700,100,20,20);
    clouds.velocityX=-2;
    clouds.addImage("water",clouds_image);
    clouds.scale=0.5;
    clouds.y=Math.round(random(100,130));
    clouds.depth=trex.depth;
    trex.depth=trex.depth+1

    clouds.lifetime=300;
    cloud_group.add(clouds);
  }

}

function createCactus() {
  if(frameCount%80===0){
    cactus=createSprite(500,160,20,20);
    cactus.velocityX=-2;
    var rand=Math.round(random(1,6))
    switch(rand){
    case 1: cactus.addImage("C1",obstacle_1);
    break;
    case 2:cactus.addImage("C2",obstacle_2);
    break;
    case 3:cactus.addImage("C3",obstacle_3);
    break;
    case 4:cactus.addImage("C4",obstacle_4);
    break;
    case 5:cactus.addImage("C5",obstacle_5);
    break;
    case 6:cactus.addImage("C6",obstacle_6);
    break;
    default:break;
   }
    cactus.scale=0.5;
    cactus.lifetime=300;
    cactus_group.add(cactus);
  }

}