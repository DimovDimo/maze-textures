let newTexture = document.getElementById("new-texture");
newTexture.addEventListener("click", engine);

engine();

function engine() {
	let canvas = document.getElementById("maze-texture");
	let texture = canvas.getContext("2d");

    let rows = getMazeDimension("maze-rows");
	let columns = getMazeDimension("maze-columns");
    let wall = getInputNumber("maze-wall");
	let path = getInputNumber("maze-path");

	let dimension = getDimension(wall, path);
	let displacement = getDisplacement(dimension);
	let stance = getStance(rows, columns);
}

function getInputNumber(id) {
	return Number(document.getElementById(id).value);
}

function getMazeDimension(id) {
	return getInputNumber(id) + 1;
}

function getDimension(wall, path) {
	return wall + path;
}

function getDisplacement(dimension) {
	return dimension / 1.5;
}

function getStance(rows, columns) {
	return getRandomSequence(rows) * getRandomSequence(columns);
}

function getRandomSequence(sequence) {
	return Math.floor(sequence * Math.random());
}