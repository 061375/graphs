/** 
 * AreaChart
 * @param {Object}
 8 https://stackoverflow.com/questions/6995797/html5-canvas-pie-chart
 * */
var PieChart = function(o) {

	this.i = o.i;

	this.width = o.width;

	this.height = o.height;

	this.max = o.max;

	this.data = o.data;

	this.colors = o.colors;

	this.total = this.gettotal(this.data);

	this.draw(this.data);

	// uncomment to draw without animation
	//this.draw(this.makedata(this.data,false));

}
/**
 * the loop
 * @returns {Void}
 * */
PieChart.prototype.loop = function() {
	/*
	if(this.now > 0){
		this.makedata(this.data,true);
		this.now-=15;
	}

	this.draw(this.drawdata);
	*/
}
/**
 * build the  array to pass to the draw method
 * @param {Array}
 * @param {Boolean}
 * @returns {Void}
 * */
PieChart.prototype.gettotal = function(data) {
	let t = 0;
	for(let i=0; i<data.length; i++)
		t += data[i];
	return t;
}
/**
 * @param {Array}
 * @returns {Void}
 * */
PieChart.prototype.draw = function(data) {	
	let le = 0;
	for(let i=0; i<data.length; i++){
		$w.canvas.arc(this.i,this.width/2,this.height/2,(this.width/3),le,le + (Math.PI * 2 * (data[i] / this.total)),false,this.colors[i]);
		le += Math.PI * 2 * (data[i] / this.total);
	}
}