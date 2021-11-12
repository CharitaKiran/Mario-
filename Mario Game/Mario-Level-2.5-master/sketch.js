var mario, mario_running, mario_collided;
var bg, bgImage;
var coinscore=0
var gamestate="play"

function preload(){
  mario_running =  loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png",
  "images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png");
  bgImage = loadImage("images/bgnew.jpg");

  brickImage = loadImage("images/brick.png")
  coinImage = loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png","images/con5.png","images/con6.png")

  coinSound = loadSound("sound/cs.mp3")

  obsImage = loadAnimation("images/mush1.png","images/mush2.png","images/mush3.png","images/mush4.png","images/mush5.png","images/mush6.png")

  obs1Image = loadAnimation("images/tur1.png","images/tur2.png","images/tur3.png","images/tur4.png","images/tur5.png")

  mario_collided= loadAnimation("images/dead.png")

 // die_sound= loadSound("")

}


function setup() {
  createCanvas(1000, 600);

  bg = createSprite(580,300);
  bg.addImage(bgImage);
  bg.scale =0.5;
 
  bg.velocityX = -6;
  mario = createSprite(200,505,20,50);
  mario.addAnimation("running", mario_running);
  mario.addAnimation("collided",mario_collided)
  mario.scale =0.3;

  ground = createSprite(200,585,400,10);
 
  ground.visible = false;
  bricksGroup=new Group()
  coinsGroup=new Group()
  obstacleGroup=new Group()
}

function draw() {
 
  if(gamestate==="play"){

  if (bg.x < 100){
    bg.x=bg.width/4;
  }

  if(mario.x<200){
    mario.x=200
  }
if(mario.y<50){
  mario.y=50
}
  if(keyDown("space") ) {
    mario.velocityY = -16;
  }

  mario.velocityY = mario.velocityY + 0.5;
  mario.collide(ground);

  generateBricks();

  for(var i=0; i< (bricksGroup). length ; i++){
    var temp = (bricksGroup).get(i);
     if (temp.isTouching(mario)) {
       mario.collide(temp); 
     } 
  }
  generatecoins();

  for(var i=0; i<(coinsGroup).length ;i++){
    var temp=(coinsGroup).get(i);

    if (temp.isTouching(mario)) {
      coinSound.play();
      coinscore++;
      temp.destroy();
      temp=null;


    }
  }

  generateObstacles();
  if(obstacleGroup.isTouching(mario))
  gamestate="END" 
}//end of the PLAY state

else if(gamestate==="END"){
  bg.velocityX=0;
  mario.velocityY=0;
  obstacleGroup.setVelocityXEach(0);
  coinsGroup.setVelocityXEach(0);
  bricksGroup.setVelocityXEach(0);
  obstacleGroup.setLifetimeEach(-1);
  coinsGroup.setLifetimeEach(-1);
  bricksGroup.setLifetimeEach(-1);
  mario.changeAnimation("collide", mario_collided);
  mario.scale=0.4
  mario.setCollider("rectangle",0,0,300,10);       
  mario.y=570;

  


}






  drawSprites();
}

function generateBricks(){
  if(frameCount% 70 == 0){
    var brick =createSprite(1200,120,40,10);
    brick.y=random(50,450);
    brick.addImage(brickImage);
    brick.scale=0.5;
    brick.velocityX = -5;

    brick.lifetime=250;
    bricksGroup.add(brick);
  }
}

function generatecoins(){
  if(frameCount% 50==0){
    var coin =createSprite(1200,120,40,10);
    coin.y=random(50,450);
    coin.addAnimation("coin",coinImage);
    coin.scale=0.2;
    coin.velocityX = -5;

    coin.lifetime=550;
    coinsGroup.add(coin);
  }
}

function generateObstacles(){
  if(frameCount% 100==0){
    var obstacles =createSprite(1200,550,40,10);
    obstacles.scale=0.2;
    obstacles.velocityX = -5

    var r=Math.round(random(1,2));
    switch(r){
      case 1:
        obstacles.addAnimation("mush", obsImage)
        break;

      case 2:
        obstacles.addAnimation("turtle",obs1Image)
        break;
      default:
        break;
    }
  
    
    obstacles.lifetime=550;
    obstacleGroup.add(obstacles);
  }
}

