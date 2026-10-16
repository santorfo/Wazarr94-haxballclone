export function normVec(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
}

export function dist(a, b) {
    return normVec([a[0] - b[0], a[1] - b[1]]);
}

export function normalise(v) {
    var k = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
    var x = v[0] / (k || 1);
    var y = v[1] / (k || 1);
    return [x, y];
}

export function radianToDegree(x) {
    return x * (180 / Math.PI);
}

export function degreeToRadian(x) {
    return x * (Math.PI / 180);
}

export function getAngle(x, y) {
    return radianToDegree(Math.atan2(y, x));
}

export function getAngleVec(vec1, vec2) {
    return radianToDegree(
        Math.atan2(vec2.y, vec2.x) - Math.atan2(vec1.y, vec1.x)
    );
}

export function getVectorAngle(x, y, angle) {
    return {
        x: x * Math.cos(angle) + y * Math.sin(angle),
        y: y * Math.cos(angle) - x * Math.sin(angle),
    };
}

export function normArr(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
}

export function normObj(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}

export function pointDistance(p1, p2) {
    var d1 = p1.x - p2.x;
    var d2 = p1.y - p2.y;
    return Math.sqrt(d1 * d1 + d2 * d2);
}

export function deepEqual(x, y) {
    const ok = Object.keys,
        tx = typeof x,
        ty = typeof y;
    return x && y && tx === 'object' && tx === ty
        ? ok(x).length === ok(y).length &&
              ok(x).every((key) => deepEqual(x[key], y[key]))
        : x === y;
}
