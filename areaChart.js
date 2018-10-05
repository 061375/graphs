var AreaChart = function(o) {

	this.i = o.i;

	this.width = o.width;

	this.height = o.height;

	this.color = o.color;

	this.max = o.max;

	this.draw(o.vals);

}
/**
 * the loop
 * @returns {Void}
 * */
AreaChart.prototype.loop = function() {
	/*
	$w.canvas.rectangle(this.i,this.x,this.y,this.wnow,(this.x + this.bheight),this.color,'fill',this.color);
	$w.canvas.line(this.i,this.x,(this.y + this.bheight),this.width,(this.y + this.bheight),'#ccc');
	$w.canvas.text(this.i,this.x+21,(this.y+((this.bheight / 3)*2)+1),this.text+': '+this.val,'stroke','20px Arial','#000');
	if(this.wnow < this.bwidth)this.wnow+=15;
	*/
}

/**
 * 
 * @returns {Void}
 * */
AreaChart.prototype.draw = function(data) {

	let j = 0;
	let w = this.width-j;
	let lw = w / (data.length-1);
	

	let _data = [[j,this.height]];
	
	for (let i=0; i<data.length; i++) {
		let da = [j,(this.height-(data[i]/this.max))];
		_data.push(da);
		j+=lw;
	}
	_data.push([j-lw,this.height]);

	$w.canvas.polygon(this.i,_data,this.color,'fill',this.color,0.2);
	$w.canvas.polygon(this.i,_data,'#000','stroke','#000',1);
	$w.canvas.polygon(this.i,_data,'#000','stroke','#000',1);
	$w.canvas.polygon(this.i,_data,'#000','stroke','#000',1);
}