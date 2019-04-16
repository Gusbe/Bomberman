'use scrict'

function Grid(canvas){

  this.board = [[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.powerRange = 3;
  this.powerAmount = 3;
  this.powerDead = 1;
  this.powerSlow = 1;
  this.wallImage = new Image();
  this.woodImage = new Image();
  this.groundImage = new Image();
  this.bombermanImage = new Image();
  this.bombImage = new Image();
  this.fireImage = new Image();
  this.enemyImage = new Image();
  
  this.wallImage.src = "./img/wall.png";
  this.woodImage.src = "./img/wood.png";
  this.groundImage.src = "./img/ground.png";
  this.bombermanImage.src = "./img/bomberman.gif";
  this.bombImage.src = "./img/bomb.png";
  this.fireImage.src = "./img/fire.png";
  this.enemyImage.src = "./img/enemy.png";
}


Grid.prototype.configureBoard = function (){

  this.board[0] = ['W','W','W','W','W','W','W','W','W','W','W','W','W'];
  this.board[1] = ['W','P','X','S','X','X','X','X','S','X','X','X','W'];
  this.board[2] = ['W','X','W','X','W','X','W','X','W','S','W','X','W'];
  this.board[3] = ['W','S','X','X','X','X','X','S','X','X','X','X','W'];
  this.board[4] = ['W','X','W','X','W','X','W','S','W','X','W','X','W'];
  this.board[5] = ['W','S','X','S','X','X','X','S','X','S','X','X','W'];
  this.board[6] = ['W','X','W','X','W','X','W','X','W','X','W','X','W'];
  this.board[7] = ['W','X','X','X','X','S','X','X','X','X','X','X','W'];
  this.board[8] = ['W','X','W','X','W','X','W','X','W','X','W','X','W'];
  this.board[9] = ['W','X','S','X','X','X','X','X','X','S','X','X','W'];
  this.board[10] = ['W','X','W','X','W','S','W','X','W','X','W','X','W'];
  this.board[11] = ['W','S','X','S','X','S','X','X','X','X','X','X','W'];
  this.board[12] = ['W','X','W','S','W','S','W','S','W','S','W','X','W'];
  this.board[13] = ['W','X','S','X','S','X','X','S','X','S','X','X','W'];
  this.board[14] = ['W','X','W','S','W','S','W','S','W','S','W','X','W'];
  this.board[15] = ['W','X','S','X','S','X','X','S','X','S','X','X','W'];
  this.board[16] = ['W','X','W','S','W','S','W','S','W','S','W','X','W'];
  this.board[17] = ['W','X','S','X','S','X','X','S','X','S','X','X','W'];
  this.board[18] = ['W','X','W','S','W','S','W','S','W','S','W','X','W'];
  this.board[19] = ['W','X','S','X','S','X','X','S','X','S','X','X','W'];
  this.board[20] = ['W','W','W','W','W','W','W','W','W','W','W','W','W'];
  
}


Grid.prototype.getCellElement = function (x, y){

  return this.board[x][y];
}


Grid.prototype.removeFromGrid = function (x, y){

  this.board[x][y] = 'X';
}


Grid.prototype.putInGrid = function (element, x, y){

  this.board[x][y] = element;
}


Grid.prototype.printBoard = function (){
  
  for(let i = 0 ; i < this.board.length ; i++){
    for(let j = 0 ; j < this.board[i].length ; j++){
      
      this.printElement(this.getCellElement(i,j),j,i);
    }
  }
}


Grid.prototype.printElement = function(element, x, y){

 switch (element){

   case 'W':  
              this.ctx.drawImage(this.wallImage, y*32, x*32, 32, 32);
              break;

   case 'X':  this.ctx.drawImage(this.groundImage, y*32, x*32, 32, 32);
             break;

   case 'S': this.ctx.drawImage(this.woodImage, y*32, x*32, 32, 32);
             break;

   case 'P': this.ctx.drawImage(this.bombermanImage, y*32, x*32, 32, 32);
             break;

    case 'B': this.ctx.drawImage(this.bombImage, y*32, x*32, 32, 32);
              break;

   case 'F': 
            this.ctx.drawImage(this.fireImage, y*32, x*32, 32, 32);
             break;
    case 'E': 
            this.ctx.drawImage(this.enemyImage, y*32, x*32, 32, 32);
            break;
 }
  
}

Grid.prototype.countWood = function () {
  let count = 0;
  for(let i = 0 ; i < this.board.length ; i++){
    for(let j = 0 ; j < this.board[i].length ; j++){
      
      if (this.board[i][j] === 'S'){
        count++;
      }
    }
  }
  return count;
}