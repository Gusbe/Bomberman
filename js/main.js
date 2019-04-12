'use scrict';

function main(){
  
  const mainElement = document.querySelector('main');

  function buildDom(html){

    mainElement.innerHTML = html;

    return mainElement;
  }

  function buildSplashScreen(){

    const splashScreen = buildDom("<section><h1>Bomberman Splash page</h1><button class=\"start-button\">Start</button></section>");
    const startButton = document.querySelector('.start-button');
    startButton.addEventListener('click', buildGameScreen);
  }

  function buildGameScreen(){

    const gameScreen = buildDom("<section><canvas class=\"game-container\"></canvas></section>");
    
    //make the canvas fits in the screen
    const gameContainerElement = document.querySelector('.game-container');
    console.log(gameContainerElement);
    const width = gameContainerElement.offsetWidth;
    const height = gameContainerElement.offsetHeight;

    const canvasElement = document.querySelector('canvas');
    canvasElement.setAttribute('width', width);
    canvasElement.setAttribute('height', height);

    //Here starts the game
  
  }

  function buildGameOverScreen(){

    const gameOverScreen = buildDom("<section><h1>Game Over :(</h1><button class=\"restart-button\">Restart?</button></section>");
    const restartButton = document.querySelector('.restart-button');
    restartButton.addEventListener('click',buildGameScreen);
  }

  function buildWinnerScreen(){

    const winnerScreen = buildDom("<section><h1>You win! :)</h1><button class=\"restart-button\">Restart?</button></section>");
    const restartButton = document.querySelector('.restart-button');
    restartButton.addEventListener('click',buildGameScreen);
  }

  buildSplashScreen();
}

window.addEventListener('load', main());