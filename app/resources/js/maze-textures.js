const distanceConst = 1;
const translocationConst = 2;

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

	canvas.width = getSize(columns, dimension, displacement);
	canvas.height = getSize(rows, dimension, displacement);

	texture.lineWidth = path;
	texture.lineCap = getValue("line-cap");
	texture.strokeStyle = getValue("maze-path-color");

	while (isEndMaze(stance)) {
		setDirection(direction, stance);
		let range = getRange(stance, columns);
		let blank = [];

		setItems(range, stance, rows, columns, limit, direction, blank);

		if (isEnoughLength(blank)) {
			let position = getRandomItem(blank);
			drawMaze(texture, stance, displacement, dimension, columns, position);
			stance = setNewPosition(stance, position, maze);
		} else {
			stance = maze.pop();
		}
	}
}

function setNewPosition(stance, position, maze) {
	stance = position;
	maze.push(stance);

	return stance;
}

function setItems(range, stance, rows, columns, limit, direction, blank) {
	for (item in range) {
		if (isNewItem(item, range, stance, rows, columns, limit, direction)) {
			setItemInBlank(item, range, blank);
		}
	}
}

function getInputNumber(id) {
	return Number(getValue(id));
}

function getDimension(wall, path) {
	return wall + path;
}

function getDisplacement(dimension) {
	return dimension / getValue("displacement");
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

function getSize(length, dimension, displacement) {
	let distance = length - distanceConst;
	let translocation = displacement * translocationConst;
	let magnitude = distance * dimension;

	return translocation + magnitude;
}

function getValue(id) {
	return document.getElementById(id).value;
}

function isEndMaze(stance) {
	return stance !== undefined;
}

function setDirection(direction, stance) {
	direction[stance] = true;
}

function getRange(stance, columns) {
	let topRange = stance - columns;
	let rightRange = stance + distanceConst;
	let bottomRange = stance + columns;
	let leftRange = stance - distanceConst;

	return [topRange, rightRange, bottomRange, leftRange];
}

function isInMaze(item, range, limit) {
	return range[item] >= 0 && range[item] < limit; // range[item] <= limit .... exit
}

function isDirection(item, range, direction) {
	return direction[range[item]] !== true;
}

function isEven(item) {
	return item % 2 === 0;
}

function isPosition(item, range, stance, rows, columns) {
	return Math.floor(stance / rows) === Math.floor(range[item] / columns);
}

function isMove(item, range, stance, rows, columns) {
	return isPosition(item, range, stance, rows, columns) || isEven(item);
}

function isNewItem(item, range, stance, rows, columns, limit, direction) {
	return isMove(item, range, stance, rows, columns) &&
		isDirection(item, range, direction) &&
		isInMaze(item, range, limit);
}

function setItemInBlank(item, range, blank) {
	blank.push(range[item]);
}

function isEnoughLength(blank) {
	return blank.length > 0;
}

function getRandomItem(blank) {
	let index = getRandomIndex(blank);

	return blank[index];
}

function getRandomIndex(blank) {
	return Math.floor(blank.length * Math.random());
}

function getCoordinate(point, displacement, dimension, columns, isHorizontal) {
	let columnsRatio = Math.floor(point / columns);

	if (isHorizontal) {
		columnsRatio = point % columns;
	}

	return displacement + dimension * columnsRatio;
}

function drawMaze(texture, stance, displacement, dimension, columns, position) {
	texture.beginPath();

	texture.moveTo(
		getCoordinate(stance, displacement, dimension, columns, true),
		getCoordinate(stance, displacement, dimension, columns, false)
	);

	texture.lineTo(
		getCoordinate(position, displacement, dimension, columns, true),
		getCoordinate(position, displacement, dimension, columns, false)
	);

	texture.stroke();
}