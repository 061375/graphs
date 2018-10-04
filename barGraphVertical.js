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

	this.wnow = 0;
    
	this.put();

    
}
/**
 * the loop
 * @returns {Void}
 * */
barGraphVertical.prototype.loop = function() {
	$w.canvas.rectangle(this.i,this.x,this.y,this.bwidth,this.wnow,this.color,'fill',this.color);
	//$w.canvas.text(this.i,this.x+21,(this.y+((this.bheight / 3)*2)+1),this.text+': '+this.val,'stroke','20px Arial','#000');
	if(this.wnow < this.bheight)this.wnow+=15;
}

/**
 * 
 * @returns {Void}
 * */
barGraphVertical.prototype.put = function() {
    console.log(this.x);
    console.log(this.bheight);
    console.log((this.x + this.bwidth));
    console.log(this.y);
    
    console.log('____');
	$w.canvas.rectangle(this.i,this.x,this.y,this.bwidth,this.wnow,this.color,'fill',this.color);
	//$w.canvas.text(this.i,this.x+21,(this.y+((this.bheight / 3)*2)+1),this.text+': '+this.val,'stroke','20px Arial','#000');
    //$w.canvas.text(this.i,0,20,this.text+': '+this.val,'stroke','20px Arial','#000');
}