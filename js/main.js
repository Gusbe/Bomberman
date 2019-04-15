'use scrict';

function main(){
  
  const mainElement = document.querySelector('main');

  function buildDom(html){

    mainElement.innerHTML = html;

    return mainElement;
  }


  function buildSplashScreen(){

    buildDom(`
    <section>
      <img id="title" src="./img/menu.jpg">
      <a id="play" href="#">PLAY GAME</a>
      <p id="instructions-title">Instructions:</p>
      <p  id="instructions">Move the player with the arrows. Put a bomb with the space bar.</p>
      <p  id="instructions">Destroy all the enemies before the times up. Don't explode yourself :)</p>

      <audio src="/sound/title.mp3" controls autoplay loop>
    </section>`);
    const startButton = document.querySelector('#play');
    startButton.addEventListener('click', buildGameScreen);
  }


  function buildGameScreen(){

    const gameScreen = buildDom("<section><canvas class=\"game-container\"></canvas><audio src=\"/sound/game.mp3\" controls autoplay></section>");
    
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

    buildDom("<section><h1>Game Over :(</h1><button class=\"restart-button\">Restart?</button><audio src=\"/sound/gameover.mp3\" controls autoplay loop></section>");
    const restartButton = document.querySelector('.restart-button');
    restartButton.addEventListener('click',buildGameScreen);
  }

  function buildGameOverWithLifesScreen(){
    
    buildDom("<section><h1>Game Over. But you can still playing! :)</h1><button class=\"restart-button\">Restart?</button><audio src=\"/sound/gameover.mp3\" controls autoplay></section>");
    const restartButton = document.querySelector('.restart-button');
    restartButton.addEventListener('click',buildGameScreen);
  }

  function buildWinnerScreen(){
    
    buildDom("<section><h1>You win!</h1><button class=\"restart-button\">Restart?</button><audio src=\"/sound/complete.mp3\" controls autoplay></section>");
    const restartButton = document.querySelector('.restart-button');
    restartButton.addEventListener('click',buildGameScreen);
  }

  buildSplashScreen();
}

window.addEventListener('load', main());