'use scrict';

function main(){
  
  const mainElement = document.querySelector('main');

  function buildDom(html){

    mainElement.innerHTML = html;

    return mainElement;
  }


  function buildSplashScreen(){

    buildDom("<section><h1>Bomberman Splash page</h1><button class=\"start-button\">Start</button></section>");
    const startButton = document.querySelector('.start-button');
    startButton.addEventListener('click', buildGameScreen);
  }


  function buildGameScreen(){

    const gameScreen = buildDom("<section><canvas class=\"game-container\"></canvas></section>");
    
    //make the canvas fits in the screen
    const gameContainerElement = document.querySelector('.game-container');
    // const width = gameContainerElement.offsetWidth;
    // const height = gameContainerElement.offsetHeight;
    width = 480;
    height = 352;

    const canvasElement = document.querySelector('canvas');
    canvasElement.setAttribute('width', width);
    canvasElement.setAttribute('height', height);

    //Here starts the game

    const game = new Game(canvasElement,3);
    game.startLoop();
    game.setGameOverCallBack(buildGameOverScreen);
    game.setGameOverWithLifesCallBack(buildGameOverWithLifesScreen);
    game.setWinnerCallBack(buildWinnerScreen);
    
   
 
    document.addEventListener('keydown', function(event){
      
      switch(event.keyCode){
        
        case 16: game.plantBomb(); break; //shift right key
        case 32: game.plantBomb(); break; //Space key
        case 37: game.movePlayer('L'); break; //Left key
        case 38: game.movePlayer('U');  break; //Up key
        case 39: game.movePlayer('R');  break; //Right key
        case 40: game.movePlayer('D');  break; //Down key
        default: break;
      }

      
    });
   
  }

  function buildGameOverScreen(){

    buildDom("<section><h1>Game Over :(</h1><button class=\"restart-button\">Restart?</button></section>");
    const restartButton = document.querySelector('.restart-button');
    restartButton.addEventListener('click',buildGameScreen);
  }

  function buildGameOverWithLifesScreen(){
    
    buildDom("<section><h1>Game Over. But you can still playing! :)</h1><button class=\"restart-button\">Restart?</button></section>");
    const restartButton = document.querySelector('.restart-button');
    restartButton.addEventListener('click',buildGameScreen);
  }

  function buildWinnerScreen(){
    
    buildDom("<section><h1>You win!</h1><button class=\"restart-button\">Restart?</button></section>");
    const restartButton = document.querySelector('.restart-button');
    restartButton.addEventListener('click',buildGameScreen);
  }

  buildSplashScreen();
}

window.addEventListener('load', main());