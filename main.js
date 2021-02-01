function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
var hide = (id) => {
  document.getElementById(id).style.display = "none";
};
var show = (id) => {
  document.getElementById(id).style.display = "flex";
};

var game = {
  round: 1,
  time: 500,
  score: 0,
  tries: 0,
  lifes: 3,
  stopped: false,
  colors: [
    getRandomColor(),
    getRandomColor(),
    getRandomColor(),
    getRandomColor(),
    getRandomColor(),
    getRandomColor(),
  ],
  correct: Math.floor(Math.random() * 6),
  updatelifes: () => {
    var str = '';
    for (var i = 0; i < game.lifes; i++) {
      str += ' ❤️';
      document.getElementById('life-1').innerHTML = str;
    }
  },
  stop: () => {
    game.stopped = true;
    document.getElementById('diamsg').innerHTML = 'You scored ' + game.score + ' Points!';
    document.getElementById('button').innerHTML = 'Restart game';
    document.getElementById('button').onclick = () => {
      window.location.reload();
    }

    show("dialog");
    show("blur");
  },
  nextq: () => {
    if (game.round < 10) {
      game.round++;
      document.getElementById('roundsval').innerHTML = game.round + '/10';
      game.tries = 0;
      document.getElementById('triesval').innerHTML = '0';
      if (game.round < 6) {
        game.lifes = 3;
        game.time = 500 - 50 * (game.round - 1);
        game.correct = Math.floor(Math.random() * 6)
        game.colors = [];
        for (var i = 0; i < 6; i++) {
          game.colors.push(getRandomColor());
        }
      } else {
        game.lifes = 4;
        game.time = 500 - 50 * (game.round - 6);
        game.correct = Math.floor(Math.random() * 8)
        game.colors = [];
        for (var i = 0; i < 8; i++) {
          game.colors.push(getRandomColor());
        }
      }
      game.updatelifes();
      game.init();
    } else {
      game.stop();
    }

  },

  updatescore: (s) => {
    game.score+=s;
    document.getElementById('scoreval').innerHTML = Math.round((document.getElementById('scoreval').innerHTML - 0) + s);
  },

  dead: () => {
    //game.updatescore();
    game.nextq()
    game.msgred();
    game.flashmsg('Out of lifes, skipping this Question');
  },
  sahi: () => {
    game.msggreen();
    game.flashmsg('Correct Answer')
    game.nextq();
    game.updatescore(40);
  },
  incorrect: () => {
    game.msgred();
    game.flashmsg("Incorrect");
    document.body.classList.add('galat');
    setTimeout(() => {
      document.body.classList.remove('galat');

    }, 500)
    game.lifes--;
    game.updatescore(-10);
    if (game.lifes == 0) {
      game.dead();
    } else {
      // str = '';
      document.getElementById('triesval').innerHTML = '' + Math.round((document.getElementById('triesval').innerHTML - 0) + 1);

      game.updatelifes();
    }
  },
  link: () => {
    for (var i = 0; i < 8; i++) {
      console.log(document.getElementById("c" + (i + 1)), "c" + (i + 1));
      document.getElementById("c" + (i + 1)).addEventListener('click', (e) => {
        console.log(e.target.id);
        var index = i;
        console.log(e.target.id, 'c' + (game.correct + 1))
        if (e.target.id == 'c' + (game.correct + 1)) {
          game.sahi();
        } else {
          game.incorrect();
        }
      });
    }
  },
  init: () => {
    game.colors.forEach((color, index) => {
      //console.log('c'+index);
      document.getElementById("c" + (index + 1)).style.backgroundColor = color;
      document.getElementById("c" + (index + 1)).style.display = "block";

    });

    document.getElementById('col').innerHTML = document.getElementById("c" + (game.correct + 1)).style.backgroundColor;

  },
  timeout: () => {
    game.msgred();
    game.flashmsg('Timeout!')
    game.nextq();
  },
  msgred: () => {
    document.getElementById('msg').style.color = 'orangered';
  },
  msggreen: () => {
    document.getElementById('msg').style.color = 'lightgreen';
  },
  flashmsg: (msg) => {
    document.getElementById('msg').style.opacity = 1;
    document.getElementById('msg').innerHTML = msg;
    setTimeout(() => {
      document.getElementById('msg').style.opacity = 0;
    }, 1000)
  },
  start: () => {
    var elem = document.documentElement;

    /* View in fullscreen */
    function openFullscreen() {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
      }
    }
    //openFullscreen();
    hide("dialog");
    hide("blur");
    var dectime = () => {
      game.time -= 1;
      if (game.time <= 0) {
        game.timeout();
        if (game.round == 10) {
          game.stop();
        }
      } else {

      }
      if (!game.stopped) {
        setTimeout(dectime, 100);
      }
      //game.time=Math.floor(game.time*10)/10;
      document.getElementById("timeval").innerHTML =
        game.time / 10 + (game.time % 10 ? "" : ".0");
    }
    if (!game.stopped) {
      setTimeout(dectime, 100);
    }

  },
  nextlevel: () => { },
};
