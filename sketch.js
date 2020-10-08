var player,playerImg,player1,player1Img;
var bg;
var enemy,enemyImg;
var ground;
var upArrow,rightArrow,leftArrow,downArrow,shootBullet;
var bullet,bulletImg;
var count=0;
var gameState=1;
var kills=0;
var enemiesGroup,bulletGroup;
var bg2,bg3;
var boss1,boss2,boss3;
var boss1Bullet;
var boss1bulletGroup;
var boss2bullet;
var boss2bulletGroup;
var damage=0;
var boss;
var lives=3;
var boss3bulletGroup;
var boss4;
var player1BulletImage;

function preload(){
  playerImg=loadImage("images/player.png");
  bg=loadImage("images/bg.jpeg");
  enemyImg=loadImage("images/enemies.png");
  bulletImg=loadImage("images/normalBullet.jpg");
  bg2=loadImage("images/bg2.gif");
  boss1=loadImage("images/boss1.jpeg");
  bossBullet=loadImage("images/SMbullet.png");
  bg3=loadImage("images/bg3.jpeg");
  boss2=loadImage("images/boss2.jpeg");
  boss3=loadImage("images/boss3.jpeg");
  player1Img=loadImage("images/player2.png");
  player1BulletImage=loadImage("images/SLbullet.jpeg");

}


function setup(){
  createCanvas(windowWidth-20,windowHeight-20);

  ground=createSprite(windowWidth/2,windowHeight-200,windowWidth,20);
  ground.visible=false;
  

  var ground1=createSprite(windowWidth/2,windowHeight-200,windowWidth,20);
  ground1.visible=false;

  player=createSprite(100,windowHeight-250,50,50);
  player.addImage("player2",playerImg);
  player.scale=0.25;

player1=createSprite(300,windowHeight-250,50,50);
player1.addImage("player3",player1Img);
//player1.scale=;
player1.visible=false;

 upArrow=createButton("JUMP");
upArrow.position(windowWidth-400,windowHeight-300);
upArrow.mousePressed(()=>{
  player.y=player.y-50;
  player1.y=player1.y-50;
});

downArrow=createButton("DOWN");
downArrow.position(windowWidth-400,windowHeight-250);
downArrow.mousePressed(()=>{
  player.y=player.y+50;
  player1.y=player1.y+50;
})

 rightArrow=createButton("RIGHT");
  rightArrow.position(windowWidth-350,windowHeight-270);
  rightArrow.mousePressed(()=>{
    player.x=player.x+40;
    player1.x=player1.x+40;
  })

  leftArrow=createButton("LEFT");
  leftArrow.position(windowWidth-450,windowHeight-270);
  leftArrow.mousePressed(()=>{
    player.x=player.x-40;
    player1.x=player1.x-40;
  })

  shootBullet=createButton("SHOOT");
  shootBullet.position(windowWidth-400,windowHeight-350);
  shootBullet.mousePressed(()=>{
    //if(gameState===4){
      //bulletGroup.setVelocityYEach(50);
      //bulletGroup.setVelocityXEach(0);
    //}else{
    bulletGroup.setVelocityXEach(50);
    bulletGroup.setVisibleEach(true);
   // }
  })

  boss=createSprite(windowWidth-300,windowHeight-500,50,50);
  boss.addImage("bossIMAGE",boss1);

  boss4=createSprite(400,100,50,50);
  boss4.visible=false;

  enemiesGroup=new Group();
  bulletGroup=new Group();
  boss1bulletGroup=new Group();
  boss2bulletGroup=new Group();
  boss3bulletGroup=new Group();

}


