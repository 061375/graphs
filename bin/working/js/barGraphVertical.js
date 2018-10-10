var barGraphVertical = function(o) {

	this.i = o.i;

	this.text = o.text;

	this.max = o.max;

	this.values = o.values;

	this.val = o.val;

	this.width = o.width;

	this.height = o.height;

	this.z = o.z;

	this.color = o.color;

	this.bwidth = this.width / this.values;

	this.x = this.bwidth * this.z;

	this.y = 0;//this.height;

	this.bheight = this.val / this.max;//(this.y - (this.val / this.max));

 	this.now = this.height;

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
barGraphVertical.prototype.loop = function() {
	this.updatecounter++;
	if(this.updatecounter >= this.updateint) {
		this.updatecounter = 0;
		this.get(this.getFunction,this.getParams);
	}else{
		let bheight = ((this.height - this.bheight)+10);
		if((this.now+this.animspeed) > bheight)
			this.now-=this.animspeed;
		if((this.now-this.animspeed) < bheight)
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
barGraphVertical.prototype.get = function(getFunction,params) {
	if(typeof getFunction === 'function') {
		var p = getFunction(params);
		p.then((data) => {
			this.val = data.toFixed(2);
			this.bheight = this.val;
			this.bheight = this.val / this.max;
		});
	}
}
/**
 * the loop
 * @returns {Void}
 * */
barGraphVertical.prototype.draw = function() {
	let x1 = this.x;
    let y1 = this.now;
    let x2 = this.bwidth;
    let y2 = this.height;
//if(this.z==0)console.log(x1,y1,x2,y2);
    $w.canvas.rectangle(this.i,x1,y1,x2,y2,this.color,'fill',this.color);
}