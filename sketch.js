var trex,trexRunning,trexColliding,ground,groundMoving,invisibleGround,cloudFlying,obstacles1,obstacles2,obstacles3,obstacles4,obstacles5,obstacles6;

var cloudsGroup,obstaclesGroup;
var PLAY=1,END=0,gameState=PLAY,count=0;
var gameOver,gameOverIcon,restart,restartIcon;

function preload(){
  trexRunning=loadAnimation("trex1.png","trex3.png","trex4.png");
  trexColliding=loadAnimation("trex_collided.png");
  groundMoving=loadImage("ground2.png");
  cloudFlying=loadImage("cloud.png");
  obstacles1=loadImage("obstacle1.png");
  obstacles2=loadImage("obstacle2.png");
  obstacles3=loadImage("obstacle3.png");
  obstacles4=loadImage("obstacle4.png");
  obstacles5=loadImage("obstacle5.png");
  obstacles6=loadImage("obstacle6.png");
  gameOverIcon=loadImage("gameOver.png");
  restartIcon=loadImage("restart.png");
}
function setup() {
  createCanvas(600, 200);
  trex=createSprite(30,180,20,10);
  trex.addAnimation("collided",trexColliding);
  trex.addAnimation("running",trexRunning);
  trex.scale=0.5;
  
  ground=createSprite(20,180,20,10);
  ground.addImage("moving",groundMoving);
  ground.velocityX=-5;
  
  invisibleGround=createSprite(200,185,400,7);
  invisibleGround.visible=false;
  
  cloudsGroup = createGroup();
  obstaclesGroup = createGroup();
  
  gameOver=createSprite(300,100,20,10);
  gameOver.addImage(gameOverIcon);
  gameOver.visible=false;
  gameOver.scale=0.5;
  
  restart=createSprite(300,150,20,10);
  restart.addImage(restartIcon);
  restart.visible=false;
  restart.scale=0.5;
}

function draw() {
  background("white");
  
  if(gameState===PLAY)
    {
       if(ground.x<0)
        {  
          ground.x=ground.width/2;
        }
  
      if(keyDown("space")&&trex.y>=158)
        {
          trex.velocityY=-12;
        }
      trex.velocityY=trex.velocityY + 0.6;
      trex.changeAnimation("running",trexRunning);
      spawnClouds();
      spawnObstacles();
      
      count=count+Math.round(World.frameRate/30);
      
      if(obstaclesGroup.isTouching(trex))
        {
          gameState=END;
        }
    }
  
  if(gameState===END)
    {
      cloudsGroup.setVelocityXEach(0);
      obstaclesGroup.setVelocityXEach(0);
      ground.velocityX=0;
      trex.velocityY=0;
      
      trex.changeAnimation("collided",trexColliding);
      
      cloudsGroup.setLifetimeEach(-1);
      obstaclesGroup.setLifetimeEach(-1);
      
      gameOver.visible=true;
      restart.visible=true;
    }
  
 text("Score:" + count,500,30);
  
  trex.collide(invisibleGround);
  
  if (mousePressedOver(restart)) 
  {
    reset();
  }
  
  drawSprites();
}
function spawnClouds()
{
  if(World.frameCount%50===0)
    {
      var cloud=createSprite(600,random(40,110),20,10);
      cloud.addImage("flying",cloudFlying);
      cloud.velocityX=-5;
      cloud.scale=0.7;
      cloud.lifetime=120;
      
      cloudsGroup.add(cloud);
      trex.depth=cloud.depth+1;
    }
}
function spawnObstacles()
{
  if(World.frameCount%60===0)
  {
    var obstacle=createSprite(600,160,20,10);
    obstacle.velocityX=-5;
    obstacle.lifetime=120;
    obstacle.scale=0.6;
    
    obstaclesGroup.add(obstacle);
    
    var rand=Math.round(random(1,6));
    switch(rand)
      {
        case 1:obstacle.addImage(obstacles1);
              break;
        case 2:obstacle.addImage(obstacles2);
              break;
        case 3:obstacle.addImage(obstacles3);
              break;
        case 4:obstacle.addImage(obstacles4);
              break;
        case 5:obstacle.addImage(obstacles5);
              break;
        case 6:obstacle.addImage(obstacles6);
              break;
        default:break;
      }
  }
}

function reset()
{
  gameState=PLAY;
  count=0;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running",trexRunning);
  gameOver.visible=false;
  restart.visible=false;
}