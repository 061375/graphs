/** 
 * AreaChart
 * @param {Object}
 * */
var PressureSpeedo = function(o) {

	this.i = o.i;

	this.z = o.z;

	this.width = o.width;

	this.height = o.height;

	this.hwidth = this.width / 2;

	this.hheight = this.height / 2;

	this.maxp = o.maxp;

	this.pspeed = 0;

	this.rspeed = o.rspeed;

	this.real = o.data;

	this.tpspeed = o.real / 360;

	this.updateint = o.updateint;

	this.updatecounter = 0;

	this.measure = o.measure;

	this.mode = 0;
	if(o.mode !== undefined)
		this.mode = o.mode;

	if(0 == this.mode) {
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
		this.getParams.maxp = this.maxp;
	}
}
/**
 * the loop
 * @returns {Void}
 * */
PressureSpeedo.prototype.loop = function() {
	this.updatecounter++;
	if(this.updatecounter >= this.updateint) {
		this.updatecounter = 0;
		this.get(this.getFunction,this.getParams);
	}else{
		if((this.pspeed+this.rspeed) > this.tpspeed)
			this.pspeed-=this.rspeed;
		if((this.pspeed-this.rspeed) < this.tpspeed)
			this.pspeed+=this.rspeed;
		
	}
	this.draw();
}
/**
 * gets data from an external location using a function defined by the user
 * @param {Function}
 * @param {Object}
 * @returns {Void}
 * */
PressureSpeedo.prototype.get = function(getFunction,params) {

	if(typeof getFunction === 'function') {
		var p = getFunction(params);
		p.then((data) => {
			this.real = data;
			this.calc(data);
		});
	}
}
/**
 * Allows external method to push data to the gauge
 * @param {Function}
 * @param {Object}
 * @returns {Void}
 * */
PressureSpeedo.prototype.push = function(data) {
	this.real = data;
	this.calc(data);
}
/** 
 * comment
 * @method calc
 * */
PressureSpeedo.prototype.calc = function(data) {
	let a = this.maxp / 360;
		this.tpspeed = data / a;
}
/**
 * build the  array to pass to the draw method
 * @param {Array}
 * @param {Boolean}
 * @returns {Void}
 * */
PressureSpeedo.prototype.trig = function(x,y,d,r) {
	
	if(d<0)d+=360;
	if(d>360)d-=360;

	let a = $w.math.radians(d);
    var xpos = r * Math.cos(a);
    var ypos = r * Math.sin(a);
    return {
        x:xpos+x,
        y:ypos+y
    }
}
/**
 * @param {Array}
 * @returns {Void}
 * */
PressureSpeedo.prototype.drawmeasure = function() {
	$w.canvas.text(this.i,20,20,(this.real.toFixed(2))+' '+this.measure,'fill','10px Arial');
}
/**
 * @param {Array}
 * @returns {Void}
 * */
PressureSpeedo.prototype.drawneedle = function() {
	$w.canvas.circle(this.i,this.hwidth,this.hheight,10);
	let xy1 = this.trig(this.hwidth,this.hheight,this.pspeed-90,10);
	let xy2 = this.trig(this.hwidth,this.hheight,this.pspeed+90,10);
	let xy3 = this.trig(this.hwidth,this.hheight,this.pspeed,(this.width/3)-30);
	
	$w.canvas.polygon(this.i,[
		[xy1.x,xy1.y],
		[xy2.x,xy2.y],
		[xy3.x,xy3.y]
	],'#000000','fill');
}
/**
 * @param {Array}
 * @returns {Void}
 * */
PressureSpeedo.prototype.draw = function(data) {
	this.drawmeasure();	
	this.drawneedle();
}

/** 
 * AreaChart
 * @param {Object}
 * */
var PressureSpeedoGauge = function(o) {
	this.i = o.i;

	this.width = o.width;

	this.height = o.height;

	this.hwidth = this.width / 2;

	this.hheight = this.height / 2;

	this.maxp = o.maxp;

	if(undefined === o.divisor) {
		this.divisor = 12;
	}else{
		this.divisor = o.divisor;
	}
	if(undefined === o.shownumbers) {
		this.shownumbers = false;
	}else{
		this.shownumbers = o.shownumbers;
	}

	this.gaugeinc = this.maxp / this.divisor;

	this.drawgauge();
}
/**
 * @param {Array}
 * @returns {Void}
 * */
PressureSpeedoGauge.prototype.loop = function() {	
}
/**
 * @param {Array}
 * @returns {Void}
 * */
PressureSpeedoGauge.prototype.warning = function(s,e) {
	$w.canvas.arc(this.i,this.hwidth,this.hheight,((this.width/3)),$w.math.radians(s),$w.math.radians(e),false,'#ffff00','fill');
}
/**
 * @param {Array}
 * @returns {Void}
 * */
PressureSpeedoGauge.prototype.danger = function(s,e) {
	$w.canvas.arc(this.i,this.hwidth,this.hheight,((this.width/3)),$w.math.radians(s),$w.math.radians(e),false,'#ff0000','fill');
}
/**
 * build the  array to pass to the draw method
 * @param {Array}
 * @param {Boolean}
 * @returns {Void}
 * */
PressureSpeedoGauge.prototype.trig = function(x,y,d,r) {
	
	if(d<0)d+=360;
	if(d>360)d-=360;

	let a = $w.math.radians(d);
    var xpos = r * Math.cos(a);
    var ypos = r * Math.sin(a);
    return {
        x:xpos+x,
        y:ypos+y
    }
}
/**
 * @param {Array}
 * @returns {Void}
 * */
PressureSpeedoGauge.prototype.drawgauge = function() {	
	this.warning(270,330);
	this.danger(330,360);
	let r = (this.width/3);
	let ii = 0;
	// draw circle
	$w.canvas.circle(this.i,this.hwidth,this.hheight,r,'#ffffff',1,'fill');
	$w.canvas.circle(this.i,this.hwidth,this.hheight,r,'#000000',1,'stroke');
	// draw individual 
	for(let i=0; i<360; (i+=360/this.divisor)) {
		let xy1 = this.trig(this.hwidth,this.hheight,i,r);
		let xy2 = this.trig(this.hwidth,this.hheight,i,r-10);
		$w.canvas.line(this.i,xy1.x,xy1.y,xy2.x,xy2.y,'#000000',3);
		if(this.shownumbers) {
			let xy3 = this.trig(this.hwidth-10,this.hheight,i,r+20);
			$w.canvas.text(this.i,xy3.x,xy3.y,Math.floor(ii),'fill','10px Arial');
			ii+=this.gaugeinc;
		}
	}
	
}