function draw(){

 /* upArrow=createButton("JUMP");
  upArrow.position(windowWidth-400,windowHeight-300);
  upArrow.mousePressed(()=>{
    player.y=player.y-50;
  
  });

  downArrow=createButton("DOWN");
downArrow.position(windowWidth-400,windowHeight-250);
downArrow.mousePressed(()=>{
  player.y=player.y+50;
})

 rightArrow=createButton("RIGHT");
  rightArrow.position(windowWidth-350,windowHeight-270);
  rightArrow.mousePressed(()=>{
    player.x=player.x+40;
  })

  leftArrow=createButton("LEFT");
  leftArrow.position(windowWidth-450,windowHeight-270);
  leftArrow.mousePressed(()=>{
    player.x=player.x-40;
  })*/

  createBullet();

  
  
  if(gameState===1){
  background(bg);

  boss.visible=false;

  textSize(50);
  text("LIVES:"+lives,400,200);

  textSize(50);
  stroke(255);
  text("KILLS:"+kills,windowWidth/2,200);
  //camera.position.x=player.x;
  //camera.position.y=windowHeight/2;
player.collide(ground);
enemiesGroup.collide(ground);
//if(keyIsDown(UP_ARROW)){
 // bulletGroup.visible=true;
  //bulletGroup.velocityX=50;
//}
if(enemiesGroup.isTouching(bulletGroup)){
  enemiesGroup.destroyEach();
  bulletGroup.destroyEach();
  kills=kills+1;
}
if(enemiesGroup.isTouching(player)){
 lives=lives-1;
}
if(lives===0){
  gameState=7;
}
spawnEnemy();


if(kills>1){
  gameState=4;
}
  }

  if(gameState===2){
    background(bg);
    boss.visible=true;


  //  player.x=200;
   // player.y=600;
    boss.collide(ground);

    textSize(50);
  text("LIVES:"+lives,400,200);


    Boss1Bullet();
  // boss1bulletGroup.collide(ground);
   // if(boss1bulletGroup.isTouching(ground)){
     // boss1bulletGroup.destroyEach();
    //}
 
    if(boss1bulletGroup.isTouching(player)){
      boss1bulletGroup.destroyEach();
     // player.destroy();
     // gameState=7;
      lives=lives-1;
    }

    if(lives===0){
      gameState=7;
    }

    //write condition of gameState going to 3
    if(bulletGroup.isTouching(boss)){
      damage=damage+1;
      bulletGroup.destroyEach();
    }

    if(damage===10){
      boss.destroy();
      boss1bulletGroup.destroyEach();
      gameState=3;
    }

   /* upArrow=createButton("JUMP");
  upArrow.position(windowWidth-400,windowHeight-300);
  upArrow.mousePressed(()=>{
    player.y=player.y-50;
  console.log(player.y);
  });

  downArrow=createButton("DOWN");
downArrow.position(windowWidth-400,windowHeight-250);
downArrow.mousePressed(()=>{
  player.y=player.y+50;
})

 rightArrow=createButton("RIGHT");
  rightArrow.position(windowWidth-350,windowHeight-270);
  rightArrow.mousePressed(()=>{
    player.x=player.x+40;
  })

  leftArrow=createButton("LEFT");
  leftArrow.position(windowWidth-450,windowHeight-270);
  leftArrow.mousePressed(()=>{
    player.x=player.x-40;
  })*/

  }

  if(gameState===3){
    background(bg);
   
    ground=createSprite(windowWidth/2,windowHeight-200,windowWidth,20);
    ground.visible=false;

    textSize(50);
  text("LIVES:"+lives,400,200);


    textSize(50);
    stroke(255);
    text("KILLS:"+kills,windowWidth/2,200);

    spawnEnemy();
    //text("COUNT"+count,400,100);
    enemiesGroup.collide(ground);
  
    enemiesGroup.setVelocityXEach(-15);
    enemiesGroup.setVelocityYEach(10);
    if(enemiesGroup.isTouching(bulletGroup)){
      enemiesGroup.destroyEach();
      bulletGroup.destroyEach();
      kills=kills+1;
    }

      if(kills>15){
        gameState=4;
      }
    
    if(enemiesGroup.isTouching(player)){
     // player.destroy;
      lives=lives-1;
    }

    if(lives===0){
      gameState=7;
    }

   /* upArrow=createButton("JUMP");
    upArrow.position(windowWidth-400,windowHeight-300);
    upArrow.mousePressed(()=>{
      player.y=player.y-50;
    console.log(player.y);
    });
  
    downArrow=createButton("DOWN");
  downArrow.position(windowWidth-400,windowHeight-250);
  downArrow.mousePressed(()=>{
    player.y=player.y+50;
  })
  
   rightArrow=createButton("RIGHT");
    rightArrow.position(windowWidth-350,windowHeight-270);
    rightArrow.mousePressed(()=>{
      player.x=player.x+40;
    })
  
    leftArrow=createButton("LEFT");
    leftArrow.position(windowWidth-450,windowHeight-270);
    leftArrow.mousePressed(()=>{
      player.x=player.x-40;
    })*/

  }

if(gameState===4){
  background(boss2);

player1.debug=true;
player1.setCollider("rectangle",0,0,50,200);

  player.visible=false;
  player1.visible=true;

  boss4.visible=true;

  ground=createSprite(windowWidth/2,windowHeight-200,windowWidth,20);
  ground.visible=false;
  player1.collide(ground);
  //player.x=400;
  //player.y=windowHeight-250;

 // player.addImage(player1Img);
  //player.scale=0.25;
    
  Boss2Bullet();

  textSize(50);
  text("LIVES:"+lives,400,200);

  if(boss2bulletGroup.isTouching(player1)){
    boss2bulletGroup.destroyEach();
    //player.destroy();
    lives=lives-1;
  }

  //write condition of gameState going to 5
if(lives===0){
  gameState=7;
}

/*upArrow=createButton("JUMP");
upArrow.position(windowWidth-400,windowHeight-300);
upArrow.mousePressed(()=>{
  player.y=player.y-50;
//console.log(player.y);
});

downArrow=createButton("DOWN");
downArrow.position(windowWidth-400,windowHeight-250);
downArrow.mousePressed(()=>{
player.y=player.y+50;
})

rightArrow=createButton("RIGHT");
rightArrow.position(windowWidth-350,windowHeight-270);
rightArrow.mousePressed(()=>{
  player.x=player.x+40;
})

leftArrow=createButton("LEFT");
leftArrow.position(windowWidth-450,windowHeight-270);
leftArrow.mousePressed(()=>{
  player.x=player.x-40;
})*/

if(bulletGroup.isTouching(boss4)){
  damage=damage+1;
}
if(damage===10){
  //boss2.destroy();
  gameState=8;
}


}

/*if(gameState===5){
  background(bg);

  ground=createSprite(windowWidth/2,windowHeight-200,windowWidth,20);
  ground.visible=false;

  spawnEnemy();

  textSize(50);
  text("LIVES:"+lives,400,200);

    textSize(50);
    stroke(255);
    text("KILLS:"+kills,windowWidth/2,200);

  if(enemiesGroup.isTouching(player)){
    lives=lives-1;
  }

  if(lives===0){
    gameState=7;
  }

  if(enemiesGroup.isTouching(bulletGroup)){
    enemiesGroup.destroyEach();
    bulletGroup.destroyEach();
    kills=kills+1;
  }

  if(kills>20){
    text("YOU WIN",400,400);
    gameState=8;
    }
  }

  upArrow=createButton("JUMP");
    upArrow.position(windowWidth-400,windowHeight-300);
    upArrow.mousePressed(()=>{
      player.y=player.y-50;
   // console.log(player.y);
    });
  
    downArrow=createButton("DOWN");
  downArrow.position(windowWidth-400,windowHeight-250);
  downArrow.mousePressed(()=>{
    player.y=player.y+50;
  })
  
   rightArrow=createButton("RIGHT");
    rightArrow.position(windowWidth-350,windowHeight-270);
    rightArrow.mousePressed(()=>{
      player.x=player.x+40;
    })
  
    leftArrow=createButton("LEFT");
    leftArrow.position(windowWidth-450,windowHeight-270);
    leftArrow.mousePressed(()=>{
      player.x=player.x-40;
    })*/

  /*if(gameState===6){
    background(boss3);

    Boss3Bullet();

    textSize(50);
    text("LIVES:"+lives,400,200);
    
  
    if(boss3bulletGroup.isTouching(player)){
      boss3bulletGroup.destroyEach();
      //player.destroy();
      lives=lives-1;
    }

  if(lives===0){
    gameState=7;
  }

    upArrow=createButton("JUMP");
    upArrow.position(windowWidth-400,windowHeight-300);
    upArrow.mousePressed(()=>{
      player.y=player.y-50;
    console.log(player.y);
    });
  
    downArrow=createButton("DOWN");
  downArrow.position(windowWidth-400,windowHeight-250);
  downArrow.mousePressed(()=>{
    player.y=player.y+50;
  })
  
   rightArrow=createButton("RIGHT");
    rightArrow.position(windowWidth-350,windowHeight-270);
    rightArrow.mousePressed(()=>{
      player.x=player.x+40;
    })
  
    leftArrow=createButton("LEFT");
    leftArrow.position(windowWidth-450,windowHeight-270);
    leftArrow.mousePressed(()=>{
      player.x=player.x-40;
    })

    if(bulletGroup.isTouching(boss3)){
      damage=damage+1;
    }
    if(damage===10){
      boss3.destroy();
     text("YOU WIN",400,400);
     textSize(500);
    }

  }*/

  if(gameState===7){
    background(bg);
    player.destroy();
    player1.destroy();
    boss4.destroy();
  bulletGroup.destroyEach();
  enemiesGroup.destroyEach();
  textSize(50);
  text("GAME OVER",400,400);
  textSize(50); 
  text("YOU LOSE",400,460);
     
  }

  if(gameState===8){
    background(bg);
    player.destroy();
    player1.destroy();
    boss4.destroy();
    bulletGroup.destroyEach();
    enemiesGroup.destroyEach();
    textSize(50);
    text("YOU WIN",400,400);
  }

  drawSprites();
}

