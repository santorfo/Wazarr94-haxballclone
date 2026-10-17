export function saveRecording(rec) {
    var d = new Date();
    downloadRec(
        rec,
        `HBReplay-${d.getFullYear()}-${
            d.getMonth() + 1
        }-${d.getDate()}-${d.getHours()}h${d.getMinutes()}m.hbar`
    );
}

export function downloadRec(rec, fileName) {
    downloadFile(
        new Blob([rec], {
            type: 'octet/stream',
        }),
        fileName
    );
}

export function downloadFile(file, fileName) {
    var c = window.document.createElement('a');
    c.style.display = 'display: none';
    window.document.body.appendChild(c);
    var d = URL.createObjectURL(file);
    c.href = d;
    c.download = fileName;
    c.click();
    URL.revokeObjectURL(d);
    c.remove();
}

export function watchLastGame() {
    if (localStorage.getItem('last') != null) {
        localStorage.setItem('rec', '1');
        document.location.reload(true);
    }
}

export function handleFile() {
    var file = input.files[0];
    fileread.readAsArrayBuffer(file);
}

export function loadFileRec() {
    var replay = msgpack.deserialize(new Uint8Array(fileread.result));
    localStorage.setItem('file', JSON.stringify(replay));
    localStorage.setItem('rec', '2');
    document.location.reload(true);
}