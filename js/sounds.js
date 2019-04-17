function Sounds(){

  this.bomb =  document.createElement("audio");
  this.bomb.src = ("../sound/sound-bomb.mp3");

  this.powerUp =  document.createElement("audio");
  this.powerUp.src = ("../sound/sound-powerup.wav");
}

Sounds.prototype.play = function (event){

    switch (event){

      case 'explosion': this.bomb.play(); this.bomb.volume = 0.7;
                        break;
      case 'powerUp':   this.powerUp.play(); this.bomb.volume = 0.7;
                        break;
    }
    
    
}