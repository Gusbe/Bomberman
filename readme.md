# Bomberman

## Description
Javascript version of the game Bomberman.


## MVP (DOM - CANVAS)
MVP allows to move the player across the board and plant a bomb. Will be in canvas.


## Backlog
Sounds in actions
Items appears in the game to power up things.
Differents scenarios
Differents levels of dificulties
Two players game

## Data structure

###Game.js
```
function Game(canvas, initCredits) {
  this.grid = null;
  this.player = null;
  this.credits = initCredits;
  this.enemies = [];
  this.bombs = [];
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.gameOver = false;
  this.winner = false;
}

movePlayer()
plantBomb()
moveEnemies()
dead()
checkIfWinner()
startLoop()
explosion()
clearCanvas()
updateCanvas()
setGameOverCallBack() 
setGameOverWithLifesCallBack()
setWinnerCallBack()
```



###Player.js
```
function Player(canvas){
  this.posX = 1;
  this.posY = 1;
  this.bombsAvailable = 4;
  this.speed = 1;
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
}

move()
nextPosition()
addBombsAvailable()
reduceBombsAvailable()
```

###Enemy.js
```
function Enemy(canvas, initX, initY){
  this.posX = initX;
  this.posY = initY;
  this.speed = 750; //milliSeconds by square;
  this.lastMove = Date.now();
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.enemyImage = new Image();
  this.enemyImage.src = "./img/enemy.png";
}

canIMoveNow()
move()
NextPosition()
print()
kills()
GenerateRandomMovement()
```

###Grid.js
```
function Grid(canvas){

  this.board = [[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.wallImage = new Image();
  this.woodImage = new Image();
  this.groundImage = new Image();
  this.bombermanImage = new Image();
  this.bombImage = new Image();
  this.fireImage = new Image();
  this.enemyImage = new Image();
}

Grid.prototype.configureBoard()
Grid.prototype.getCellElement()
Grid.prototype.removeFromGrid()
Grid.prototype.putInGrid()
```

###Bomb.js
```
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
  this.fireImage = new Image();
}

print()
printFire()
checkIfExplodes()
makeExplode()
checkRemoveFire()
getFireCells()
```

## States y States Transitions
splashScreen
GameScreen
GameOverScreen
GameWinScreen


## Task
Splash, game and gameover pages
Game - startLoop()
Game - DrawingBoard
Grid - configureBoard()
Grid - getCellElement()
Grid - removeFromGrid()
Grid - putInGrid()
Player - move()
Player - nextPosition()
Player -  addBombsAvailable()
Player - reduceBombsAvailable()
Game - Game logic to interact with player
Bomb - print()
Bomb - printFire()
Bomb - checkIfExplodes()
Bomb - makeExplode()
Bomb - checkRemoveFire()
Bomb - getFireCells()
Game - Game logic to interact with boms
Enemy - canIMoveNow()
Enemy - move()
Enemy - NextPosition()
Enemy - print()
Enemy - kills()
Enemy - GenerateRandomMovement()
Game - Game logic to interact with boms
Game - Game over




## Links


### Trello
[Link url](https://trello.com)


### Git
URls for the project repo and deploy
[Link Repo](http://github.com)
[Link Deploy](http://github.com)


### Slides
URls for the project presentation (slides)
[Link Slides.com](http://slides.com)