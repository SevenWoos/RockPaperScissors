let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0, 
  losses: 0, 
  ties: 0
};


function pick_computer_move() {
  const random_number = Math.random();
  let computer_move = '';

  if(random_number >= 0 && random_number < 1/3) {
    computer_move = 'rock';
  }
  else if(random_number >= 1/3 && random_number < 2/3) {
    computer_move = 'paper';
  }
  else if(random_number >= 2/3 && random_number < 1) {
    computer_move = 'scissors';
  }
  return computer_move;
}

// Add Event Listeners
document.querySelector('.js_rock_button')
  .addEventListener('click', () => {
    play_game('rock');
  });

document.querySelector('.js_paper_button')
  .addEventListener('click', () => {
    play_game('paper');
  });

document.querySelector('.js_scissors_button')
  .addEventListener('click', () => {
    play_game('scissors')
  });

document.querySelector('.js_reset_score_button')
  .addEventListener('click', () => {
    reset_score();
  });

document.querySelector('.js_auto_play_button')
  .addEventListener('click', () => {
    auto_play();
  })


function play_game(player_move) {
  const computer_move = pick_computer_move();
  let result = '';

  if(player_move === 'rock') {
    if(computer_move === 'rock') {
      result = 'Tie.';
    }
    else if(computer_move === 'paper') {
      result = 'You lose.';
    }
    else if(computer_move === 'scissors') {
      result = 'You win!';
    }
  }
  else if(player_move === 'paper') {
    if(computer_move === 'rock') {
      result = 'You win!';
    }
    else if(computer_move === 'paper') {
      result = 'Tie.';
    }
    else if(computer_move === 'scissors') {
      result = 'You lose.';
    }
  }
  else if(player_move === 'scissors') {
    if(computer_move === 'rock') {
      result = 'You lose.';
    }
    else if(computer_move === 'paper') {
      result = 'You win!';
    }
    else if(computer_move === 'scissors') {
      result = 'Tie.';
    }
  }

  if(result === 'You win!') {
    score.wins++;
  }
  else if(result === 'You lose.') {
    score.losses++;
  }
  else if(result === 'Tie.') {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  update_score_element();

  document.querySelector('.js_result')
    .innerHTML = result;

  document.querySelector('.js_moves') 
    .innerHTML = `You 
    <img src="images/${player_move}-emoji.png" class="move_icon">
    <img src="images/${computer_move}-emoji.png" class="move_icon">
    Computer`;
}


function update_score_element() {
  document.querySelector('.js_score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}


function reset_score() {
  localStorage.removeItem('score');

  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  update_score_element();
}


let is_autoplaying = false;
let interval_id;

function auto_play() {
  if(!is_autoplaying) {
    interval_id = setInterval(() => {
      const player_move = pick_computer_move();
      play_game(player_move);
    }, 1000);

    is_autoplaying = true;
  }
  else {
    clearInterval(interval_id);
    is_autoplaying = false;
  }
}