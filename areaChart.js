/** 
 * AreaChart
 * @param {Object}
 * */
var AreaChart = function(o) {

	this.i = o.i;

	this.width = o.width;

	this.height = o.height;

	this.color = o.color;

	this.max = o.max;

	this.data = o.vals;

	this.now = this.height;

	// uncomment to draw without animation
	//this.draw(this.makedata(this.data,false));

}
/**
 * the loop
 * @returns {Void}
 * */
AreaChart.prototype.loop = function() {
	if(this.now > 0){
		this.makedata(this.data,true);
		this.now-=15;
	}

	this.draw(this.drawdata);
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
	
	for (let i=0; i<this.data.length; i++) {
		if(animate) {
			if(this.now > (this.height-(data[i]/this.max))) {
				da = [j,this.now];
			}else{
				da = [j,(this.height-(data[i]/this.max))];
			}
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