import { Disc } from './Disc.js';
import { haxball } from '../core/Constants.js';
import {
    getRGBA,
    getDecimalFromRGB,
    getAvatarPattern,
    drawTextNickCanvas,
    createAvatarCanvas
} from '../render/AvatarUtils.js';

export class Player extends Disc {
    default() {
        this.disc = null;
        this.name = 'Player';
        this.team = haxball.Team.SPECTATORS;
        this.avatar = '';
        var a = window.document.createElement('canvas');
        var b = window.document.createElement('canvas');
        this.avatarContext = a.getContext('2d', null);
        this.avatarPattern = getAvatarPattern(this.avatarContext, this.avatar, [
            getRGBA(haxball.Team.BLUE.color),
        ]);
        this.nicknameCanvasContext = drawTextNickCanvas(
            b.getContext('2d', null),
            this.name
        );
        this.inputs = 0;
        this.shooting = false;
        this.shotReset = false;
        this.spawnPoint = 0;
        this.controls = [
            ['ArrowUp'],
            ['ArrowLeft'],
            ['ArrowDown'],
            ['ArrowRight'],
            ['KeyX'],
        ];
        this.bot = false;
    }

    init(name, avatar, team, controls, bot = false) {
        this.default();
        if (name != undefined) {
            this.name = name;
            var b = window.document.createElement('canvas');
            this.nicknameCanvasContext = drawTextNickCanvas(
                b.getContext('2d', null),
                name
            );
        }
        if (team != undefined) {
            this.team = team;
        }
        if (avatar != undefined) {
            this.avatar = avatar;
            this.avatarContext = createAvatarCanvas();
            this.avatarPattern = getAvatarPattern(
                this.avatarContext,
                this.avatar,
                this.team === haxball.Team.BLUE
                    ? [getDecimalFromRGB(haxball.Team.BLUE.color)]
                    : [getDecimalFromRGB(haxball.Team.RED.color)]
            );
        }
        if (controls != undefined) this.controls = controls;
        if (bot != undefined) this.bot = bot;
    }
}