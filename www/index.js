var name;
var score = 0;
var score_data = 0;
var random_int;
var interval_timer;
var timeout;

$('#submit').click(function (){
    name = $('#name_val').val();
    $('.game-view').show();
    $('.game-view').animate({'margin-top': '0vh'}, 500);
    $('.begin-view').animate({'margin-top': '-100vh'}, 500);
    $('.name').html(name);
    load_leader();
    document.activeElement.blur();
});

function show_leader(){
  $('.leaderboard').animate({'margin-top': '20vh'}, 500);
}

function hide_leader(){
  $('.leaderboard').animate({'margin-top': '100vh'}, 500);
}

function load_leader(){
  $.ajax({
    type: 'POST',
    url: 'load_score.php'
  })

  .done(function(data){
    score_data = JSON.parse(data);
    $(".leaderboard-spawn").empty();
    for (i = 0; i < score_data.length; i++) {
      $(".leaderboard-spawn").append("<div class='highscore-row' id='highscore-row"+i+"'></div>");
      $("#highscore-row"+i).append("<div class='name-row'>"+score_data[i].name+"</div>");
      $("#highscore-row"+i).append("<div class='score-row'>"+score_data[i].score+" s</div>");
    }
  })
}

function set_score(){
  $.ajax({
    type: 'POST',
    url: 'add_score.php',
    data: {name: name, score: score_data}
  })

  .done(function(data){
    load_leader();
  })
}

function start_game(){
  $('.game-view').hide();
  $('.restart-view').hide();
  $('.game_block').show();
  random_int = Math.floor(Math.random() * 4000) + 1000;
  timeout = setTimeout(start_time, random_int);
}

function start_time(){
  $('.game_block').css({'background-color': 'red'});
  $('.game-text').html("Click!");
  interval_timer = setInterval(function() {
    score += 1;
  }, 1);
}

function stop_game(){
  clearInterval(interval_timer);
  clearTimeout(timeout);
  score_data = score/100;
  $('.restart-view').show();
  $('.game_block').hide();
  if (score !== 0) {
    $('.title-after').html(score_data+" sec");
    set_score();
  }else{
    $('.title-after').html('To early');
    load_leader();
  }
  score = 0;
  score_data = 0;
  $('.game_block').css({'background-color': 'green'});
  $('.game-text').html("Click when it's red");
}
