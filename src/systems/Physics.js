import { haxball } from '../core/Constants.js';

import { normalise } from '../util/MathUtils.js';

export function collisionTransformation(physics, vertexes = null) {
    var cMask = physics.cMask;
    var y = 0;
    if (typeof cMask === 'object') {
        cMask.forEach((x) => {
            y |= haxball.collisionFlags[x];
        });
    }
    physics.cMask = y;
    var cGroup = physics.cGroup;
    y = 0;
    if (typeof cGroup === 'object') {
        cGroup.forEach((x) => {
            y |= haxball.collisionFlags[x];
        });
    }
    physics.cGroup = y;
    if (y == 1) physics.cGroup = 193;
    if (physics.pos !== undefined) {
        if (physics.x === undefined) {
            physics.x = physics.pos[0];
            physics.y = physics.pos[1];
        }
        physics.xspeed = 0;
        physics.yspeed = 0;
    }
    if (physics.v0 !== undefined && vertexes !== null) {
        physics.v0 = [vertexes[physics.v0].x, vertexes[physics.v0].y];
        physics.v1 = [vertexes[physics.v1].x, vertexes[physics.v1].y];
    }
    delete physics.pos;
    delete physics.trait;
    return physics;
}

export function getCurveFSegment(segment) {
    var curve = segment.curve * 0.017453292519943295;
    if (curve < 0) {
        curve *= -1;
        segment.curve *= 1;
        var b = segment.v0;
        segment.v0 = segment.v1;
        segment.v1 = b;
        if (segment.bias !== undefined) segment.bias = -segment.bias;
    }
    var liminf = 0.17435839227423353;
    var limsup = 5.934119456780721;
    if (curve > liminf && curve < limsup) {
        segment.curveF = 1 / Math.tan(curve / 2);
    }
}

export function getStuffSegment(segment) {
    if (segment.curveF !== undefined) {
        // curveF
        var a = { x: segment.v1[0], y: segment.v1[1] },
            b = { x: segment.v0[0], y: segment.v0[1] },
            c = 0.5 * (a.x - b.x),
            a = 0.5 * (a.y - b.y),
            b = { x: segment.v0[0], y: segment.v0[1] },
            d = segment.curveF;
        segment.circleCenter = [b.x + c + -a * d, b.y + a + c * d];
        a = { x: segment.v0[0], y: segment.v0[1] };
        b = segment.circleCenter;
        c = a.x - b[0];
        a = a.y - b[1];
        segment.circleRadius = Math.sqrt(c * c + a * a);
        c = { x: segment.v0[0], y: segment.v0[1] };
        a = segment.circleCenter;
        segment.v0Tan = [-(c.y - a[1]), c.x - a[0]];
        c = segment.circleCenter;
        a = { x: segment.v1[0], y: segment.v1[1] };
        segment.v1Tan = [-(c[1] - a.y), c[0] - a.x];
        if (segment.curveF <= 0) {
            segment.v0Tan[0] *= -1;
            segment.v0Tan[1] *= -1;
            segment.v1Tan[0] *= -1;
            segment.v1Tan[1] *= -1;
        }
    } else {
        a = { x: segment.v0[0], y: segment.v0[1] };
        b = { x: segment.v1[0], y: segment.v1[1] };
        c = a.x - b.x;
        a = -(a.y - b.y);
        b = Math.sqrt(a * a + c * c);
        segment.normal = [a / b, c / b];
    }
}

export function resolveDVCollision(disc, vertex) {
    var discPos = { x: disc.x, y: disc.y };
    var vertexPos = { x: vertex.x, y: vertex.y };
    var dist_x = discPos.x - vertexPos.x;
    var dist_y = discPos.y - vertexPos.y;
    var dist = dist_x * dist_x + dist_y * dist_y;
    if (dist > 0 && dist <= disc.radius ** 2) {
        dist = Math.sqrt(dist);
        dist_x = dist_x / dist;
        dist_y = dist_y / dist;
        var lambda = disc.radius - dist;
        disc.x = disc.x + dist_x * lambda;
        disc.y = disc.y + dist_y * lambda;
        var discSpeed = { x: disc.xspeed, y: disc.yspeed };
        var speedCoef = dist_x * discSpeed.x + dist_y * discSpeed.y;
        if (speedCoef < 0) {
            speedCoef *= disc.bCoef * vertex.bCoef + 1;
            disc.xspeed = disc.xspeed - dist_x * speedCoef;
            disc.yspeed = disc.yspeed - dist_y * speedCoef;
        }
    }
}

