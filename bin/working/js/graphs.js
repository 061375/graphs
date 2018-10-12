/** 
 * Graphs
 * @author Jeremy Heminger <contact@jeremyheminger.com>
 *
 * This class sort of wraps the Wes Mantoothian way that I create classes to make things easier
 * 
 *
 * */
var Graphs = (function() {

	var colors = [
		'#3366cc',
		'#fdab3d',
		'#db4437',
		'#008000',
		'#ffff00',
		'#ffd700',
		'#808000',
		'#7e077e',
		'#197f7e',
		'#30ccd2',
		'#eff0f1',
		'#3dfdff',
		'#ff158a',
		'#e2445c',
		'#1ec875',
		'#dd4b39',
		'#579bfc',
		'#7a6eff',
		'#ffa500',
		'#154096'
	];

	var width, height;

	var init = function(w,h) {
		width = w;
		height = h;
	}

	var n_ofgraphs = 0;

	/** 
	 * comment
	 * @method horizBarGraph
	 * */
	var horizBarGraph = function($t,title,data) {

		let $title = document.createElement('h2');
			$title.innerHTML = title;
			$title.setAttribute('id','graphtitle_'+n_ofgraphs);
		$t.appendChild($title);

		let gheight = (height - (document.getElementById('graphtitle_'+n_ofgraphs).scrollHeight) - 10);


		let max = 0;
		for(let i=0; i<data.data.length; i++) {
			if(max < data.data[i].val)
				max = data.data[i].val;
		}

		max = (max / width);

		let j;
		for(let i=0; i<data.data.length; i++) {
			if(i==0) {
				j = $w.add_object_single(
					1,
					barGraphHorizontal,{
						text:data.data[i].text,
						val:data.data[i].val,
						max:max,
						width:width,
						height:gheight,
						color:colors[i],
						values:data.data.length,
						updateint:data.updateint,
						getFunction:data.getFunction,
						getParams:data.getParams,
						mode:data.mode
					},
					$t,
					width,
					gheight
				);
			}else{
				$w.add_object_single(
					1,
					barGraphHorizontal,{
						text:data.data[i].text,
						val:data.data[i].val,
						max:max,
						width:width,
						height:gheight,
						color:colors[i],
						values:data.data.length,
						updateint:data.updateint,
						getFunction:data.getFunction,
						getParams:data.getParams,
						mode:data.mode
					},
					j,
					width,
					gheight
				);
			}
		}
		$w.loop(true,j);

		return getZvalues(j,'barGraphHorizontal');
	}
	/** 
	 * comment
	 * @method verticalBarGraph
	 * */
	var verticalBarGraph = function($t,title,data) {

		let $title = document.createElement('h2');
			$title.innerHTML = title;
			$title.setAttribute('id','vgraphtitle_'+n_ofgraphs);
		$t.appendChild($title);

		let gheight = (height - (document.getElementById('vgraphtitle_'+n_ofgraphs).scrollHeight) - 10);


		let max = 0;
		for(let i=0; i<data.data.length; i++) {
			if(max < data.data[i].val)
				max = data.data[i].val;
		}

		if(max > gheight) {
			max = (max / gheight);
		}else{
			max = gheight;
		}

		let j;
		for(let i=0; i<data.data.length; i++) {
			if(i==0) {
				j = $w.add_object_single(
					1,
					barGraphVertical,{
						text:data.data[i].text,
						val:data.data[i].val,
						max:max,
						width:width,
						height:gheight,
						color:colors[i],
						values:data.data.length,
						updateint:data.data.updateint,
						getFunction:data.getFunction,
						getParams:data.getParams,
					},
					$t,
					width,
					gheight
				);
			}else{
				$w.add_object_single(
					1,
					barGraphVertical,{
						text:data.data[i].text,
						val:data.data[i].val,
						max:max,
						width:width,
						height:gheight,
						color:colors[i],
						values:data.data.length,
						updateint:data.updateint,
						getFunction:data.getFunction,
						getParams:data.getParams,
					},
					j,
					width,
					gheight
				);
			}
		}
		$w.loop(true,j);
	}
	/** 
	 * comment
	 * @method horizLineGraph
	 * */
	var horizLineGraph = function($t,title,data) {

		let $title = document.createElement('h2');
			$title.innerHTML = title;
			$title.setAttribute('id','lgraphtitle_'+n_ofgraphs);
		$t.appendChild($title);

		let gheight = (height - (document.getElementById('lgraphtitle_'+n_ofgraphs).scrollHeight) - 10);


		let max = 0;
		for(let i=0; i<data.length; i++) {
			if(max < data[i].val)
				max = data[i].val;
		}

		if(max > gheight) {
			max = (max / gheight);
		}else{
			max = gheight;
		}

		let j;
		for(let i=0; i<data.length; i++) {
			if(i==0) {
				j = $w.add_object_single(
					1,
					lineGraphHorizontal,{
						text:data[i].text,
						val:data[i].val,
						max:max,
						width:width,
						height:gheight,
						color:colors[i],
						values:data.length
					},
					$t,
					width,
					gheight
				);
			}else{
				$w.add_object_single(
					1,
					lineGraphHorizontal,{
						text:data[i].text,
						val:data[i].val,
						max:max,
						width:width,
						height:gheight,
						color:colors[i],
						values:data.length
					},
					j,
					width,
					gheight
				);
			}
		}
		$w.loop(true,j);
	}
	/** 
	 * comment
	 * @method posLiveDataStream
	 * */
	var posLiveDataStream = function($t,title,data) {
		let $title = document.createElement('h2');
			$title.innerHTML = title;
			$title.setAttribute('id','lgraphtitle_'+n_ofgraphs);
		$t.appendChild($title);

		let gheight = (height - (document.getElementById('lgraphtitle_'+n_ofgraphs).scrollHeight) - 10);

		let j = $w.add_object_single(
			1,
			positiveLiveDataStream,{
				getFunction:data.getFunction,
				getParams:data.getParams,
				updateint:data.updateint,
				width:width,
				height:gheight,
				linecolor:data.linecolor,
				textcolor:data.textcolor,
				xmin:data.xmin,
				mode:data.mode,
				xmin:data.xmin,
				xmax:data.xmax,
				currentx:data.currentx,
				currenty:data.currenty,
				measure:data.measure,
				bcurrent:data.bcurrent,
				bcurrenttitle:data.bcurrenttitle,
				bmax:data.bmax,
				bmaxtitle:data.bmaxtitle,
				data:data.data
			},
			$t,
			width,
			gheight
		);
		$w.loop(true,j);

		return getZvalues(j,'posLiveDataStream');
	}
	/** 
	 * comment
	 * @method posLiveDataStream
	 * */
	var livDataStream = function($t,title,data) {
		let $title = document.createElement('h2');
			$title.innerHTML = title;
			$title.setAttribute('id','lgraphtitle_'+n_ofgraphs);
		$t.appendChild($title);

		let gheight = (height - (document.getElementById('lgraphtitle_'+n_ofgraphs).scrollHeight) - 10);

		let j = $w.add_object_single(
			1,
			liveDataStream,{
				getFunction:data.getFunction,
				getParams:data.getParams,
				updateint:data.updateint,
				width:width,
				height:gheight,
				data:data.data
			},
			$t,
			width,
			gheight
		);
		$w.loop(true,j);

	}
	/** 
	 * comment
	 * @param {Object}
	 * @param {String}
	 * @param {Array}
	 * @method areaChart
	 * */
	var areaChart = function($t,title,data) {
		let $title = document.createElement('h2');
			$title.innerHTML = title;
			$title.setAttribute('id','acharttitle_'+n_ofgraphs);
		$t.appendChild($title);

		let gheight = (height - (document.getElementById('acharttitle_'+n_ofgraphs).scrollHeight) - 10);

		let max = 0;
		for(let i=0; i<data.data.length; i++) {
			for(let j=0; j<data.data[i].vals.length; j++) {
				if(max < data.data[i].vals[j])
					max = data.data[i].vals[j];
			}
		}

		if(max > gheight) {
			max = (max / gheight);
		}else{
			max = gheight;
		}
		// @let {Number}
		let j;
		for(let i=0; i<data.data.length; i++) {
			if(i==0) {
				j = $w.add_object_single(
					1,
					AreaChart,{
						getFunction:data.getFunction,
						getParams:data.getParams,
						updateint:data.updateint,
						text:data.data[i].text,
						vals:data.data[i].vals,
						max:max,
						width:width,
						height:gheight,
						color:colors[i]
					},
					$t,
					width,
					gheight
				);
			}else{
				$w.add_object_single(
					1,
					AreaChart,{
						getFunction:data.getFunction,
						getParams:data.getParams,
						updateint:data.updateint,
						text:data.data[i].text,
						vals:data.data[i].vals,
						max:max,
						width:width,
						height:gheight,
						color:colors[i]
					},
					j,
					width,
					gheight
				);
			}
		}
		$w.loop(true,j);

	}
	/** 
	 * comment
	 * @method posLiveDataStream
	 * */
	var pieChart = function($t,title,data) {
		let $title = document.createElement('h2');
			$title.innerHTML = title;
			$title.setAttribute('id','pcharttitle_'+n_ofgraphs);
		$t.appendChild($title);

		let gheight = (height - (document.getElementById('pcharttitle_'+n_ofgraphs).scrollHeight) - 10);

		let j = $w.add_object_single(
			1,
			PieChart,{
				width:width,
				height:gheight,
				data:data.data,
				colors:colors
			},
			$t,
			width,
			gheight
		);
		
		$w.loop(true,j);

		return getZvalues(j,'PieChart');
	}
	/** 
	 * comment
	 * @method pressureSpeedo
	 * */
	var pressureSpeedo = function($t,title,data) {
		let $title = document.createElement('h2');
			$title.innerHTML = title;
			$title.setAttribute('id','pspeedotitle_'+n_ofgraphs);
		$t.appendChild($title);

		let gheight = (height - (document.getElementById('pspeedotitle_'+n_ofgraphs).scrollHeight) - 10);

		$w.add_object(
			1,
			PressureSpeedoGauge,{
				width:width,
				height:gheight,
				divisor:data.divisor,
				shownumbers:data.shownumbers,
				maxp:data.maxp,
				warning:data.warning,
				danger:data.danger,
				ringgauge:data.ringgauge,
				glinesize:data.glinesize,
				gbackground:data.gbackground,
				glinecolor:data.glinecolor,
				size:data.size
			},
			$t,
			width,
			gheight 
		);
		let j = $w.add_object_single(
			1,
			PressureSpeedo,{
				getFunction:data.getFunction,
				getParams:data.getParams,
				updateint:data.updateint,
				width:width,
				height:gheight,
				rspeed:data.rspeed,
				maxp:data.maxp,
				measure:data.measure,
				data:0,
				mode:data.mode,
				size:data.size,
				mpos:data.mpos,
				mcolor:data.mcolor,
				msize:data.msize,
				animate:data.animate
			},
			$t,
			width,
			gheight
		);
		$w.loop(true,j);

		return getZvalues(j,'PressureSpeedo');
	} 




	// ----- GETTERS



	/** 
	 * comment
	 * @method getZvalues
	 * */
	var getZvalues = function(i,method) {
		let zs = [];
		switch(method) {
			case 'pressureSpeedo':
				method = 'PressureSpeedo';
			break;
			case 'areaChart':
				method = 'AreaChart';
			break;
			case 'livDataStream':
				method = 'liveDataStream';
			break;
			case 'posLiveDataStream':
				method = 'positiveLiveDataStream';
			break;
			case 'verticalBarGraph':
				method = 'barGraphVertical';
			break;
			case 'horizBarGraph':
				method = 'barGraphHorizontal';
			break;
			case 'pieChart':
				method = 'PieChart';
			break;
		}
		//  if the requested object exists
		if(undefined !== $w.objects[method]) {
			for(let obj in $w.objects[method]) {
				if($w.objects[method].hasOwnProperty(obj)) {
					if($w.objects[method][obj].i == i) {
						zs.push(obj);
					}
				}
			}
		}

		return zs;
	}



	// ----- SETTERS



	/** 
	 * comment
	 * @method setPushData
	 * */
	var setPushData = function(ref,method,data) { 

		switch(method) {
			case 'pressureSpeedo':
				method = 'PressureSpeedo';
			break;
			case 'areaChart':
				method = 'AreaChart';
			break;
			case 'livDataStream':
				method = 'liveDataStream';
			break;
			case 'posLiveDataStream':
				method = 'positiveLiveDataStream';
			break;
			case 'verticalBarGraph':
				method = 'barGraphVertical';
			break;
			case 'horizBarGraph':
				method = 'barGraphHorizontal';
			break;
			case 'pieChart':
				method = 'PieChart';
			break;
		}

		//  if the requested object exists
		if(undefined !== $w.objects[method]) {
			// loop the objects and find one that matc hes the reference ID
			// unfortunately WMT pushes objects to the object array using numerical keys but essentially the key is a string
			// otherwise I could reference it correctly, so we have to loop
			// But it's unlekely that there will be more than a few to loop
			for(let obj in $w.objects[method]) {
				if($w.objects[method].hasOwnProperty(obj)) {
					if($w.objects[method][obj].z == ref) {
						$w.objects[method][obj].push(data);
					}
				}
			}
			
		}
	}


	return {
		init:init,
		horizBarGraph:horizBarGraph,
		verticalBarGraph:verticalBarGraph,
		posLiveDataStream:posLiveDataStream,
		livDataStream:livDataStream,
		areaChart:areaChart,
		pieChart:pieChart,
		pressureSpeedo:pressureSpeedo,
		setPushData:setPushData,
		getZvalues:getZvalues
	}

})();