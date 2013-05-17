/**
 * jquery.zoomfit.js
 * @author Tomoya Koyanagi <tomk79@gmail.com>
 */
(function($){
	var _targetItems = [];
	var _defWidth = 0;
	var _maxZoom = 1;

	function fit_elm(item){
		var tw = item.elm.parent().width();
		var uw = item.width;

		var zoom = tw/uw;
		item.elm.css('zoom', (zoom<=_maxZoom?zoom:_maxZoom));
	}

	$.zoomfit = new (function(){

		/*
		* init();
		*/
		this.init = function(defWidth){
			_targetItems = [];
			if(defWidth){_defWidth = defWidth;}
			return this;
		}// init();


		/*
		* addElements();
		*/
		this.addElements = function(target, width){
			$(target)
				.each(function(){
					var item = {
						elm: $(this) ,
						width: (width?width:_defWidth)
					};
					if(item.elm[0].attributes['data-std-width']){
						item.width = item.elm[0].attributes['data-std-width'].value;
						item.width = Number(item.width);
					}

					fit_elm(item);
					_targetItems.push( item );
				})
			;
			return this;
		}// addElements();

	})();

	// イベントをセット
	$(window).bind('resize', function(){
		for(var index in _targetItems){
			fit_elm(_targetItems[index]);
		}
	});

})(jQuery);
