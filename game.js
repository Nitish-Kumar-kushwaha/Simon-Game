
var buttonColor= ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPatterns = [];

var started = false;

var level = 0;

$(document).click(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true; 
  }
})


$(".btn").click( function() {

  var userChosenColor = $(this).attr("id");
  userClickPatterns.push(userChosenColor);

  // console.log(userClickPatterns);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickPatterns.length-1);
})

function checkAnswer( currentLevel){
  if(gamePattern[currentLevel] == userClickPatterns[currentLevel]){
    console.log("Success");

    if(userClickPatterns.length == gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }

  else {

    console.log("Fail");

    playSound("Wrong");

    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over , Press Any Key to Restart");

    startOver();
  }
}



function nextSequence(){


  userClickPatterns = [];

  level++;
  
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  
  setTimeout(function (){
    $("#" + currentColor).removeClass("pressed");
  }, 100)
}


function startOver(){


  level = 0;
  gamePattern = [];
  started = false;

}

