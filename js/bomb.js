'use scrict'

function Bomb (canvas, x, y) {

  this.posX = x;
  this.posY = y;
  this.range = 4;
  this.timer = 2500;  //milliSeconds
  this.durationExplosion = 1000;  //milliSeconds
  this.startTimer = Date.now();
  this.hasExploded = false;
  this.fireCells = [];
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.bombImage = new Image();
  this.bombImage.src = "./img/bomb.jpg";
  this.fireImage = new Image();
  this.fireImage.src = "./img/fire.jpg";
}

Bomb.prototype.print = function () {

  if(!this.hasExploded){

    this.ctx.drawImage(this.bombImage, this.posX*32, this.posY*32, 32, 32);
  }
}

Bomb.prototype.printFire = function () {

  
  for(let i = 0 ; i < this.fireCells.length ; i++){
    
    this.ctx.drawImage(this.fireImage, this.fireCells[i][0]*32, this.fireCells[i][1]*32, 32, 32);
  }
}

Bomb.prototype.checkIfExplodes = function (){

  if(this.startTimer + this.timer < Date.now() && !this.hasExploded){
    this.hasExploded = true;

    return true;
  }
  else{
    return false;
  }
}

Bomb.prototype.makeExplode = function (x, y){
  
  if(this.posX === x && this.posY === y && !this.hasExploded){
    this.startTimer = Date.now() - this.timer;
  }
}

Bomb.prototype.checkRemoveFire = function (){

  if(this.startTimer + this.timer + this.durationExplosion < Date.now() && this.hasExploded){
    return true;
  }
  else{
    return false;
  }
}

Bomb.prototype.getFireCells = function (grid){

  let position = [];
  
  //Up direction array
  for( let i = 0 ; i < this.range ; i++){

    if (grid.getCellElement(this.posX,this.posY-i) !== 'W'){
      this.fireCells.push([this.posX,this.posY-i]);
      if (grid.getCellElement(this.posX,this.posY-i) === 'S'){
        i = this.range;
      }
    }
    else{
      i = this.range;
    }
  }

  //Right direction array
  for( let i = 0 ; i < this.range ; i++){

    if (grid.getCellElement(this.posX+i,this.posY) !== 'W'){
      this.fireCells.push([this.posX+i,this.posY]);
      if (grid.getCellElement(this.posX+i,this.posY) === 'S'){
        i = this.range;
      }
    }
    else{
      i = this.range;
    }
  }

  //Down direction array
  for( let i = 0 ; i < this.range ; i++){

    if (grid.getCellElement(this.posX,this.posY+i) !== 'W'){
      this.fireCells.push([this.posX,this.posY+i]);
      if (grid.getCellElement(this.posX,this.posY+i) === 'S'){
        i = this.range;
      }
    }
    else{
      i = this.range;
    }
  }

  //Left direction array
  for( let i = 0 ; i < this.range ; i++){

    if (grid.getCellElement(this.posX-i,this.posY) !== 'W'){
      this.fireCells.push([this.posX-i,this.posY]);
      if (grid.getCellElement(this.posX-i,this.posY) === 'S'){
        i = this.range;
      }
    }
    else{
      i = this.range;
    }
  }
  
  return this.fireCells;
} 

/*
Bomb.prototype.delete()
Bomb.prototype.getFireCells()
Bomb.prototype.explode()
Bomb.prototype.printFire()
*/