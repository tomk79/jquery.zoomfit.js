/**
 * jquery.zoomfit.js
 * @author Tomoya Koyanagi <tomk79@gmail.com>
 */
(function($){
	var _targetItems = [];
	var _defWidth = 0;
	var _maxZoom = 100;

	var isZoom = navigator.userAgent.indexOf('MSIE')>0 || navigator.userAgent.indexOf('AppleWebKit')>0;
	// isZoom = true;

	/**
	 * fit contents
	 */
	function fit_elm(item){
		var tw = item.elm.parent().width();
		var uw = item.width;

		var zoom = tw/uw;
		zoom = (zoom<=_maxZoom?zoom:_maxZoom);

		if( isZoom ){
			item.elm.css('zoom', zoom);
		}else{
			item.elm
				.css(   '-moz-transform', 'scale('+zoom+')')
				.css('-webkit-transform', 'scale('+zoom+')')
				.css(    '-ms-transform', 'scale('+zoom+')')
				.css(     '-o-transform', 'scale('+zoom+')')
				// .css(        'transform', 'scale('+zoom+')')
			;
		}

	}

	$.zoomfit = new (function(){

		/**
		 * init();
		 */
		this.init = function(opt){
			_targetItems = [];
			if(opt.defWidth){
				_defWidth = opt.defWidth;
			}
			if(opt.maxZoom){
				_maxZoom = opt.maxZoom;
			}
			return this;
		}// init();


		/**
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

					item.elm.css('-webkit-text-size-adjust','auto');

					fit_elm(item);
					_targetItems.push( item );
				})
			;
			return this;
		}// addElements();

	})();

	// bind window.resize event
	$(window).bind('resize', function(){
		for(var index in _targetItems){
			fit_elm(_targetItems[index]);
		}
	});

})(jQuery);
