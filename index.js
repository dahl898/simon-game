'use strict'
$(function () {
  let buttons = ["green", "red", "blue", "yellow"];
  let simonList = [];
  let userList = [];
  let lvlNr = 1;
  let end = false;

  startSimonWithA();
//Creates and object to handle every button animation and sound effect without if/else statements (will not work in Node, since Audio object is only available in browser)
  class SimonButton extends Audio {
    constructor(color) {
      const soundPath = "sounds/" + color + ".mp3"
      super(soundPath)
      this.color = color
    }

    animate() {
      const button = $('#' + this.color);
      button.addClass('pressed');
      setTimeout(() => {
        button.removeClass('pressed')
      }, 100)
    }

  }

//Adds listeners to buttons
  function addListener (){
    $(".btn").on("click", (event) => {
      const button = new SimonButton(event.target.id);
      button.play();
      button.animate();
      userList.push(event.target.id);
      check()
    })
  };

//Main function
  function simon() {
    // $(document).off(); // --> removes event listener that trigers this function (click on "A" button to start the game), which prevents undesired behaviour if user clicks on the "A" button more than once
    if (!end) {
      $("#level-title").html("Level " + lvlNr)
      userList = [];
      const buttonIndex = Math.ceil(4 * Math.random());
      const buttonColor = buttons[buttonIndex - 1]
      const button = new SimonButton(buttonColor)
      simonList.push(buttonColor);
      console.log('pushed to simon')
      window.simonList = simonList;
      setTimeout(() => {
        console.log('simonList in simon(): ' + simonList)
        if(!end) {
          button.animate()
          button.play()
          addListener()
          lvlNr++;
        }
        
      }, 2000);
    }
  }

//Performs check with the simon sequence (simonList) everytime user clicks the button
  function check() {
    for (let i = 0; i < userList.length; i++) {
      if (simonList[i] !== userList[i]) {
        gameOver()
      }
    }

    if (simonList.length === userList.length) {
      listenerRemove();
      simon();
    }
  }

//Shows "Game Over" screen and removes event listeners from buttons
  function gameOver() {
    end = true;
    var gameOverSound = new Audio ("sounds/wrong.mp3");
    gameOverSound.play();
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);

    $("#level-title").text("Game Over. Press any key to restart.")
    listenerRemove()

    $(document).one("keydown", reset);
    
  }

  function reset() {
    lvlNr = 1;
    userList = [];
    simonList = [];
    end = true;
    console.log('reset fired')
    $('#level-title').text('Press A Key to Start')
    startSimonWithA();
  }

  $('.reset').on('click', () => {
    listenerRemove()
    reset()
  })

  function listenerRemove() {
    $(".btn").off();
  };

//Adds event listener that starts the game when user presses "A" button
  function startSimonWithA() {
    $(document).one("keydown", function(event){
      if (event.key === "a"){
        end = false;
        simon();
      }
    })
  }
})