/*function Boss3Bullet(){
  if(frameCount % 100===0){
    var Bbullet3=createSprite(400,400,30,30);
    Bbullet3.addImage("bulletss1",bossBullet);
    Bbullet3.scale=0.3;

    Bbullet.velocityY=10;
    //Bbullet3.lifetime=180;

    boss3bulletGroup.add(Bbullet3);
  }
}*/

function Boss2Bullet(){
  if(frameCount % 100===0){
    var Bbullet2=createSprite(400,400,30,30);
    Bbullet2.addImage("bullets1",bossBullet);
    Bbullet2.scale=0.3;

    Bbullet2.velocityY=10;

   // Bbullet2.lifetime=180;

    boss2bulletGroup.add(Bbullet2);

  }
}

function Boss1Bullet(){
  if(frameCount % 50===0){
  var Bbullet=createSprite(600,550,30,30);
  Bbullet.addImage("bullets",bossBullet);
  Bbullet.scale=0.3

  Bbullet.velocityX=-13;

  Bbullet.lifetime=500;

  var rand=Math.round(random(1,2));
  if(rand===1){
    Bbullet.x=600;
    Bbullet.y=450;
    Bbullet.velocityY=10;
  }else{
    Bbullet.x=600;
    Bbullet.y=700;
   
  }
  Bbullet.collide(ground);

  boss1bulletGroup.add(Bbullet);

}
}

function spawnEnemy(){
if(frameCount % 50===0){
var enemy=createSprite(windowWidth,windowHeight-250,50,50);
  enemy.addImage("enemy",enemyImg);
  enemy.scale=0.7;
 
//enemy.velocityX=-(15+(count/2));
enemy.velocityX=-15;
enemy.velocityY=10;
 var rand=Math.round(random(1,3));
 if(rand===1){
   enemy.y=150;
 }
 else if(rand===2){
   enemy.y=windowHeight/2;
 }
 else{
 enemy.y=windowHeight-250;
 }
enemiesGroup.add(enemy);
}
}

function createBullet(){
  var bullet=createSprite(100,windowHeight-250,50,50);
  
  
  
  bullet.visible=false;
  bullet.scale=0.1;

  if(gameState===4){
    bullet.addImage("gun1",player1BulletImage);
    bullet.x=player1.x;
    bullet.y=player1.y;
    bullet.velocityY=-50;
    bullet.velocityX=0;
  }else{
    bullet.addImage("gun",bulletImg);
    bullet.x=player.x;
    bullet.y=player.y;
   // bullet.velocityX=50;
    bullet.velocityY=0;
  }

  bulletGroup.add(bullet);
}

