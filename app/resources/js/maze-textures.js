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

	while(isEndMaze(stance)) {
		setDirection(direction, stance);
		let range = getRange(stance, columns);
		let blank = [];
	
		for(item in range){
			if(isNewItem(item, range, stance, rows, columns, limit, direction)){
				setItemInBlank(item, range, blank);
			}
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

function getSize(length, dimension, displacement) {
	let distance = length - 1;
	let translocation = 2 * displacement;
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
	let rightRange = stance + 1;
	let bottomRange = stance + columns;
	let leftRange = stance - 1;
	
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

function horizontal(point, displacement, dimension, columns) {
	return displacement + dimension * (point % columns);
}