let newTexture = document.getElementById("new-texture");
newTexture.addEventListener("click", engine);

engine();

function engine() {
	let canvas = document.getElementById("maze-texture");
	let texture = canvas.getContext("2d");

    let rows = getInputNumber("maze-rows");
	let columns = getInputNumber("maze-columns");
    let wall = getInputNumber("maze-wall");
	let path = getInputNumber("maze-path");

	let dimension = getDimension(wall, path);
	let displacement = getDisplacement(dimension);
	let stance = getStance(rows, columns);
	let limit = getLimit(rows, columns);
	
	let direction = [];
	let maze = [];
}

function getInputNumber(id) {
	return Number(document.getElementById(id).value);
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

function getLimit(rows, columns) {
	return rows * columns;
}