export function resolveDSCollision(disc, segment) {
    var distance;
    var coef_x;
    var coef_y;
    if (segment.curveF === undefined) {
        var v0Pos = { x: segment.v0[0], y: segment.v0[1] };
        var v1Pos = { x: segment.v1[0], y: segment.v1[1] };
        var seg_x = v1Pos.x - v0Pos.x;
        var seg_y = v1Pos.y - v0Pos.y;
        var discPos = { x: disc.x, y: disc.y };
        var dist0_x = discPos.x - v0Pos.x;
        var dist0_y = discPos.y - v0Pos.y;
        var dist1_x = discPos.x - v1Pos.x;
        var dist1_y = discPos.y - v1Pos.y;
        var g = { x: disc.x, y: disc.y };
        if (
            dist0_x * seg_x + dist0_y * seg_y > 0 && dist1_x * seg_x + dist1_y * seg_y < 0
        ) {
            var norm = normalise([
                segment.v0[1] - segment.v1[1],
                segment.v1[0] - segment.v0[0],
            ]);
            norm = { x: -norm[0], y: -norm[1] };
            coef_x = norm.x;
            coef_y = norm.y;
            distance = coef_x * dist1_x + coef_y * dist1_y;
        }
    } else {
        var circleC = segment.circleCenter;
        var discPos = { x: disc.x, y: disc.y };
        var dist_x = discPos.x - circleC[0];
        var dist_y = discPos.y - circleC[1];
        var tan1 = segment.v1Tan;
        var tan0 = segment.v0Tan;
        if (
            (tan1[0] * dist_x + tan1[1] * dist_y > 0 && tan0[0] * dist_x + tan0[1] * dist_y > 0) == segment.curveF < 0
        )
            return;
        var dist = Math.sqrt(dist_x * dist_x + dist_y * dist_y);
        if (dist == 0) return;
        distance = dist - segment.circleRadius;
        coef_x = dist_x / dist;
        coef_y = dist_y / dist;
    }
    var bias = segment.bias;
    if (bias == 0 || bias == undefined) {
        if (distance < 0) {
            distance = -distance;
            coef_x = -coef_x;
            coef_y = -coef_y;
        }
    } else if (bias < 0) {
        bias = -bias;
        distance = -distance;
        coef_x = -coef_x;
        coef_y = -coef_y;
        if (distance < -bias) return;
    }
    if (distance < disc.radius) {
        distance = disc.radius - distance;
        disc.x = disc.x + coef_x * distance;
        disc.y = disc.y + coef_y * distance;
        var discSpeed = { x: disc.xspeed, y: disc.yspeed };
        var speedCoef = coef_x * discSpeed.x + coef_y * discSpeed.y;
        if (speedCoef < 0) {
            speedCoef *= disc.bCoef * segment.bCoef + 1;
            disc.xspeed = disc.xspeed - coef_x * speedCoef;
            disc.yspeed = disc.yspeed - coef_y * speedCoef;
        }
    }
}

export function resolveDPCollision(disc, plane) {
    var norm = normalise(plane.normal);
    norm = { x: norm[0], y: norm[1] };
    var discPos = { x: disc.x, y: disc.y };
    var dist = plane.dist - (norm.x * discPos.x + norm.y * discPos.y) + disc.radius;
    if (dist > 0) {
        disc.x = disc.x + norm.x * dist;
        disc.y = disc.y + norm.y * dist;
        var discSpeed = { x: disc.xspeed, y: disc.yspeed };
        var speedCoef = norm.x * discSpeed.x + norm.y * discSpeed.y;
        if (speedCoef < 0) {
            speedCoef *= disc.bCoef * plane.bCoef + 1;
            disc.xspeed = disc.xspeed - norm.x * speedCoef;
            disc.yspeed = disc.yspeed - norm.y * speedCoef;
        }
    }
}

export function resolveDDCollision(discA, discB) {
    var dist = Math.sqrt(Math.pow(discA.x - discB.x, 2) + Math.pow(discA.y - discB.y, 2));
    var radiusSum = discA.radius + discB.radius;
    if (dist > 0 && dist <= radiusSum) {
        var normal = [(discA.x - discB.x) / dist, (discA.y - discB.y) / dist];
        var massFactor = discA.invMass / (discA.invMass + discB.invMass);

        discA.x += normal[0] * (radiusSum - dist) * massFactor;
        discA.y += normal[1] * (radiusSum - dist) * massFactor;
        discB.x -= normal[0] * (radiusSum - dist) * (1 - massFactor);
        discB.y -= normal[1] * (radiusSum - dist) * (1 - massFactor);
        
        var relativeVelocity = [discA.xspeed - discB.xspeed, discA.yspeed - discB.yspeed];
        var normalVelocity = relativeVelocity[0] * normal[0] + relativeVelocity[1] * normal[1];

        if (normalVelocity < 0) {
            var speedFactor = normalVelocity * (discA.bCoef * discB.bCoef + 1);
            
            discA.xspeed = discA.xspeed - normal[0] * speedFactor * massFactor;
            discA.yspeed = discA.yspeed - normal[1] * speedFactor * massFactor;
            discB.xspeed = discB.xspeed + normal[0] * speedFactor * (1 - massFactor);
            discB.yspeed = discB.yspeed + normal[1] * speedFactor * (1 - massFactor);
        }
    }
}