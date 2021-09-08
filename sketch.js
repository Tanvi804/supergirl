var hero;
var rewardsGroup,obstaclesGroup, diamond, alien1 , alien2;
var obstacle1, obstacle2,reward,rewardImage,heroImg,hero;
var bgImg,overImg;

var rewards=0;
var lives=5;

function preload(){
    obstacle1=loadImage("monster2.png")
    obstacle2=loadImage("monster1.png")
    
    rewardImage=loadImage("diamond.png")
    heroImg=loadImage("hero.png")

    overImg=loadImage("gameover.jpg")

    bgImg=loadImage("gamingbackground2.png")
}


function setup(){
    var canvas = createCanvas(1275,600);
   
    ground=createSprite(600,300,200,200);
    ground.addImage("gamingbackground2i",bgImg);
    ground.addImage("gameoverimg",overImg);
    ground.scale=1;
    //ground.velocityX = -4;
  
    hero=createSprite(100,50,150,80) 
    //hero.velocityX=1;
    hero.addImage("heroi",heroImg);
    hero.scale = 0.1;

    rewardsGroup = createGroup();
    obstaclesGroup = createGroup();
}

function draw(){
    background("white")

    ground.velocityX = -4

    if (ground.x < 200)
    {
      ground.x = ground.width/2;
    }
   
    spawnRewards();
    spawnObstacles();

for (var i = 0; i<rewardsGroup.length; i++){
  if (rewardsGroup.get(i).isTouching(hero)){
    rewardsGroup.get(i).destroy();
    rewards+=2
  }
}


  /*if(rewardsGroup.isTouching(hero)){
    rewards+=2
    rewardsGroup.destroyEach();
  }
*/

  if(obstaclesGroup.isTouching(hero)){
    rewards-=1
    lives-=1
    obstaclesGroup.destroyEach();
  }

  if(keyDown(UP_ARROW)){
    hero.y=hero.y-3;
  }

  if(keyDown(DOWN_ARROW)){
    hero.y=hero.y+3;
  }

if(lives===0){
  hero.destroy();
  rewardsGroup.destroyEach();
  obstaclesGroup.destroyEach();
  ground.x=600;
  ground.y=300;
  ground.changeImage("gameoverimg",overImg)
  ground.velocityX=0;
}

  drawSprites();

  if(lives > 0)
  {
    textSize(19);
    fill("black")
    text("Rewards:" + rewards,1150,50);

    textSize(19);
    fill("black")
    text("Lives:" + lives,1150,20);
  }
   
}

function spawnObstacles(){
    if (frameCount % 220 === 0){
      var obstacle = createSprite(1400,165,10,40);
      obstacle.y = Math.round(random(10,400));
      obstacle.velocityX = -6 ;
      
       //generate random obstacles
       var rand = Math.round(random(1,3));
       switch(rand) {
        case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
         default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       obstacle.scale = 0.1;
      
      //add each obstacle to the group
       obstaclesGroup.add(obstacle);
    }
   }
   
   function spawnRewards() {
     //write code here to spawn the rewards
     if (frameCount % 130===0) {
       var reward = createSprite(1400,120,40,10);
       reward.y = Math.round(random(70,700));
       reward.addImage("rewardi", rewardImage);
       reward.scale = 0.1;
       reward.velocityX = -3;
           
       rewardsGroup.add(reward);
     }
   }




