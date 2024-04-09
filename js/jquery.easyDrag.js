/*

jQuery easyDrag v1.3 / 04.2022
par Gildas P. / www.gildasp.fr

infos, tuto, démos sur 
https://lab.gildasp.fr/easydrag/

*/

(function ($) {

	var maxZ = 0;

	$.fn.easyDrag = function (params) {

		// kill one
		if (params == "kill") {
			this.each(function () {
				var self = $(this);

				var handle = self.data('handle');

				handle.off('mousedown.easydrag', easyDrag_onMouseDown);
				handle.off('touchstart.easydrag', easyDrag_onTouchStart);

				// var prev = handle.data('prev_cursor');
				// if(prev){
				// 	handle.css('cursor', prev); // rétablit le curseur
				// } else {
				handle.css('cursor', '');
				// }	   

				self.removeClass('easydrag_enabled');
			});

			// kill all
		} else if (params == 'killall') { // toutes les occurences d'easyDrag
			$('.easydrag_enabled').easyDrag('kill');

		} else {

			// paramètres par défaut
			params = $.extend({
				handle: '.handle', // cherche .handle s'il existe...
				axis: false,
				container: false,
				start: function () { },
				drag: function () { },
				stop: function () { },
				cursor: 'move', // mettre '' pour ne rien faire du tout
				ontop: true, // passe l'élément draggé au 1er plan
				clickable: true // permet le click sur l'élément draggable
			}, params);

			// listeners sur les objets draggables
			this.each(function () {
				var $self = $(this);

				if (!$self.hasClass('easydrag_enabled')) { // ssi pas déjà draggable...

					// poignée
					if (params.handle == 'this' || $self.find(params.handle).length == 0) {
						var handle = $self;
					} else {
						var handle = $self.find(params.handle);
					}
					// handle.css('prev_cursor', handle.css('cursor')); // save le précédent curseur
					if (params.cursor != '') { handle.css('cursor', params.cursor); } // curseur

					// save params
					handle.data(params);

					// boulet
					var $boulet = $self;
					$boulet.addClass('easydrag_enabled'); // identifie les objets draggables

					// save couplage poignée-boulet
					$boulet.data('handle', handle); // (override .handle...)
					handle.data('boulet', $boulet);

					// z-index
					if ($self.css('z-index') != 'auto' && params.ontop) {
						maxZ = Math.max(maxZ, $self.css('z-index'));
					};

					// positionnement css
					if ($self.css('position') != 'absolute' && $self.css('position') != 'fixed') {
						if ($self.css('left') == 'auto') { $self.css('left', '0'); } // sur android...
						if ($self.css('top') == 'auto') { $self.css('top', '0'); }
						$self.css('position', 'relative');
					}

					// mouse/touch events
					// handle.on('mousedown.easydrag', easyDrag_onMouseDown);
					// handle.on('touchstart.easydrag', easyDrag_onTouchStart);
					handle.on('mousedown.easydrag touchstart.easydrag', easyDrag_onStart);
				}
			});
		}

		return this;
	};

	var self, t, boulet, initItemX, initItemY, initEventX, initEventY, axis, container, refX, refY; // buffer

	// mouse
	function easyDrag_onStart(e) {
		e.preventDefault();

		t = Date.now();

		// buffer
		self = $(this);
		boulet = self.data('boulet');
		initItemX = parseInt(boulet.css('left'));
		initItemY = parseInt(boulet.css('top'));
		axis = self.data('axis');
		container = self.data('container');

		if (e.type == "mousedown") {
			initEventX = e.pageX;
			initEventY = e.pageY;
		} else {
			var touch = e.originalEvent.changedTouches[0];
			initEventX = touch.pageX;
			initEventY = touch.pageY;
		}

		if (container.length) {
			refX = self.offset().left;
			refY = self.offset().top;
		}

		self.data('start').call(boulet);

		// $(document).on('mousemove.easydrag', easyDrag_onMouseMove);
		// $(document).on('click.easydrag', easyDrag_onMouseUp);
		// $(document).on('touchmove.easydrag', easyDrag_onTouchMove);
		// $(document).on('click.easydrag', easyDrag_onTouchEnd);
		$(document).on('mousemove.easydrag touchmove.easydrag', easyDrag_onMove);
		$(document).on('mouseup.easydrag touchend.easydrag', easyDrag_onEnd);

		// over the top !
		if (self.data('ontop')) {
			maxZ++;
			boulet.css('z-index', maxZ);
		}
	}
	function easyDrag_onMove(e) {
		e.preventDefault();

		self.data('drag').call(boulet); // drag event

		if (e.type == "mousemove") {
			// mouse
			var nextX = initItemX + e.pageX - initEventX;
			var nextY = initItemY + e.pageY - initEventY;
		} else {
			// touch
			var touch = e.originalEvent.changedTouches[0];
			var nextX = initItemX + touch.pageX - initEventX;
			var nextY = initItemY + touch.pageY - initEventY;
		}

		if (!axis || axis == 'x') { boulet.css({ 'left': nextX + 'px' }); }
		if (!axis || axis == 'y') { boulet.css({ 'top': nextY + 'px' }); }

		easyDrag_contain();
	}
	function easyDrag_onEnd(e) {
		$(document).off('mousemove.easydrag touchmove.easydrag', easyDrag_onMove);
		$(document).off('mouseup.easydrag touchend.easydrag', easyDrag_onEnd);

		self.data('stop').call(boulet); // stop event	

		// temps écoulé -> click ou pas click ?
		var d = Date.now() - t;

		if (d > 300 || !self.data('clickable')) {
			e.preventDefault();
			e.stopPropagation();
		} else if (d <= 300 && self.data('clickable') && e.type == "touchend") {
			self.trigger('click');
		}
	}


	// contrainte éventuelle...
	function easyDrag_contain() {
		if (container.length) {

			// position actuelle...
			var cur_offset = boulet.offset();
			var container_offset = container.offset();

			// horizontal
			var limite1 = container_offset.left;
			var limite2 = limite1 + container.width() - boulet.innerWidth();
			limite1 += parseInt(boulet.css('margin-left'));
			if (cur_offset.left < limite1) {
				boulet.offset({ left: limite1 });
			} else if (cur_offset.left > limite2) {
				boulet.offset({ left: limite2 });
			}

			// vertical
			var limite1 = container_offset.top;
			var limite2 = limite1 + container.height() - boulet.innerHeight();
			limite1 += parseInt(boulet.css('margin-top'));
			if (cur_offset.top < limite1) {
				boulet.offset({ top: limite1 });
			} else if (cur_offset.top > limite2) {
				boulet.offset({ top: limite2 });
			}
		}
	};

})(jQuery);