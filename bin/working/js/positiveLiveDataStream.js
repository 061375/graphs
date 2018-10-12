/** 
 * Draws a graph of streaming events only positive data
 * The GET function allows a user-defined function to get the data with a callback
 * @param {Object}
 * */
var positiveLiveDataStream = function(o) {

	// @var {Number} - reference to canvas
	this.i = o.i;
	// @var {Number} - this position in the $w.object 
	this.z = o.z;
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


	if(undefined === o.xmin) {
		this.xmin = 0;
	}else{
		this.xmin = o.xmin;
	}
	if(undefined === o.xmax) {
		this.xmax = 0;
	}else{
		this.xmax = o.xmax;
	}
	// @var {Number}
	this.maxdatalength = (this.width - this.xmin) - this.xmax;

	if(undefined === o.ymin) {
		this.ymin = 50;
	}else{
		this.ymin = o.ymin;
	}
	this.height-=this.ymin;

	if(undefined === o.linecolor) {
		this.linecolor = '#ffffff';
	}else{
		this.linecolor = o.linecolor;
	}
	if(undefined === o.textcolor) {
		this.textcolor = '#ffffff';
	}else{
		this.textcolor = o.textcolor;
	}
	if(undefined === o.maxx) {
		this.maxx = this.width/20;
	}else{
		this.maxx = o.maxx;
	}
	if(undefined === o.maxy) {
		this.maxy = (this.height+40);
	}else{
		this.maxy = o.maxy;
	}
	if(undefined === o.measure) {
		this.measure = 'C';
	}else{
		this.measure = o.measure;
	}
	if(undefined === o.msize) {
		this.msize = '20px';
	}else{
		this.measure = o.msize;
	}
	if(undefined === o.currentx) {
		this.currentx = ((this.width/2) + (this.width/20));
	}else{
		this.currentx = o.currentx;
	}
	if(undefined === o.currenty) {
		this.currenty = (this.height+40);
	}else{
		this.currenty = o.currenty;
	}
	if(undefined === o.bcurrent) {
		this.bcurrent = true;
	}else{
		this.bcurrent = o.bcurrent;
	}
	if(undefined === o.bcurrenttitle) {
		this.bcurrenttitle = true;
	}else{
		this.bcurrenttitle = o.bcurrenttitle;
	}
	if(undefined === o.bmax) {
		this.bmax = false;
	}else{
		this.bmax = o.bmax;
	}
	if(undefined === o.bmaxtitle) {
		this.bmaxtitle = false;
	}else{
		this.bmaxtitle = o.bmaxtitle;
	}
	if(undefined === o.data) {
		this.data = [];
	}else{
		let _d = JSON.stringify(o.data);
		this.data = JSON.parse(_d);
	} 

	this.noclear = false;

	/** 
	 *
	 * for get
	 *
	 */
	this.mode = 0;
	if(o.mode !== undefined)
		this.mode = o.mode;

	if(0 == this.mode) {
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
}
/**
 * the loop
 * @returns {Void}
 * */
positiveLiveDataStream.prototype.loop = function() {
	if(this.mode == 0) {
		this.updatecounter++;
		if(this.updatecounter >= this.updateint) {
			this.updatecounter = 0;
			this.get(this.getFunction,this.getParams);
		}else{
			if(!this.noclear) {
				this.draw(this.data);
			}
		}
	}else{
		if(!this.noclear) {
			this.draw(this.data);
		}
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
	this.noclear = false;
	$w.removeRequestNoClear(this.i);
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
			this.noclear = false;
			$w.removeRequestNoClear(this.i);
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
		let x1 = x+this.xmin;
		let y1 = (this.height - (data[x]) / d);
		let x2 = x+this.xmin;
		let y2 = this.height;
		$w.canvas.line(this.i,x1,y1,x2,y2,this.linecolor);
	}
	// draw text to show values
	if(this.bmax) {
		max = max.toFixed(2);
		if(this.bmaxtitle)
			max = 'max: '+max;
		$w.canvas.text(this.i,this.maxx,this.maxy,max+' '+this.measure,'fill',this.msize+' Arial',this.textcolor);
	}
	if(this.bcurrent) {
		current = current.toFixed(2);
		if(this.bcurrenttitle)
			current = 'current: '+current;
		$w.canvas.text(this.i,this.currentx,this.currenty,current+' '+this.measure,'fill',this.msize+' Arial',this.textcolor);
	}

	$w.requestNoClear(this.i);
	this.noclear = true;
}




