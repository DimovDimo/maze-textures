let newTexture = document.getElementById("new-texture");
newTexture.addEventListener("click", engine);

engine();

function engine() {
	let canvas = document.getElementById("maze-texture");
	let texture = canvas.getContext("2d");

    let mazeColumns = getMazeDimension("maze-columns");
	let mazeRows = getMazeDimension("maze-rows");
	let path = getInputNumber("maze-path");
    let wall = getInputNumber("maze-wall");
}

function getInputNumber(id) {
	return Number(document.getElementById(id).value);
}

function getMazeDimension(id) {
	return getInputNumber(id) + 1;
}