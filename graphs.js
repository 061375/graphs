/** 
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
		'#ffa500'
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
		for(let i=0; i<data.length; i++) {
			if(max < data[i].val)
				max = data[i].val;
		}

		max = (max / width);

		let j;
		for(let i=0; i<data.length; i++) {
			if(i==0) {
				j = $w.add_object_single(
					1,
					barGraphHorizontal,{
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
					barGraphHorizontal,{
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
	 * @method verticalBarGraph
	 * */
	var verticalBarGraph = function($t,title,data) {

		let $title = document.createElement('h2');
			$title.innerHTML = title;
			$title.setAttribute('id','vgraphtitle_'+n_ofgraphs);
		$t.appendChild($title);

		let gheight = (height - (document.getElementById('vgraphtitle_'+n_ofgraphs).scrollHeight) - 10);


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
					barGraphVertical,{
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
					barGraphVertical,{
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
	return {
		init:init,
		horizBarGraph:horizBarGraph,
		verticalBarGraph:verticalBarGraph
	}

})();