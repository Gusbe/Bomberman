'use scrict'

function Player(canvas){
  this.posX = 1;
  this.posY = 1;
  this.bombsAvailable = 2;
  this.speed = 1;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
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

Player.prototype.reduceBombsAvailable = function (){

  this.bombsAvailable--;
}

Player.prototype.print = function (canvas) {

  //this.ctx.fillStyle = 'blue';
  //this.ctx.fillRect(this.posX*32, this.posY*32, 32, 32);
}