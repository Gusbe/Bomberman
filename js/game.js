'use scrict'

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
  this.timeStart = Date.now();
  this.timer = 100; //Seconds
  this.sounds = new Sounds();
}

Game.prototype.movePlayer = function (direction) {

  let nextCoordinates = this.player.nextPosition(direction);
  let element = this.grid.getCellElement(nextCoordinates[0],nextCoordinates[1]);

  switch(element){

    case 'X':
              if(this.grid.getCellElement(this.player.posX,this.player.posY) !== 'B'){
                this.grid.putInGrid('X',this.player.posX,this.player.posY);
              } 
              this.player.move(nextCoordinates[0],nextCoordinates[1]);
              this.grid.putInGrid('P',nextCoordinates[0],nextCoordinates[1]);
              break;
    case 'W': break; //nothing
    case 'B': break; //nothing
    case 'S': break; //nothing
    case 'R': 
              this.sounds.play('powerUp');          
              this.grid.putInGrid('X',this.player.posX,this.player.posY);
              this.player.move(nextCoordinates[0],nextCoordinates[1]);
              this.grid.putInGrid('P',nextCoordinates[0],nextCoordinates[1]);
              this.refreshScreen();
              this.player.addBombsRange();
              break;

    case 'A':
              this.sounds.play('powerUp');
              this.grid.putInGrid('X',this.player.posX,this.player.posY);
              this.player.move(nextCoordinates[0],nextCoordinates[1]);
              this.grid.putInGrid('P',nextCoordinates[0],nextCoordinates[1]);
              this.refreshScreen();
              this.player.addBombsAvailable();
              break;
    case 'L': 
              this.sounds.play('speed');
              this.grid.putInGrid('X',this.player.posX,this.player.posY);
              this.player.move(nextCoordinates[0],nextCoordinates[1]);
              this.grid.putInGrid('P',nextCoordinates[0],nextCoordinates[1]);
              this.refreshScreen();
              this.incrementSpeedEnemies();
              break;

    case 'D': //Death
              this.grid.putInGrid('X',this.player.posX,this.player.posY);
              this.player.move(nextCoordinates[0],nextCoordinates[1]);
              this.grid.putInGrid('P',nextCoordinates[0],nextCoordinates[1]);
              this.refreshScreen();
              this.dead();
              break; 
    case 'E': //Enemy
              this.grid.putInGrid('X',this.player.posX,this.player.posY);
              this.player.move(nextCoordinates[0],nextCoordinates[1]);
              this.grid.putInGrid('P',nextCoordinates[0],nextCoordinates[1]);
              this.refreshScreen();
              this.dead();
              break; 
    case 'F': this.dead(); break;
    
  }
}

Game.prototype.plantBomb = function () {

  if(this.player.bombsAvailable > 0){

    this.sounds.play('plant');
    this.player.bombsAvailable--;
    this.bombs.push(new Bomb(this.canvas,this.player.posX,this.player.posY,this.player.rangeBombs));
    this.grid.putInGrid('B',this.player.posX,this.player.posY);
  }
}

Game.prototype.incrementSpeedEnemies = function () {

  for(let i = 0 ; i < this.enemies.length ; i++){
  
    this.enemies[i].incrementSpeed();
  }
}

Game.prototype.moveEnemies = function (grid) {

  for(let i = 0 ; i < this.enemies.length ; i++){
    
    if(this.enemies[i].canIMoveNow()){

      this.grid.putInGrid('X',this.enemies[i].posX,this.enemies[i].posY);
      this.enemies[i].GenerateRandomMovement(grid);
    
      if(this.grid.getCellElement(this.enemies[i].posX,this.enemies[i].posY) === 'F'){

        this.sounds.play('enemyDies');
        this.enemies.splice(i,1);
      }
      else if(this.enemies[i].kills(this.player.posX, this.player.posY)){
        
        this.dead();
      }
      else{

        this.grid.putInGrid('E',this.enemies[i].posX,this.enemies[i].posY);
      }
    }
  }
}

Game.prototype.dead = function (causeOfDeath) {

  this.player.printDead(causeOfDeath);
  this.credits--;
  this.gameOver = true;
}

Game.prototype.checkIfWinner = function () {

  if(this.enemies.length === 0){
  
    this.winner = true;
  }
}

