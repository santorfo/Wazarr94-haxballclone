import { haxball } from '../core/Constants.js';

const goalSound = new Audio('audio/goal.mp3');

export function checkGoal(stadium, discPos, discPosPrev) {
    // discPos : current position of scorable disc, discPosPrev : position just before
    if (stadium.goals == undefined) return haxball.Team.SPECTATORS;
    for (var i = 0; i < stadium.goals.length; i++) {
        var check;
        var goal = stadium.goals[i];
        var point0 = goal.p0;
        var point1 = goal.p1;
        var dist_x = discPosPrev[0] - discPos[0];
        var dist_y = discPosPrev[1] - discPos[1];
        if (
            (-(point0[1] - discPos[1]) * dist_x + (point0[0] - discPos[0]) * dist_y) *
            (-(point1[1] - discPos[1]) * dist_x + (point1[0] - discPos[0]) * dist_y) > 0
        ) {
            check = false;
        } else {
            var goal_x = point1[0] - point0[0];
            var goal_y = point1[1] - point0[1];
            if (
                (-(discPos[1] - point0[1]) * goal_x +
                    (discPos[0] - point0[0]) * goal_y) *
                    (-(discPosPrev[1] - point0[1]) * goal_x +
                        (discPosPrev[0] - point0[0]) * goal_y) >
                0
            ) {
                check = false;
            } else {
                check = true;
            }
        }
        if (check) {
            goalSound.play();
            return goal.team;
        }
    }
    return haxball.Team.SPECTATORS;
}

export function endAnimation(game) {
    game.state = 3;
    game.timeout = 300;
}

export function updateBar(game) {
    var a = Math.floor(game.time),
        b = a % 60,
        c = (a / 60) | 0,
        spans = document.getElementsByClassName('digit');
    spans[3].textContent = '' + (b % 10);
    spans[2].textContent = '' + (((b / 10) | 0) % 10);
    spans[1].textContent = '' + (c % 10);
    spans[0].textContent = '' + (((c / 10) | 0) % 10);
    if (game.time > 60 * game.timeLimit - 30) {
        var span = document.getElementsByClassName('game-timer-view');
        span[0].className = 'game-timer-view time-warn';
    }
    if (game.time > 60 * game.timeLimit) {
        var span = document.getElementsByClassName('game-timer-view time-warn');
        span[0].className = 'game-timer-view';
        span = document.getElementsByClassName('overtime');
        span[0].className = 'overtime on';
    }
    if (game.timeout > 0) {
        var scores = document.getElementsByClassName('score');
        scores[1].textContent = '' + game.blue;
        scores[0].textContent = '' + game.red;
    }
}