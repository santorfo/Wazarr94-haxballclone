import { haxball } from './Constants.js';

export class Game {
    init() {
                this.state = 0;
                this.start = true;
                this.timeout = 0;
                this.timeLimit = 1;
                this.scoreLimit = 1;
                this.kickoffReset = 8;
                this.red = 0;
                this.blue = 0;
                this.time = 0;
                this.teamGoal = haxball.Team.SPECTATORS;
    }
}