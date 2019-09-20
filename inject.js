// this is the code which will be injected into a given page...

(function() {

	// Fix annoying scrolling issue
	document.querySelector("html").style.overflow = "hidden";

	$('a.disable-btn').hide();								// eliminates annoying button that disappears the video
	$(':focus').blur();
	$('div.content *').on('focus', function(e) {			// prevents any element from focusing, maintains consistency
		$(e.currentTarget).blur();
	});
	
	$('div.media-screen.focused.enabled').on('click', function (e) {	// this is a stubborn one
		$(e.currentTarget).removeClass('focus');
		e.stopImmediatePropagation();
	});
	
	var video = $('video');								// updates control bar on speed change
	$('a.video-btn.settings-btn').removeClass('settings-btn').addClass('speed').text(video[0].playbackRate.toFixed(1)+'x').css('font-size', '1.3em');
	video[0].onratechange = function () {
		$('a.video-btn.speed').text(video[0].playbackRate.toFixed(1)+'x');
	}
	
	$(document).on('click', function (e) {
		$(document.activeElement).removeClass('focus');
		$(document.activeElement).removeClass('focused');
		$(document.activeElement).blur();
	});
	
	
	$(document).on('keydown', function (e) {
		
		var button = e.which;
		if (button == 75 || button == 32) {					// 'k' or space(32)
			$('a.video-btn.play-btn')[0].click();
		}
		else if (button == 74 || button == 37) {			// 'j' or left arrow
			if (video[0].paused == true) {
				video[0].currentTime -= 10;
				for (var i = 1; i < video.length; i++) {
					video[i].currentTime = video[0].currentTime;
				}
				updateProgress(video[0]);
			} else {
				if (video.length > 1) {
					alert("An error in Echo360's internal code prevents smooth skipping while 2 videos are playing. Please pause videos and then skip, or click on the progress bar.");
					return;
				}
				$('a.video-btn.play-btn')[0].click();
				video[0].currentTime -= 10;
				for (var i = 1; i < video.length; i++) {
					video[i].currentTime = video[0].currentTime;
				}
				$('a.video-btn.play-btn')[0].click();
			}
			$('a.video-btn.seekBack-btn')[0].click();
		}
		else if (button == 190 || button == 38) {			// Shift+> or up arrow
			displayControls();
			video[0].playbackRate += 0.1;
			for (var i = 1; i < video.length; i++) {
				video[i].playbackRate = video[0].playbackRate;
			}
		}
		else if (button == 188 || button == 40)	 {			// Shift+< or down arrow
			displayControls();
			video[0].playbackRate -= 0.1;
			for (var i = 1; i < video.length; i++) {
				video[i].playbackRate = video[0].playbackRate;
			}
		}
		else if (button == 39) {							// right arrow
			if (video[0].paused == true) {
				video[0].currentTime += 10;
				for (var i = 1; i < video.length; i++) {
					video[i].currentTime = video[0].currentTime;
				}
				updateProgress(video[0]);
			} else {
				if (video.length > 1) {
					alert("An error in Echo360's internal code prevents smooth skipping while 2 videos are playing. Please pause videos and then skip, or click on the progress bar.");
					return;
				}
				$('a.video-btn.play-btn')[0].click();
				video[0].currentTime += 10;
				for (var i = 1; i < video.length; i++) {
					video[i].currentTime = video[0].currentTime;
				}
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
			displayControls();
			$('a.video-btn.volume-btn')[0].click();
		}
		
		e.stopImmediatePropagation();
	});
	
	var timer;
	function displayControls() {
		if (timer)
			clearTimeout(timer);
		
		$('div.stage.tile').addClass('active');
		timer = setTimeout(function () {
			$('div.stage.tile').removeClass('active');
			timer = null;
		}, 3000);
	}
	
	
	function updateProgress(video) {
		
		displayControls();
		$('div.progress').css('width', video.currentTime/video.duration*100+"%");
		
		var elapsed;
		if (video.currentTime >= 3600) {
			elapsed = parseInt(video.currentTime/3600)+":"+pad((video.currentTime-3600)/60)+":"+pad(video.currentTime%60);
		} else {
			elapsed = pad(video.currentTime/60)+":"+pad(video.currentTime%60);
		}
		$('span.currTime span').first().text(elapsed);
	}
	
	function pad(number) {
		number = parseInt(number);
		if (number < 10)
			return "0"+number;
		return number+"";
	}
})();

