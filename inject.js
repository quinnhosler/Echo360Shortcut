// this is the code which will be injected into a given page...

(function() {
	
	$('a.classroom-sidebar-close')[0].click()				// close annoying notes bar on right
	
	$(document).off('keydown');
	$(document).on('keydown', function (e) {
		var button = e.which;
		
		if (button == 75 || button == 32)					// 'k' or space
			$('a.video-play-btn')[0].click();
		else if (button == 74)								// 'j'
			$('.video-rewind-btn')[0].click();
		else if (button == 190)								// Shift+>
			$('.video-speed-btn.plus')[0].click();
		else if (button == 188)								// Shift+<
			$('.video-speed-btn.minus')[0].click();			
		else if (button == 70)								// 'f'
			$('.video-fullscreen-btn')[0].click();
		else if (button == 77)								// 'm'
			$('.video-volume-btn')[0].click();
		else if (button == 27)								// escape
			$('.exitBtn')[0].click();
		else if (button == 39) {								// right
			$('video')[0].pause();
			$('video')[0].currentTime += 10;
			$('video')[0].play();		
		}
		else if (button == 37)								// left
			$('.video-rewind-btn')[0].click();
		else if (button == 38)								// up
			$('.video-speed-btn.plus')[0].click();
		else if (button == 40)								// down
			$('.video-speed-btn.minus')[0].click();	
	});

})();

