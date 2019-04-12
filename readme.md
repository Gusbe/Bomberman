# Bomberman

## Description
Javascript version of the game Bomberman.


## MVP (DOM - CANVAS)
MVP allows to move the player across the board and plant a bomb. Will be in canvas.


## Backlog
Enemies with random movements
Sound
Items appears in the game to power up things.
Differents scenarios
Differents levels of dificulties
Two players game

## Data structure

###Game.js
Game() {
  this.player;
  this.enemies;
  this.canvas;
  this.ctx;
  this.gameOver;
}

Game.prototype.startLoop()
Game.prototype.clearCanvas()
Game.prototype.updateCanvas()
Game.prototype.drawCanvas()

###Player.js
Player(){
  this.lifes;
  this.posX;
  this.posY;
  bombsAvailable;
  speed;
}

Player.prototype.move()
Player.prototype.whatsNextCell()
Player.prototype.reduceLifes()
Player.prototype.reduceBombsAvailable()
Player.prototype.addBombsAvailable()
Player.prototype.print()

###Enemy.js
Enemy(){
  this.posX
  this.posY
  this.speed
  this.life
}

Enemy.prototype.setFirstPosition()
Enemy.prototype.GenerateRandomMovement()
Enemy.prototype.move(direction)
Enemy.prototype.print()
Enemy.prototype.remove()

###Grid.js
Grid(){
  this.board = [][];
}

Grid.prototype.printBoard()
Grid.prototype.getCellElement()
Grid.prototype.removeInGrid()
Grid.prototype.putInGrid()

###Bomb.js
Bomb(){
  this.posX
  this.posY
  this.range
  this.timer
  this.owner
}

Bomb.prototype.plant()
Bomb.prototype.print()
Bomb.prototype.delete()
Bomb.prototype.getFireCells()
Bomb.prototype.explode()
Bomb.prototype.printFire()
Bomb.prototype.deleteFire()



## States y States Transitions
splashScreen
Game
GameOver
GameWin


## Task
Splash, game and gameover pages
Game - startLoop()
Game - clearCanvas()
Game - updateCanvas()
Game - drawCanvas()
Grid - printBoard()
Grid - getCellElement()
Grid - removeInGrid()
Grid - putInGrid()
Player - move()
Player - whatsNextCell()
Player - reduceLifes()
Player - reduceBombsAvailable()
Player - addBombsAvailable()
Player - print()
Bomb - plant()
Bomb - print()
Bomb - delete()
Bomb - getFireCells()
Bomb - explode()
Bomb - printFire()
Bomb - deleteFire()
Enemy - setFirstPosition()
Enemy - GenerateRandomMovement()
Enemy - move(direction)
Enemy - print()
Enemy - remove()
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