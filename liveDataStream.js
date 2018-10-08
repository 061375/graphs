/** 
 * Draws a graph of streaming event data
 * The GET function allows a user-defined function to get the data with a callback
 * @var {Object}
 * */
var liveDataStream = function(o) {

	// @var {Number} - reference to canvas
	this.i = o.i;
	// @var {Number}
	this.height = o.height;
	// @var {Number}
	this.width = o.width;
	// @var {Number}
	this.updateint = o.updateint;
	// @var {Number}
	this.updatecounter = 0;
	// @var {Boolean}
	this.updategraph = false;
	// @var {Number}
	this.maxdatalength = this.width - 100;

	if(undefined === o.data) {
		this.data = [];
	}else{
		// make sure to CLONE the data and not reference it
		let _d = JSON.stringify(o.data);
		this.data = JSON.parse(_d);
	}

	

	/** 
	 *
	 * for get
	 *
	 */
	if (undefined === o.getFunction) {
		// throw error
		console.log('Error: getFunction is a required parameter when in mode 0');
		return false;
	}else{
		this.getFunction = o.getFunction;
	}
	if (undefined === o.getParams) {
		this.getParams = {};
	}else{
		this.getParams = o.getParams;
	}
}
/**
 * the loop
 * @returns {Void}
 * */
liveDataStream.prototype.loop = function() {
	this.updatecounter++;
	if(this.updatecounter >= this.updateint) {
		this.updatecounter = 0;
		this.get(this.getFunction,this.getParams);
	}else{
		this.draw(this.data);
	}
}
/** 
 * comment
 * @method add
 * */
liveDataStream.prototype.add = function(data) {
	this.data.push(data);
	if(this.data.length > this.maxdatalength)
		this.data.shift();
}
/**
 * Allows data to be pushed to this program
 * @deprecated true - might need this, but not right now
 * @param {Array}
 * @returns {Void}
 * */
liveDataStream.prototype.push = function(data) {
	this.add(data);
}
/**
 * gets data from an external location using a function defined by the user
 * @param {Function}
 * @param {Object}
 * @returns {Void}
 * */
liveDataStream.prototype.get = function(getFunction,params) {
	if(typeof getFunction === 'function') {
		var p = getFunction(params);
		p.then((data) => {
			this.add(data);
		});
	}
}
/**
 * draws the data to the screen
 * @param {Object}
 * @returns {Void}
 * */
liveDataStream.prototype.draw = function(data) {

	// @var {Number}
	let current = 0;
	// @var {Number}
	let max = 0;

	let min = 0;
	// initial loop to get the max value currently
	for(let x=0; x<data.length; x++) {
		if(data[x] > max)
			max = data[x];
		if(data[x] < min)
			min = data[x];
		// set the current value for the text
		current = data[x];
	}
	// handle negative values
	let _m = max;
	if(min < 0)
		_m += -min;

	// @var {Number}
	let d = _m / this.height;
	// loop the data to create the graph
	for(let x=0; x<data.length; x++) {
		let x1 = x+100;
		let x2 = x+100;
		//let y1 = (this.height - data[x]);// / d);
		let y1;
		if(data[x] > 0) {
			y1 = ((this.height/2) - (data[x]/d));
		}else{
			y1 = ((this.height - (this.height /2)) + Math.abs(data[x] / d));
		}
		let y2 = this.height / 2;

		$w.canvas.line(this.i,x1,y1,x2,y2);
	}
	// draw text to show values
	$w.canvas.text(this.i,5,10,'max: '+max.toFixed(2),'fill','10px Arial','#000');
	$w.canvas.text(this.i,5,((this.height/3)*2),'min: '+min.toFixed(2),'fill','10px Arial','#000');
	$w.canvas.text(this.i,5,this.height-10,'current: '+current.toFixed(2),'fill','10px Arial','#000');
}




