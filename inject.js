// this is the code which will be injected into a given page...

(function() {
	$('a.disable-btn').hide();
	$(':focus').blur();
	$('div.content *').on('focus', function(e) {
		$(e.currentTarget).blur();
	});
	
	$('div.media-screen.focused.enabled').on('click', function (e) {
		$(e.currentTarget).removeClass('focus');
		e.stopImmediatePropagation();
	})
	
	var video = $('video')[0];
	$('a.video-btn.settings-btn').removeClass('settings-btn').addClass('speed').text(video.playbackRate.toFixed(1)+'x').css('font-size', '1.3em');
	video.onratechange = function () {
		$('a.video-btn.speed').text(video.playbackRate.toFixed(1)+'x')
	}
	
	
	$(document).on('keydown', function (e) {
		var button = e.which;
		
		if (button == 75 || button == 32) {					// 'k' or space(32)
			$('a.video-btn.play-btn')[0].click();
		}
		else if (button == 74 || button == 37) {			// 'j' or left arrow
			if (video.paused == true)
				video.currentTime -= 10;
			else {
				$('a.video-btn.play-btn')[0].click();
				video.currentTime -= 10;
				$('a.video-btn.play-btn')[0].click();
			}
		}
		else if (button == 190 || button == 38) {			// Shift+> or up arrow
			video.playbackRate += 0.1;
		}
		else if (button == 188 || button == 40)	 {			// Shift+< or down arrow
			video.playbackRate -= 0.1;
		}
		else if (button == 39) {							// right arrow
			if (video.paused == true)
				video.currentTime += 10;
			else {
				$('a.video-btn.play-btn')[0].click();
				video.currentTime += 10;
				$('a.video-btn.play-btn')[0].click();
			}
		}
		else if (button == 70) {							// 'f'
			if (document.fullscreenElement) {
				document.webkitExitFullscreen();
				document.mozCancelFullScreen();
				document.msExitFullscreen();
				document.exitFullscreen();
			} else {
				var div = $('div.echoPlayer')[0];
				div.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
				div.mozRequestFullScreen();
				div.msRequestFullscreen();
				div.requestFullscreen(); // standard
			}
		}
		else if (button == 77) {							// 'm'
			$('a.video-btn.volume-btn')[0].click();
		}
		
		e.stopImmediatePropagation();
	});
})();

