var params = {
  output: document.getElementById('output'),
  result: document.getElementById('result'),
  container: document.getElementById('container'),
  moves: document.querySelectorAll('.player-move'),
  modals: document.querySelectorAll('.modal'), 
  playerScore: 0,
  computerScore: 0,
  rounds: null,
  progress: [],
  clickCount: 0,
  playerMovesTable: [],
  choice: null,
  compMovesTable: [],
  compMove: '',
  roundResult: [],  
  scoreAfterRound: []
}

// new game function
function askNumberOfGames() {   
  var question = prompt("How many rounds end the game?", 5);
  document.getElementById('container').style.display="flex";
  
  if(question != null){
    
    document.getElementById('winningGamesNumber').innerHTML = "You have to win " + question + " times.";     
  }else if(question == null){
    location.reload(true); 
  } 
  params.rounds = parseInt(question);    
}


//random function
function computerMove(){
  params.choice = Math.floor(Math.random()*3+1); 
  return params.choice;  
}

//playerMove function
function playerMove(moveId){  
  params.output.classList.remove('win', 'draw', 'lose');  

  if(params.choice === 1 && moveId == 'paper'){
    params.output.innerHTML = 'DRAW <br>you played PAPER, computer also played PAPER';    
    params.output.classList.add('draw');
  }
  else if(params.choice === 1 && moveId == 'rock'){
    params.output.innerHTML = 'YOU LOSE <br>you played ROCK, computer played PAPER';    
    params.output.classList.add('lose');
    params.computerScore +=1;    
  }
  else if(params.choice === 1 && moveId == 'scissors'){
    params.output.innerHTML = 'YOU WON <br>you played SCISSORS, computer played PAPER';   
    params.output.classList.add('win');
    params.playerScore +=1;    
  }
  else if(params.choice === 2 && moveId == 'paper'){
    params.output.innerHTML = 'YOU WON <br>you played PAPER, computer played ROCK';    
    params.output.classList.add('win');
    params.playerScore +=1;    
  }
  else if(params.choice === 2 && moveId == 'rock'){
    params.output.innerHTML = 'DRAW <br>you played ROCK, computer played ROCK';   
    params.output.classList.add('draw');
  }
  else if(params.choice === 2 && moveId == 'scissors'){
    params.output.innerHTML = 'YOU LOSE <br>you played SCISSORS, computer played ROCK';    
    params.output.classList.add('lose');
    params.computerScore +=1;   
  }
  else if(params.choice === 3 && moveId == 'paper'){
    params.output.innerHTML = 'YOU LOSE <br>you played PAPER, computer played SCISSORS';    
    params.output.classList.add('lose');
    params.computerScore +=1;    
  }
  else if(params.choice === 3 && moveId == 'rock'){
    params.output.innerHTML = 'YOU WON <br>you played ROCK, computer played SCISSORS';
    params.output.classList.add('win');
    params.playerScore +=1;    
  }
  else if(params.choice === 3 && moveId == 'scissors'){
    params.output.innerHTML = 'DRAW <br>you played SCISSORS, computer played SCISSORS';
    params.output.classList.add('draw');
  }  
  params.result.innerHTML = params.playerScore + " : " + params.computerScore;
  params.scoreAfterRound.push(params.result.innerHTML); 
  params.clickCount++    
 
  
  //gameOver function
  function gameOver() {
    params.moves.forEach(move => move.setAttribute('disabled', 'true'));   
    params.container.classList.add('endGame');   
    
    var outputColor = params.output.getAttribute('class');
    
    //Modals
    (function(){       

      function showModal(event){		
        event.preventDefault();
        params.modals.forEach(modal => modal.classList.remove('show'));         

        for(var s=0; s<params.modals.length; s++){     
          if(params.modals[s].id === outputColor){        
              params.modals[s].classList.add('show');          
          }
        }

        document.querySelector('#modal-overlay').classList.add('show');
      } 

      showModal(event);
      
      var hideModal = function(event){
        event.preventDefault();
        document.querySelector('#modal-overlay').classList.remove('show');
      };
      
      var closeButtons = document.querySelectorAll('.modal .close');
      
      for(var i = 0; i < closeButtons.length; i++){
        closeButtons[i].addEventListener('click', hideModal);
      }
      
      document.querySelector('#modal-overlay').addEventListener('click', hideModal);
      
      for(var i = 0; i < params.modals.length; i++){
        params.modals[i].addEventListener('click', function(event){
          event.stopPropagation();
        });
      }
      
    })();

    //Score table variables  
    params.progress = {      
      playMove: params.playerMovesTable,
      compMove: params.compMovesTable,
      roundScore: params.roundResult,
      gameScore: params.scoreAfterRound
    };   

    //Score table display
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var trh = document.createElement('tr');
    var tbody = document.createElement('tbody');

    for(var n=0; n<params.modals.length; n++){         
      if(params.modals[n].id === outputColor){
        params.modals[n].appendChild(table);
        table.appendChild(thead);
        thead.appendChild(trh);
        table.appendChild(tbody);
      }
    }
    for(var h=0; h<5; h++){
      var th = document.createElement('th');
      th.id = 'th'+ h;
      trh.appendChild(th);
    }
    document.getElementById('th0').innerHTML = 'Round nr';
    document.getElementById('th1').innerHTML = 'Player move';
    document.getElementById('th2').innerHTML = 'Computer move';
    document.getElementById('th3').innerHTML = 'Result';
    document.getElementById('th4').innerHTML = 'Score';
    
    for(var j=0; j<params.clickCount; j++){      
      var tr = document.createElement('tr'); 
      tr.id = 'tr' + j;           

      for(var m=0; m<params.modals.length; m++){         
        if(params.modals[m].id === outputColor){
          tbody.appendChild(tr); 

          for(var z=0; z<5; z++){
            var td = document.createElement('td');                      
            tr.appendChild(td);           
          }          
        }                      
      }
      //Round number display     
      document.querySelectorAll('tr')[j+1].querySelectorAll('td')[0].innerHTML = j+1;   
      //Player move display
      document.querySelectorAll('tr')[j+1].querySelectorAll('td')[1].innerHTML = params.progress.playMove[j];          
      //computer move display
      document.querySelectorAll('tr')[j+1].querySelectorAll('td')[2].innerHTML = params.progress.compMove[j];
      //score display
      document.querySelectorAll('tr')[j+1].querySelectorAll('td')[3].innerHTML = params.progress.roundScore[j];
      //round score display
      document.querySelectorAll('tr')[j+1].querySelectorAll('td')[4].innerHTML = params.progress.gameScore[j];
    } 

  }
  
  //Reset game function
  function clickButtonAfterEndGame() {      
      document.getElementById('new-game').onclick = function(){
        location.reload(true);        
      }
  } 
  
  //Game over conditions:
    //player wins
    if(params.rounds === params.playerScore) {      
      params.output.style.background = "#9ee585";
      gameOver();
      clickButtonAfterEndGame();             
    } //computer wins
    else if(params.rounds === params.computerScore){     
      params.output.style.background = "#e25e4f";
      gameOver(); 
      clickButtonAfterEndGame();           
    }      
  
}   

//OnClick event on buttons: paper, rock, scissors 
for(var i=0; i<params.moves.length; i++){
  params.moves[i].addEventListener('click', function(event){  
    var dataMove = event.target.getAttribute('data-move');
    computerMove(); 
    console.log(params.choice)  ; 

    if(params.choice === 1){
      params.compMove = 'paper';
    }else if(params.choice === 2){
      params.compMove = 'rock'
    }else if(params.choice === 3){
      params.compMove = 'scissors'
    }

    params.compMovesTable.push(params.compMove);    
    console.log('computer moves: ' + params.compMovesTable);

    playerMove(dataMove);      
    params.playerMovesTable.push(dataMove);
    console.log('player moves: ' + params.playerMovesTable);

    params.roundResult.push(params.output.className);
    console.log(params.roundResult);
  });
}

