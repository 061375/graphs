/** 
 * AreaChart
 * @param {Object}
 * */
var AreaChart = function(o) {
	this.i = o.i;

	this.z = o.z;

	this.width = o.width;

	this.height = o.height;

	this.color = o.color;

	this.max = o.max;

	this.data = o.vals;

	this.updateint = o.updateint;

	this.updatecounter = 0;

	this.animspeed = 1;

	this.now = [];
	for(let i=0; i<this.data.length; i++)
		this.now[i] = this.height;

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

	// uncomment to draw without animation
	//this.draw(this.makedata(this.data,false));

}
/**
 * the loop
 * @returns {Void}
 * */
AreaChart.prototype.loop = function() {
	
	this.updatecounter++;
	if(this.updatecounter >= this.updateint) {
		this.updatecounter = 0;
		this.get(this.getFunction,this.getParams);
	}else{
		this.makedata(this.data,true);
		this.draw(this.drawdata);
	}
}
/** 
 * comment
 * @method 
 * */
AreaChart.prototype.push = function(data) {
	this.data = data;
}
/**
 * gets data from an external location using a function defined by the user
 * @param {Function}
 * @param {Object}
 * @returns {Void}
 * */
AreaChart.prototype.get = function(getFunction,params) {
	if(typeof getFunction === 'function') {
		var p = getFunction(params);
		p.then((data) => {
			this.data = data;
		});
	}
}
/**
 * build the  array to pass to the draw method
 * @param {Array}
 * @param {Boolean}
 * @returns {Void}
 * */
AreaChart.prototype.makedata = function(data,animate) {

	// @let {Number} - use this to push the graph x over to allow a legend @todo
	let j = 0;
	// @let {Number} - avaiable drawing space
	let w = this.width-j;
	// @let {Number} width of each section of the graph
	let lw = w / (data.length-1);
	// {Array}
	let da;

	this.drawdata = [[j,this.height]];
	
	for (let i=0; i<data.length; i++) {
		if(animate) {
			if((this.now[i]+this.animspeed) > (this.height-(data[i]/this.max))) {
				this.now[i]-=this.animspeed;
			}
			if((this.now[i]-this.animspeed) < (this.height-(data[i]/this.max))) {
				this.now[i]+=this.animspeed;
			}
			da = [j,this.now[i]];
		}else{
			da = [j,(this.height-(data[i]/this.max))];
		}
		this.drawdata.push(da);
		j+=lw;
	}
	this.drawdata.push([j-lw,this.height]);

	return this.drawdata;
}
/**
 * @param {Array}
 * @returns {Void}
 * */
AreaChart.prototype.draw = function(data) {	
	$w.canvas.polygon(this.i,data,this.color,'fill',this.color,0.1);
	// draw the stroke a few times to make it show up real nice
	$w.canvas.polygon(this.i,data,'#000','stroke','#000',1);
	$w.canvas.polygon(this.i,data,'#000','stroke','#000',1);
	$w.canvas.polygon(this.i,data,'#000','stroke','#000',1);
}	