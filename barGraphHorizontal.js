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

	this.wnow = 0;

	this.put();

}
/**
 * the loop
 * @returns {Void}
 * */
barGraphHorizontal.prototype.loop = function() {
	$w.canvas.rectangle(this.i,this.x,this.y,this.wnow,(this.x + this.bheight),this.color,'fill',this.color);
	$w.canvas.line(this.i,this.x,(this.y + this.bheight),this.width,(this.y + this.bheight),'#ccc');
	$w.canvas.text(this.i,this.x+21,(this.y+((this.bheight / 3)*2)+1),this.text+': '+this.val,'stroke','20px Arial','#000');
	if(this.wnow < this.bwidth)this.wnow+=15;
}

/**
 * 
 * @returns {Void}
 * */
barGraphHorizontal.prototype.put = function() {
	$w.canvas.rectangle(this.i,this.x,this.y,0,(this.x + this.bheight),this.color,'fill',this.color);
	$w.canvas.text(this.i,this.x+21,(this.y+((this.bheight / 3)*2)+1),this.text+': '+this.val,'stroke','20px Arial','#000');
}