/** 
 * Draws a graph of streaming events only positive data
 * The GET function allows a user-defined function to get the data with a callback
 * */
var liveDataStream = function(o) {

	this.i = o.i;

	this.height = o.height;

	this.width = o.width;

	/* *
	 * 
	 * 0 - data is pushed to the program
	 * 1 - program requests data
	 *
	 * */
	//this.mode = o.mode;

	this.updateint = o.updateint;

	this.updatecounter = 0;

	this.updategraph = false;

	if(undefined === o.data) {
		this.data = [];
	}else{
		this.data = o.data;
	}

	this.maxdatalength = this.width - 100;

	// for get
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
 * 
 * @returns {Void}
 * */
liveDataStream.prototype.init = function() {

}
/**
 * 
 * @deprecated true - might need this, but not right now
 * @returns {Void}
 * */
liveDataStream.prototype.check = function() {
	if(JSON.stringify(this.data) != JSON.stringify(this.newdata)) {
		// data has changed ... go with new data
		this.data = this.newdata;
		this.updategraph = true;
	}else{
		this.updategraph = false;
	}
}
liveDataStream.prototype.add = function(data,callback) {
	this.data.push(data);

	if(this.data.length > this.maxdatalength)
		this.data.shift();

	if(typeof callback === 'function')
		callback(this.data);
}
/**
 * Allows data to be pushed to this program
 * @deprecated true - might need this, but not right now
 * @param {Array}
 * @returns {Void}
 * */
liveDataStream.prototype.push = function(data) {
	this.newdata = data;
}
/**
 * gets data from an external location using a function defined by the user
 * @param {Function}
 * @param {Object}
 * @returns {Void}
 * */
liveDataStream.prototype.get = function(getFunction,params) {

	let $this = this;
	if(typeof getFunction === 'function') {
		getFunction(params,function(data){
			
			//$this.newdata = data;
			//$this.check();
			$this.add(data,function(data) {
				$this.draw(data);
			});
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
		if(this.data[x] > max)
			max = this.data[x];
		if(this.data[x] < min)
			min = this.data[x];
		// set the current value for the text
		current = this.data[x];
	}
	// handle negative values
	let _m = max;
	if(min < 0)
		if(-min > max) 
			_m = min;
	_m = _m * 2;

	// @var {Number}
	let d = _m / this.height;
	// loop the data to create the graph
	for(let x=0; x<data.length; x++) {
		let x1 = x+100;
		let y1 = ((this.height - this.data[x]) / d);
		let x2 = x+100;
		let y2 = this.height / 2;
		$w.canvas.line(this.i,x1,y1,x2,y2);
	}
	// draw text to show values
	$w.canvas.text(this.i,5,10,max.toFixed(2),'fill','10px Arial','#000');
	$w.canvas.text(this.i,5,(this.height/3),(max/2).toFixed(2),'fill','10px Arial','#000');
	$w.canvas.text(this.i,5,((this.height/3)*2),(min).toFixed(2),'fill','10px Arial','#000');
	$w.canvas.text(this.i,5,this.height-10,current.toFixed(2),'fill','10px Arial','#000');
}




