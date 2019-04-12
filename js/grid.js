'use scrict'

function Grid(canvas){

  this.board = [[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
}


Grid.prototype.configureBoard = function (){

  this.board[0] = ['W','W','W','W','W','W','W','W','W','W','W'];
  this.board[1] = ['W','X','X','X','X','X','X','X','X','X','W'];
  this.board[2] = ['W','X','W','X','W','X','W','X','W','X','W'];
  this.board[3] = ['W','X','X','X','X','X','X','X','X','X','W'];
  this.board[4] = ['W','X','W','X','W','X','W','X','W','X','W'];
  this.board[5] = ['W','X','X','X','X','X','X','X','X','X','W'];
  this.board[6] = ['W','X','W','X','W','X','W','X','W','X','W'];
  this.board[7] = ['W','X','X','X','X','X','X','X','X','X','W'];
  this.board[8] = ['W','X','W','X','W','X','W','X','W','X','W'];
  this.board[9] = ['W','X','X','X','X','X','X','X','X','X','W'];
  this.board[10] = ['W','X','W','X','W','S','W','X','W','X','W'];
  this.board[11] = ['W','X','X','X','X','X','X','X','X','X','W'];
  this.board[12] = ['W','X','W','X','W','X','W','X','W','X','W'];
  this.board[13] = ['W','X','X','X','X','X','X','X','X','X','W'];
  this.board[14] = ['W','W','W','W','W','W','W','W','W','W','W'];
}


Grid.prototype.getCellElement = function (x, y){

  return this.board[x][y];
}


Grid.prototype.removeFromGrid = function (x, y){

  this.board[x][y] = 'X';
}


Grid.prototype.putInGrid = function (Element, x, y){

  this.board[x][y] = Element;
}


Grid.prototype.printBoard = function (){

  for(let i = 0 ; i < this.board.length ; i++){
    for(let j = 0 ; j < this.board[i].length ; j++){
      this.printElement(this.getCellElement(i,j),j,i);
    }
  }
}


Grid.prototype.printElement = function(element, x, y){
  
  let color = '';
  switch (element){
    case 'W': color = 'grey';
              break;
    case 'X': color = 'green';
              break;
    case 'S': color = 'brown';
              break;
    case 'P': color = 'blue';
              break;
  }

  this.ctx.fillStyle = color;
  this.ctx.fillRect(y*50, x*50, 50, 50);
}