(function(){
	var bar = require('./bar.js');
	function alerts(key){
		console.log(bar[key]);
	}
	alerts('a');
})();
