export const Input = { LEFT: 2, RIGHT: 8, UP: 1, DOWN: 4, SHOOT: 16 };
export const Kick = {
    PASS: 0,
    REBOUND_PASS: 1,
    REBOUND_DRIBBLE: 2,
    CLEAR: 3,
    SHOT: 4,
    ROCKET: 5,
    OPEN_DUEL: 6,
    CORNER_DUEL: 7,
};
export const Team = {
    SPECTATORS: 0,
    RED: 1,
    BLUE: 2,
};

// values hardcoded in haxball
export const haxball = {
    hockey: {
        bg_color: 'rgb(85, 85, 85)',
        border_color: 'rgb(233,204,110)',
    },
    grass: {
        bg_color: 'rgb(113,140,90)',
        border_color: 'rgb(199,230,189)',
    },
    segment_color: 'rgb(0,0,0)',
    Team: {
        RED: {
            name: 't-red',
            id: 1,
            color: 'rgb(229, 110, 86)',
            cGroup: 2,
        },
        BLUE: {
            name: 't-blue',
            id: 2,
            color: 'rgb(86,137,229)',
            cGroup: 4,
        },
        SPECTATORS: {
            name: 't-spectators',
            id: 0,
            color: null,
            cGroup: 0,
        },
    },
    playerPhysics: {
        radius: 15,
        bCoef: 0.5,
        invMass: 0.5,
        damping: 0.96,
        acceleration: 0.1,
        kickingAcceleration: 0.07,
        kickingDamping: 0.96,
        kickStrength: 5,
        pos: [0, 0],
        cMask: ['all'],
        cGroup: [''],
    },
    ballPhysics: {
        radius: 10,
        bCoef: 0.5,
        invMass: 1,
        damping: 0.99,
        color: 'FFFFFF',
        pos: [0, 0],
        cMask: ['all'],
        cGroup: ['ball'],
    },
    discPhysics: {
        radius: 10,
        bCoef: 0.5,
        invMass: 0,
        damping: 0.99,
        color: 'rgb(255,255,255)',
        cMask: ['all'],
        cGroup: ['all'],
    },
    segmentPhysics: {
        curve: 0,
        bCoef: 1,
        cGroup: ['wall'],
        cMask: ['all'],
    },
    planePhysics: {
        bCoef: 1,
        cGroup: ['wall'],
        cMask: ['all'],
    },
    vertexPhysics: {
        bCoef: 1,
        cGroup: ['wall'],
        cMask: ['all'],
    },
    collisionFlags: {
        all: 63,
        ball: 1,
        blue: 4,
        blueKO: 16,
        c0: 268435456,
        c1: 536870912,
        c2: 1073741824,
        c3: -2147483648,
        kick: 64,
        red: 2,
        redKO: 8,
        score: 128,
        wall: 32,
    },
};

export const zoom_levels = [0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5];