let is_auto_playing = false;
let interval_id;

function auto_play() {
  if(!is_auto_playing) {
    interval_id = setInterval(function() {
      const player_move = pick_computer_move();
      play_game(player_move);
    }, 1000);
    is_auto_playing = true;
  }
  else {
    clearInterval(interval_id);
    is_auto_playing = false;
  }
}