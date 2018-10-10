/** 
 * Draws a graph of streaming events only positive data
 * The GET function allows a user-defined function to get the data with a callback
 * @param {Object}
 * */
var positiveLiveDataStream = function(o) {

	// @var {Number} - reference to canvas
	this.i = o.i;
	// @var {Number}
	this.height = o.height;
	// @var {Number}
	this.width = o.width;
	// @var {Boolean}
	this.bool = false;
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
positiveLiveDataStream.prototype.loop = function() {
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
 * @param {Array}
 * */
positiveLiveDataStream.prototype.add = function(data) {
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
positiveLiveDataStream.prototype.push = function(data) {
	this.add(data);
}
/**
 * gets data from an external location using a function defined by the user
 * @param {Function}
 * @param {Object}
 * @returns {Void}
 * */
positiveLiveDataStream.prototype.get = function(getFunction,params) {
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
positiveLiveDataStream.prototype.draw = function(data) {

	// @var {Number}
	let current = 0;
	// @var {Number}
	let max = 0;
	// @var {Number}
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
	max += min;

	// @var {Number}
	let d = max / this.height;
	// loop the data to create the graph
	for(let x=0; x<data.length; x++) {
		let x1 = x+100;
		let y1 = (this.height - (data[x]) / d);
		let x2 = x+100;
		let y2 = this.height;
		$w.canvas.line(this.i,x1,y1,x2,y2);
	}
	// draw text to show values
	$w.canvas.text(this.i,5,10,'max: '+max.toFixed(2),'fill','10px Arial','#000');
	$w.canvas.text(this.i,5,((this.height/3)*2),'min: '+(max/2).toFixed(2),'fill','10px Arial','#000');
	$w.canvas.text(this.i,5,this.height-10,'current: '+current.toFixed(2),'fill','10px Arial','#000');
	
}




