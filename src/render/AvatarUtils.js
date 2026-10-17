export function createAvatarCanvas() {
    let avatarCanvasCtx;
    var a = window.document.createElement('canvas');
    a.width = 64;
    a.height = 64;
    return (avatarCanvasCtx = a.getContext('2d', null));
}

export function getRGBA(a) {
    return (
        'rgba(' +
        [(a & 16711680) >>> 16, (a & 65280) >>> 8, a & 255].join() +
        ',255)'
    );
}

export function getDecimalFromRGB(a) {
    var b = a.substring(4, a.length - 1).split(',');
    return (parseInt(b[0]) << 16) + (parseInt(b[1]) << 8) + parseInt(b[2]);
}

export function getAvatarPattern(ctx, avatar, colors) {
    if (colors.length > 0) {
        ctx.save();
        ctx.translate(32, 32);
        ctx.rotate((3.141592653589793 * 32) / 128);
        for (
            var c = -32, d = 64 / colors.length, e = 0;
            e < colors.length;
            e++
        ) {
            ctx.fillStyle = getRGBA(colors[e]);
            ctx.fillRect(c, -32, d + 4, 64);
            c += d;
        }
        ctx.restore();
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic';
        ctx.font = "900 34px 'Arial Black','Arial Bold',Gadget,sans-serif";
        ctx.fillText(avatar.substring(0, 2), 32, 44);
        var avatarPattern = ctx.createPattern(ctx.canvas, 'no-repeat');
        return avatarPattern;
    }
}

export function drawTextNickCanvas(ctx, nickname) {
    ctx.resetTransform();
    ctx.clearRect(0, 0, 160, 34);
    ctx.font = '26px sans-serif';
    ctx.fillStyle = 'white';
    if (ctx.measureText(nickname).width > 160) {
        ctx.textAlign = 'left';
        ctx.translate(2, 29);
    } else {
        ctx.textAlign = 'center';
        ctx.translate(80, 29);
    }
    ctx.fillText(nickname, 0, 0);
    return ctx;
}