'use strict'
$(document).ready(() => {
  var items = $(".btn")
  let buttons = ["green", "red", "blue", "yellow"];
  let simonList = [];
  let userList = [];
  let lvlNr = 1;
  let end = false;
  var lbutton;

//Adds listeners to buttons
  function listenerAdd (switcher){
  $(".btn").on("click", switcher)
  };

//Plays sound and animates the button user clicked, then calls check()
  function switcher() {
    lbutton = this.id;
    switch (lbutton) {
      case "green":
      let green = new Audio ("sounds/green.mp3")
      addAnimation(lbutton);
      green.play();
      userList.push(lbutton);
      check()
      break;
      case "yellow":
      let yellow = new Audio ("sounds/yellow.mp3")
      addAnimation(lbutton);
      yellow.play();
      userList.push(lbutton);
      check()
      break;
      case "blue":
      let blue = new Audio ("sounds/blue.mp3")
      addAnimation(lbutton);
      blue.play();
      userList.push(lbutton);
      check()
      break;
      case "red":
      let red = new Audio ("sounds/red.mp3")
      addAnimation(lbutton);
      red.play();
      userList.push(lbutton);
      check();
      break;
    }
  };

//Main function
  function simon() {
    $(document).off(); // --> removes event listener that trigers this function (click on "A" button to start the game), which prevents undesired behaviour if user clicks on the "A" button more than once
    if (!end) {
      $("#level-title").html("Level " + lvlNr)
      userList = [];
      let buttonIndex = Math.ceil(4 * Math.random());
      if (simonList.length === 0) {
        simonList.push(buttons[buttonIndex - 1]);
        addAnimation(buttons[buttonIndex - 1]);
        simonSound();
        lvlNr++;
        listenerAdd(switcher);
      }
      else {
        simonList.push(buttons[buttonIndex - 1]);

        var animationTimeOut = setTimeout(function(){
          addAnimation(buttons[buttonIndex - 1])
        }, 2000);

        var soundTimeOut = setTimeout(simonSound, 2000);

        lvlNr++;

        var listenerTimeout = setTimeout(function() {listenerAdd(switcher)}, 2000);
      }
    }
  }

//Performs check with the simon sequence (simonList) everytime user clicks the button
  function check() {
    for (let i = 0; i < userList.length; i++) {
      if (simonList[i] !== userList[i]) {
        gameOver()
      }

      if (simonList.length === userList.length && i === (userList.length - 1)) {
        listenerRemove();
        simon();
      }
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

    $(document.documentElement).one("keydown", function(){
      lvlNr = 1;
      userList = [];
      simonList = [];
      end = false;
      simon();

    });
  }

//Animates buttons
  function addAnimation(lbutton) {
    var animatedElement = $("." + lbutton);
    animatedElement.addClass("pressed");
    setTimeout(function () {
      animatedElement.removeClass("pressed")
    }, 100)

  }

//Plays sound corresponding to a button
  function simonSound() {
    var computerSound = new Audio ("sounds/" + simonList[simonList.length - 1] + ".mp3");
    computerSound.play();
  }

  function listenerRemove() {
    $(".btn").off();
  };

//Adds event listener that starts the game when user presses "A" button
  $(document).on("keydown", function(event){
    if (event.key === "a"){
      simon();
    }
  })
})