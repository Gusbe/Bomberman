'use scrict'

function Player(canvas){
  this.posX = 1;
  this.posY = 1;
  this.bombsAvailable = 2;
  this.rangeBombs = 3;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.bombermanImage = new Image();
  this.deadBombermanImage = new Image();
  this.groundImage = new Image();
  this.fireImage = new Image();

  this.bombermanImage.src = "./img/bomberman.gif";
  this.deadBombermanImage.src = "./img/deadBomberman.png";
  this.groundImage.src = "./img/ground.png";
  this.fireImage.src = "./img/fire.png";
}

Player.prototype.move = function(x, y){

  this.posX = x;
  this.posY = y;
}

Player.prototype.nextPosition = function(direction) {

  let nextPositionY = this.posY;
  let nextPositionX = this.posX;

  switch(direction){
    case 'U': nextPositionY--;  break;  //Up
    case 'D': nextPositionY++;  break;  //Down
    case 'R': nextPositionX++;  break;  //Rigth
    case 'L': nextPositionX--;  break;  //Left
  }
  
  return [nextPositionX , nextPositionY];
}

Player.prototype.addBombsAvailable = function (){

  this.bombsAvailable++;
}

Player.prototype.reduceBombsAvailable = function (){    //TODO: REMOVE IT?

  this.bombsAvailable--;
}

Player.prototype.addBombsRange = function (){

  this.rangeBombs++;
}

Player.prototype.print = function () {

  this.ctx.drawImage(this.bombermanImage, this.posX*32, this.posY*32, 32, 32);
}

Player.prototype.printDead = function (causeOfDeath) {
  
  if(causeOfDeath === 'fire'){
    this.ctx.drawImage(this.fireImage, this.posX*32, this.posY*32, 32, 32);
  }
  else{
    this.ctx.drawImage(this.groundImage, this.posX*32, this.posY*32, 32, 32);
  }
  this.ctx.drawImage(this.deadBombermanImage, this.posX*32, this.posY*32, 32, 32);
}