Game.prototype.startLoop = function () {

  
  this.updateScreenLifes();
  this.grid = new Grid(this.canvas);
  this.grid.configureBoard();

  this.player = new Player(this.canvas);

  //Creates the 5 enemies in its start position
  this.enemies.push(new Enemy(this.canvas,18,1));
  this.enemies.push(new Enemy(this.canvas,17,11));
  this.enemies.push(new Enemy(this.canvas,3,11));
  this.enemies.push(new Enemy(this.canvas,4,5));
  this.enemies.push(new Enemy(this.canvas,11,7));

  //LOOP
  const loop = () => {
    
    //If the game is not over
    if(!this.gameOver){

      this.refreshScreen();
      this.checkIfWinner();

      this.updateScreenCounters(this.player.bombsAvailable);
    }

    if (this.timeUp() <= 0) this.dead();  //If the time is over, player dies
    
    this.moveEnemies(this.grid);  //Moves all the enemies alive

    //Explodes the bombs and extinguishes fires
    for(let i = 0 ; i < this.bombs.length ; i++){

      //Checks the bombs and explodes the ones that has to explode
      if(this.bombs[i].checkIfExplodes()){

        this.explosion(this.bombs[i]);
        this.player.bombsAvailable++;

      }

      //Checks the bombs and extinguish the ones that has to extinguish
      if(this.bombs[i].checkRemoveFire()){
        
        for(let j = 0 ; j < this.bombs[i].fireCells.length ; j++){
          
          if( this.grid.getCellElement(this.bombs[i].fireCells[j][0], this.bombs[i].fireCells[j][1]) !== 'R'
              && this.grid.getCellElement(this.bombs[i].fireCells[j][0], this.bombs[i].fireCells[j][1]) !== 'A'
              && this.grid.getCellElement(this.bombs[i].fireCells[j][0], this.bombs[i].fireCells[j][1]) !== 'L'
              && this.grid.getCellElement(this.bombs[i].fireCells[j][0], this.bombs[i].fireCells[j][1]) !== 'D'){

                this.grid.putInGrid('X', this.bombs[i].fireCells[j][0],  this.bombs[i].fireCells[j][1]);
                
          }
        }
        this.bombs.splice(i, 1);  //removes the bomb exploded from the array.
      }
    }
    
    if(!this.gameOver && !this.winner) {  //If the game still on going

      window.requestAnimationFrame(loop);
    }
    else if(this.winner){ //If all the enemies are killed. Wins

      setTimeout(this.buildWinnerScreen,2000);
    }
    else if(this.credits > 0){  //If the player is dead but still has lifes

      this.sounds.play('dead');
      setTimeout( () => { this.buildGameOverWithLifesScreen(this.credits)} , 2000);
    }
    else if(this.credits === 0){

      this.sounds.play('dead');  //IF the player is dead and doesn't has more lifes.
      setTimeout(this.buildGameOverScreen,2000);
    }
    
    
  }
  
    window.requestAnimationFrame(loop); //Calling again the loop.
    
  
}

Game.prototype.explosion = function (bomb) {
  
  this.sounds.play('explosion');

  let fireCells = bomb.getFireCells(this.grid);
  let playerDead = false;
  let arrayPowerUps = [];

  for(let i = 0 ; i < fireCells.length ; i++){
  
    switch (this.grid.getCellElement(fireCells[i][0],fireCells[i][1])){

      case 'P': //Kills the player
                playerDead = true;
                break;

      case 'S': //Breaks the wall & generate the powerUp
                let powerUp = this.grid.roulettePowerUp();
                
                if(!powerUp){

                  this.grid.putInGrid('X', fireCells[i][0], fireCells[i][1]);
                }
                else{

                  arrayPowerUps.push([powerUp,fireCells[i][0], fireCells[i][1]]);
                }
                break;

      case 'E': //Kills the enemy
                this.sounds.play('enemyDies');

                for( let j = 0 ; j < this.enemies.length ; j++){
                
                  if(this.enemies[j].posX === fireCells[i][0] && this.enemies[j].posY === fireCells[i][1]){

                    this.enemies.splice(j,1);
                    this.grid.putInGrid('X', fireCells[i][0], fireCells[i][1]);
                  }
                }
                break;

      case 'B': //Explodes the near bomb
                for( let j = 0 ; j < this.bombs.length ; j++){
      
                  this.bombs[j].makeExplode(fireCells[i][0], fireCells[i][1]);
                }
                break;
    }

    this.grid.putInGrid('F', fireCells[i][0], fireCells[i][1]); //Put fire in the grid

    if(this.player.posX === fireCells[i][0] && this.player.posY === fireCells[i][1]){ //if the player is in the same cell than the bomb
      
      playerDead = true;
    }

    for(let k = 0 ; k < arrayPowerUps.length ; k++){

      this.grid.putInGrid(...arrayPowerUps[k]);
    }
  }

  if(playerDead){

    this.refreshScreen();
    this.dead('fire');
  }
  
}


Game.prototype.refreshScreen = function() {

  this.clearCanvas(); //Deletes all in the canvas
  this.grid.printBoard(); //Print board in the canvas
  this.updateCanvas();  //Prints elements in the canvas
}

Game.prototype.clearCanvas = function () {

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.updateCanvas = function () {

  this.bombs.forEach( function(bomb) {

    bomb.print();
  });
  
  this.enemies.forEach( function(enemy) {

    enemy.print();
  });
  
  this.player.print();
}

Game.prototype.updateScreenCounters = function (numberOfBombs){

  let bombsInfo = document.getElementById('bombs');
  let timeInfo = document.getElementById('time');
  
  let bombsScreen = "";
  for (let i = 0 ; i < numberOfBombs ; i ++){

    bombsScreen = bombsScreen + `<img src="./img/bomb.png" id="bombsScreen">`;
  }
  bombsInfo.innerHTML = bombsScreen;
  timeInfo.innerHTML = "Time: " + this.timeUp();
}

Game.prototype.updateScreenLifes = function (){

  let lifes = document.getElementById('lifes');
  
  let lifesScreen = "Lifes: ";
  for (let i = 0 ; i < this.credits ; i ++){
    
    lifesScreen = lifesScreen + `<img src="./img/bomberman.gif" id="bombsScreen">`;
  }
  lifes.innerHTML = lifesScreen;
}



Game.prototype.timeUp = function (){

  return Math.floor(this.timer - (Date.now()-this.timeStart)/1000);
}

Game.prototype.setGameOverCallBack = function(buildGameOverScreen){  //To have access on fucntion in another files
  
  this.buildGameOverScreen = buildGameOverScreen;
}

Game.prototype.setGameOverWithLifesCallBack = function(buildGameOverWithLifesScreen){  //To have access on fucntion in another files
  
  this.buildGameOverWithLifesScreen = buildGameOverWithLifesScreen;
}

Game.prototype.setWinnerCallBack = function(buildWinnerScreen){  //To have access on fucntion in another files
  
  this.buildWinnerScreen = buildWinnerScreen;
}