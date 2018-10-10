/** 
 * AreaChart
 * @param {Object}
 * */
var PieChart = function(o) {

	this.i = o.i;

	this.z = o.z;

	this.width = o.width;

	this.height = o.height;

	this.max = o.max;

	this.data = o.data;

	this.colors = o.colors;

	this.total = this.gettotal(this.data);

	this.draw(this.data);

}
/**
 * the loop
 * @returns {Void}
 * */
PieChart.prototype.loop = function() {
	this.total = this.gettotal(this.data);
	this.draw(this.data);
}
/**
 * 
 * @returns {Void}
 * */
PieChart.prototype.push = function(data) {
	this.data = data;
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
		$w.canvas.arc(this.i,this.width/2,this.height/2,(this.width/3),le,le + (Math.PI * 2 * (data[i] / this.total)),false,this.colors[i],'fill');
		le += Math.PI * 2 * (data[i] / this.total);
	}
}