/** 
 * @class barGraphHorizontal
 * @param {Object}
 * */
var barGraphHorizontal = function(o) {

	// @var {Number} reference the canvas
	this.i = o.i;
	// @var {String}
	this.text = o.text;
	// @var {Number}
	this.max = o.max;
	// @var {Number}
	this.values = o.values;
	// @var {Array}
	this.val = o.val;
	// @var {Number}
	this.width = o.width;
	// @var {Number}
	this.height = o.height;
	// @var {Number}
	this.z = o.z;
	// @var {String}
	this.color = o.color;
	// @var {Number}
	this.bheight = this.height / this.values;
	// @var {Number}
	this.x = 0;
	// @var {Number}
	this.y = this.bheight * this.z;
	// @var {Number}
	this.bwidth = this.val / this.max;
	// @var {Number}
	this.now = this.width;
	// @var {Number}
	this.updateint = o.updateint;
	// @var {Number}
	this.updatecounter = 0;
	// @var {Number}
	this.animspeed = 1;
	

	this.mode = 0;
	if(o.mode !== undefined)
		this.mode = o.mode;

	if(0 == this.mode) {
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
}
/**
 * the loop
 * @returns {Void}
 * */
barGraphHorizontal.prototype.loop = function() {
	this.updatecounter++;
	if(this.updatecounter >= this.updateint) {
		this.updatecounter = 0;
		this.get(this.getFunction,this.getParams);
	}else{
		if((this.now+this.animspeed) > this.bwidth)
			this.now-=this.animspeed;
		if((this.now-this.animspeed) < this.bwidth)
			this.now+=this.animspeed;
		this.draw();
	}
}
/**
 * gets data from an external location using a function defined by the user
 * @param {Function}
 * @param {Object}
 * @returns {Void}
 * */
barGraphHorizontal.prototype.get = function(getFunction,params) {

	if(typeof getFunction === 'function') {
		var p = getFunction(params);
		p.then((data) => {
			this.val = data.toFixed(2);
			this.bwidth = this.val;
			this.bwidth = this.val / this.max;
		});
	}
}
/**
 * @param {Object}
 * @returns {Void}
 * */
barGraphHorizontal.prototype.push = function(data) {
	this.val = data.toFixed(2);
	this.bwidth = this.val;
	this.bwidth = this.val / this.max;
}
/**
 * the loop
 * @returns {Void}
 * */
barGraphHorizontal.prototype.draw = function() {

	$w.canvas.rectangle(this.i,this.x,this.y,this.now,(this.x + this.bheight),this.color,'fill',this.color);
	$w.canvas.line(this.i,this.x,(this.y + this.bheight),this.width,(this.y + this.bheight),'#ccc');
	$w.canvas.text(this.i,this.x+21,(this.y+((this.bheight / 3)*2)+1),this.text+': '+this.val,'stroke','20px Arial','#000');
}