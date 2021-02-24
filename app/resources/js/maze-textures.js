const distanceConst = 1;
const translocationConst = 2;

let newTexture = document.getElementById("new-texture");
newTexture.addEventListener("click", engine);

engine();

function engine() {
	let { canvas, texture } = getCanvas();
	let { wall, path, rows, columns } = getSettings();
	let { dimension, displacement, stance, limit } = getConditions(wall, path, rows, columns);

	setSize(canvas, columns, dimension, displacement, rows);
	setStyle(texture, path);
	generateMaze(stance, columns, rows, limit, texture, displacement, dimension);	
	setValue("maze-width", canvas.width);
}

function setValue(id, value) {
	document.getElementById(id).value = value;
}

function getCanvas() {
	let canvas = document.getElementById("maze-texture");
	let texture = canvas.getContext("2d");

	return { canvas, texture };
}

function getConditions(wall, path, rows, columns) {
	let dimension = getDimension(wall, path);
	let displacement = getDisplacement(dimension);
	let stance = getStance(rows, columns);
	let limit = getLimit(rows, columns);

	return { dimension, displacement, stance, limit };
}

function getSettings() {
	let side = getInputNumber("maze-side");
	let rows = side;
	let columns = side;
	let wall = getInputNumber("maze-wall");
	let path = getInputNumber("maze-path");

	return { wall, path, rows, columns };
}

function generateMaze(stance, columns, rows, limit, texture, displacement, dimension) {
	let direction = [];
	let maze = [];	
	while (isEndMaze(stance)) {
		let blank = [];
		let range = getRange(stance, columns);
		setDirection(direction, stance);
		setItems(range, stance, rows, columns, limit, direction, blank);
		stance = towStance(blank, stance, texture, displacement, dimension, columns, maze);
	}
}

function towStance(blank, stance, texture, displacement, dimension, columns, maze) {
	if (isEnoughLength(blank)) {
		stance = setWaypoint(blank, texture, stance, displacement, dimension, columns, maze);
	} else {
		stance = maze.pop();
	}

	return stance;
}

function setWaypoint(blank, texture, stance, displacement, dimension, columns, maze) {
	let position = getRandomItem(blank);
	drawMaze(texture, stance, displacement, dimension, columns, position);

	return setNewPosition(stance, position, maze);
}

function setStyle(texture, path) {
	texture.lineWidth = path;
	texture.lineCap = getValue("line-cap");
	texture.strokeStyle = getValue("maze-path-color");
}

function setSize(canvas, columns, dimension, displacement, rows) {
	canvas.width = getSize(columns, dimension, displacement);
	canvas.height = getSize(rows, dimension, displacement);
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
	return dimension / getInputNumber("displacement");
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
	return range[item] >= 0 && range[item] < limit;
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
	return blank.length > getInputNumber("blank");
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