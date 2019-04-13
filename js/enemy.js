'use scrict'

function Enemy(canvas){
  this.posX = 3;
  this.posY = 3;
  this.speed = 1;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
}

Enemy.prototype.move = function (x, y) {

  this.posX = x;
  this.posY = y;
}

Enemy.prototype.NextPosition = function(direction) {

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

Enemy.prototype.print = function () {

  this.ctx.fillStyle = 'red';
  this.ctx.fillRect(this.posX*50, this.posY*50, 50, 50);
}

Enemy.prototype.GenerateRandomMovement = function (grid) {

  //Erratic movement for the moment
  let options = [];
  if(grid.getCellElement(this.posX,this.posY-1) !== 'S' && grid.getCellElement(this.posX,this.posY-1) !== 'W'){ options.push('U'); }
  if(grid.getCellElement(this.posX+1,this.posY) !== 'S' && grid.getCellElement(this.posX+1,this.posY) !== 'W'){ options.push('R'); }
  if(grid.getCellElement(this.posX,this.posY+1) !== 'S' && grid.getCellElement(this.posX,this.posY+1) !== 'W'){ options.push('D'); }
  if(grid.getCellElement(this.posX-1,this.posY) !== 'S' && grid.getCellElement(this.posX-1,this.posY) !== 'W'){ options.push('L'); }

  let nextCoordinates = [];
  nextCoordinates = this.NextPosition(options[Math.floor(Math.random()*options.length)]);

  this.move(nextCoordinates[0],nextCoordinates[1]);
}