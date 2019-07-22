var params = {
  output: document.getElementById('output'),
  result: document.getElementById('result'),
  container: document.getElementById('container'),
  moves: document.querySelectorAll('.player-move'),
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
  params.output.classList.remove('win', 'draw', 'lose');
  var choice = computerMove();  
  

  if(choice === 1 && moveId == 'papier'){
    params.output.innerHTML = 'DRAW <br>you played PAPER, computer also played PAPER';    
    params.output.classList.add('draw');
  }
  else if(choice === 1 && moveId == 'kamien'){
    params.output.innerHTML = 'YOU LOSE <br>you played ROCK, computer played PAPER';    
    params.output.classList.add('lose');
    params.computerScore +=1;    
  }
  else if(choice === 1 && moveId == 'nozyce'){
    params.output.innerHTML = 'YOU WON <br>you played SCISSORS, computer played PAPER';   
    params.output.classList.add('win');
    params.playerScore +=1;    
  }
  else if(choice === 2 && moveId == 'papier'){
    params.output.innerHTML = 'YOU WON <br>you played PAPER, computer played ROCK';    
    params.output.classList.add('win');
    params.playerScore +=1;    
  }
  else if(choice === 2 && moveId == 'kamien'){
    params.output.innerHTML = 'DRAW <br>you played ROCK, computer played ROCK';   
    params.output.classList.add('draw');
  }
  else if(choice === 2 && moveId == 'nozyce'){
    params.output.innerHTML = 'YOU LOSE <br>you played SCISSORS, computer played ROCK';    
    params.output.classList.add('lose');
    params.computerScore +=1;   
  }
  else if(choice === 3 && moveId == 'papier'){
    params.output.innerHTML = 'YOU LOSE <br>you played PAPER, computer played SCISSORS';    
    params.output.classList.add('lose');
    params.computerScore +=1;    
  }
  else if(choice === 3 && moveId == 'kamien'){
    params.output.innerHTML = 'YOU WON <br>you played ROCK, computer played SCISSORS';
    params.output.classList.add('win');
    params.playerScore +=1;    
  }
  else if(choice === 3 && moveId == 'nozyce'){
    params.output.innerHTML = 'DRAW <br>you played SCISSORS, computer played SCISSORS';
    params.output.classList.add('draw');
  }  

  params.result.innerHTML = params.playerScore + " : " + params.computerScore;
  
  function gameOver() {
    params.moves.forEach(move => move.setAttribute('disabled', 'true'));   
    params.container.classList.add('endGame');
  }
  
  function clickButtonAfterEndGame() {      
      document.getElementById('new-game').onclick = function(){
        location.reload(true);        
      }
  } 
  
    if(params.rounds === params.playerScore) {
      //params.output.innerHTML += "<br><br> YOU WON THE ENTIRE GAME!!! <br>Game over, please press the <b>New Game</b> button!";      
      params.output.style.background = "#9ee585";
      gameOver();
      clickButtonAfterEndGame();             
    }
    else if(params.rounds === params.computerScore){
     //params.output.innerHTML += "<br><br> YOU LOST THE ENTIRE GAME :( <br>Game over, please press the <b>New Game</b> button!";
      params.output.style.background = "#e25e4f";
      gameOver(); 
      clickButtonAfterEndGame();           
    } 
  
}

for(var i=0; i<params.moves.length; i++){
  params.moves[i].addEventListener('click', function(event){  
    var dataMove = event.target.getAttribute('data-move');
    playerMove(dataMove);
  });
}

//Modals

(function(){ 
	
	var modals = document.querySelectorAll('.modal');
  
  var modalLinks = document.querySelectorAll('.show-modal');
  
	var showModal = function(event){		
    event.preventDefault();
    modals.forEach(modal => modal.classList.remove('show'));            
    var classFromHref = event.target.getAttribute('href').substr(1);
   
    for(var s=0; s<modals.length; s++){     
      if(modals[s].id === classFromHref){        
          modals[s].classList.add('show');          
      }
    }
		document.querySelector('#modal-overlay').classList.add('show');
	};
	
		
	for(var i = 0; i < modalLinks.length; i++){
		modalLinks[i].addEventListener('click', showModal);
	}
	
	var hideModal = function(event){
		event.preventDefault();
		document.querySelector('#modal-overlay').classList.remove('show');
	};
	
	var closeButtons = document.querySelectorAll('.modal .close');
	
	for(var i = 0; i < closeButtons.length; i++){
		closeButtons[i].addEventListener('click', hideModal);
	}
	
	document.querySelector('#modal-overlay').addEventListener('click', hideModal);
	
	for(var i = 0; i < modals.length; i++){
		modals[i].addEventListener('click', function(event){
			event.stopPropagation();
		});
	}

})(); 