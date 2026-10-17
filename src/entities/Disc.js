export class Disc {
    ballPhysics() {
        this.radius = 10;
        this.bCoef = 0.5;
        this.invMass = 1;
        this.damping = 0.99;
        this.color = 'FFFFFF';
        this.x = 0;
        this.y = 0;
        this.xspeed = 0;
        this.yspeed = 0;
        this.cGroup = 193;
        this.cMask = 63;
    }

    playerPhysics() {
        this.radius = 2;
        this.bCoef = 0.5;
        this.invMass = 0.5;
        this.damping = 0.96;
        this.acceleration = 0.1;
        this.kickingAcceleration = 0.07;
        this.kickingDamping = 0.96;
        this.kickStrength = 5;
        this.color = 'FFFFFF';
        this.x = 0;
        this.y = 0;
        this.xspeed = 0;
        this.yspeed = 0;
        this.cGroup = 0;
        this.cMask = 39;
    }
}