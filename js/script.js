const output = document.getElementById('output');
const result = document.getElementById('result');
const container = document.getElementById('container');
const moves = document.querySelectorAll('.player-move');

var params = {
  playerScore: 0,
  computerScore: 0,
  rounds: null
}

//Funkcja new game
function askNumberOfGames() {   
  var question = prompt("How many rounds end the game?", 5);
  document.getElementById('container').style.display="flex";
  
  if(question != null){
    
    document.getElementById('winningGamesNumber').innerHTML = "You have " + question + " rounds.";     
  }   
  params.rounds = parseInt(question); 
  
}


//Funkcja losująca
function computerMove(){
  var choice = Math.floor(Math.random()*3+1);  
  return choice;
}

//Funkcja playerMove
function playerMove(moveId){  
  output.classList.remove('win', 'draw', 'lose');
  var choice = computerMove();  
  

  if(choice === 1 && moveId == 'papier'){
    output.innerHTML = 'DRAW <br>you played PAPER, computer also played PAPER';    
    output.classList.add('draw');
  }
  else if(choice === 1 && moveId == 'kamien'){
    output.innerHTML = 'YOU LOSE <br>you played ROCK, computer played PAPER';    
    output.classList.add('lose');
    params.computerScore +=1;    
  }
  else if(choice === 1 && moveId == 'nozyce'){
    output.innerHTML = 'YOU WON <br>you played SCISSORS, computer played PAPER';   
    output.classList.add('win');
    params.playerScore +=1;    
  }
  else if(choice === 2 && moveId == 'papier'){
    output.innerHTML = 'YOU WON <br>you played PAPER, computer played ROCK';    
    output.classList.add('win');
    params.playerScore +=1;    
  }
  else if(choice === 2 && moveId == 'kamien'){
    output.innerHTML = 'DRAW <br>you played ROCK, computer played ROCK';   
    output.classList.add('draw');
  }
  else if(choice === 2 && moveId == 'nozyce'){
    output.innerHTML = 'YOU LOSE <br>you played SCISSORS, computer played ROCK';    
    output.classList.add('lose');
    params.computerScore +=1;   
  }
  else if(choice === 3 && moveId == 'papier'){
    output.innerHTML = 'YOU LOSE <br>you played PAPER, computer played SCISSORS';    
    output.classList.add('lose');
    params.computerScore +=1;    
  }
  else if(choice === 3 && moveId == 'kamien'){
    output.innerHTML = 'YOU WON <br>you played ROCK, computer played SCISSORS';
    output.classList.add('win');
    params.playerScore +=1;    
  }
  else if(choice === 3 && moveId == 'nozyce'){
    output.innerHTML = 'DRAW <br>you played SCISSORS, computer played SCISSORS';
    output.classList.add('draw');
  }  

  result.innerHTML = params.playerScore + " : " + params.computerScore;
  
  function gameOver() {
    moves.forEach(move => move.setAttribute('disabled', 'true'));   
    container.classList.add('endGame');
  }
  
  function clickButtonAfterEndGame() {      
      document.getElementById('new-game').onclick = function(){
        location.reload(true);        
      }
  } 
  
    if(params.rounds === params.playerScore) {
      output.innerHTML += "<br><br> YOU WON THE ENTIRE GAME!!! <br>Game over, please press the <b>New Game</b> button!";      
      output.style.background = "#9ee585";
      gameOver();
      clickButtonAfterEndGame();             
    }
    else if(params.rounds === params.computerScore){
      output.innerHTML += "<br><br> YOU LOST THE ENTIRE GAME :( <br>Game over, please press the <b>New Game</b> button!";
      output.style.background = "#e25e4f";
      gameOver(); 
      clickButtonAfterEndGame();           
    } 
  
}

for(var i=0; i<moves.length; i++){
  moves[i].addEventListener('click', function(event){  
    var dataMove = event.target.getAttribute('data-move');
    playerMove(dataMove);
  });
}
