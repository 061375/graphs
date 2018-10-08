var barGraphHorizontal = function(o) {

	this.i = o.i;

	this.text = o.text;

	this.max = o.max;

	this.values = o.values;

	this.val = o.val;

	this.width = o.width;

	this.height = o.height;

	this.z = o.z;

	this.color = o.color;

	this.bheight = this.height / this.values;

	this.x = 0;

	this.y = this.bheight * this.z;

	this.bwidth = this.val / this.max;

	this.now = 0;

	this.updateint = o.updateint;

	this.updatecounter = 0;

	this.animspeed = 1;

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
 * the loop
 * @returns {Void}
 * */
barGraphHorizontal.prototype.draw = function() {

	$w.canvas.rectangle(this.i,this.x,this.y,this.now,(this.x + this.bheight),this.color,'fill',this.color);
	$w.canvas.line(this.i,this.x,(this.y + this.bheight),this.width,(this.y + this.bheight),'#ccc');
	$w.canvas.text(this.i,this.x+21,(this.y+((this.bheight / 3)*2)+1),this.text+': '+this.val,'stroke','20px Arial','#000');
}