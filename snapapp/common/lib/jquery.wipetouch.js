// jQuery WipeTouch 1.1.0
//
// Developed and maintained by Devv: http://devv.com
// This plugin is based on TouchWipe by Andreas Waltl: http://www.netcu.de
//
// USAGE
// $(selector).wipetouch(config);
//
// The wipe events should expect the result object with the following properties:
// speed - the wipe speed from 1 to 5
// x - how many pixels moved on the horizontal axis
// y - how many pixels moved on the vertical axis
//
// EXAMPLE
//		$(document).wipetouch({
//			allowDiagonal: true,
//			wipeLeft: function(result) { alert("Left on speed " + result.speed) },
//			wipeTopLeft: function(result) { alert("Top left on speed " + result.speed) },
//			wipeBottomLeft: function(result) { alert("Bottom left on speed " + result.speed) }
//		});
//
//
// More details at http://wipetouch.codeplex.com/
//
// CHANGE LOG
//
// 1.2.0 (RC)
// - New: wipeMove event, triggered while moving the mouse/finger.
// - New: works with Windows Phone 7+ (emulate touch using mouse events).
// - Bug fix: sometimes vertical wipe events would not trigger correctly.
// - Bug fix: improved tapToClick handler.
//
// 1.1.0
// - New: tapToClick, if true will identify taps and and trigger a click on the touched element. Default is false.
// - Changed: events wipeBottom*** and wipeTop*** renamed to wipeDown*** and wipeUp***.
// - Changed: better touch speed calculation (was always too fast before).
// - Changed: speed will be an integer now (instead of float).
// - Changed: better wipe detection (if Y movement is more than X, do a vertical wipe instead of horizontal).
// - Bug fix: added preventDefault to touchStart and touchEnd internal events (this was missing).
// - Other general tweaks to the code.
//
// If you want to compress this code, we recommend Jasc: http://jasc.codeplex.com

(function($)
{
	$.fn.wipetouch = function(settings)
	{
		// ------------------------------------------------------------------------
		// PLUGIN SETTINGS
		// ------------------------------------------------------------------------

		var config = {

			// Variables and options
			moveX:				40,		// minimum amount of horizontal pixels to trigger a wipe event
			moveY:				40,		// minimum amount of vertical pixels to trigger a wipe event
			tapToClick:			false,	// if user taps the screen it will fire a click event on the touched element
			preventDefault:		true,	// if true, prevents default events (click for example)
			allowDiagonal:		false,	// if false, will trigger horizontal and vertical movements so wipeUpLeft, wipeDownLeft, wipeUpRight, wipeDownRight are ignored

			// Wipe events
			wipeLeft:			false,	// called on wipe left gesture
			wipeRight:			false,	// called on wipe right gesture
			wipeUp:				false,	// called on wipe up gesture
			wipeDown:			false,	// called on wipe down gesture
			wipeUpLeft:			false,	// called on wipe top and left gesture
			wipeDownLeft:		false,	// called on wipe bottom and left gesture
			wipeUpRight:		false,	// called on wipe top and right gesture
			wipeDownRight:		false,	// called on wipe bottom and right gesture
			wipeMove:			false,	// triggered whenever touchMove acts

			// DEPRECATED EVENTS
			wipeTopLeft:		false,	// USE WIPEUPLEFT
			wipeBottomLeft:		false,	// USE WIPEDOWNLEFT
			wipeTopRight:		false,	// USE WIPEUPRIGHT
			wipeBottomRight:	false	// USE WIPEDOWNRIGHT
		};

		if (settings)
		{
			$.extend(config, settings);
		}

		this.each(function()
		{
			// ------------------------------------------------------------------------
			// INTERNAL VARIABLES
			// ------------------------------------------------------------------------
			var startX; // where touch has started, left
			var startY; // where touch has started, top
			var startDate = false; // used to calculate timing and aprox. acceleration
			var curX; // keeps touch X position while moving on the screen
			var curY; // keeps touch Y position while moving on the screen
			var isMoving = false; // is user touching and moving?
			var touchedElement = false; // element which user has touched

			// these are for Windows Phone compatibility!
			var useMouseEvents = false; // force using the mouse events to simulate touch
			var clickEvent = false; // holds the click event of the target, when used hasn't clicked

			// ------------------------------------------------------------------------
			// TOUCH EVENTS
			// ------------------------------------------------------------------------

			// Called when user touches the screen
			function onTouchStart(e)
			{
				var start = useMouseEvents || (e.touches && e.touches.length > 0);

				if (!isMoving && start)
				{
					if (config.preventDefault)
					{
						e.preventDefault();
					}

					// temporary fix for deprecated events, will be removed on next version!
					if (config.allowDiagonal)
					{
						if (!config.wipeDownLeft) config.wipeDownLeft = config.wipeBottomLeft;
						if (!config.wipeDownRight) config.wipeDownRight = config.wipeBottomRight;
						if (!config.wipeUpLeft) config.wipeUpLeft = config.wipeTopLeft;
						if (!config.wipeUpRight) config.wipeUpRight = config.wipeTopRight;
					}

					if (useMouseEvents)
					{
						startX = e.pageX;
						startY = e.pageY;

						$(this).bind("mousemove", onTouchMove);
						$(this).bind("mouseout", onTouchEnd);
					}
					else
					{
						startX = e.touches[0].pageX;
						startY = e.touches[0].pageY;

						$(this).bind("touchmove", onTouchMove);
					}

					startDate = new Date().getTime();
					curX = startX;
					curY = startY;
					isMoving = true;

					touchedElement = $(e.target);
				}
			}

			// Called when user untouches the screen
			function onTouchEnd(e)
			{
				if (config.preventDefault)
				{
					e.preventDefault();
				}

				if (useMouseEvents)
				{
					$(this).unbind('mousemove', onTouchMove);
					$(this).unbind('mouseout', onTouchEnd);
				}
				else
				{
					$(this).unbind('touchmove', onTouchMove);
				}

				if (isMoving)
				{
					touchCalculate(e);
				}
				else
				{
					resetTouch();
				}
			}

			// Called when user is touching and moving on the screen
			function onTouchMove(e)
			{
				if (config.preventDefault)
				{
					e.preventDefault();
				}

				if (isMoving)
				{
					if (useMouseEvents)
					{
						curX = e.pageX;
						curY = e.pageY;
					}
					else
					{
						curX = e.touches[0].pageX;
						curY = e.touches[0].pageY;
					}

					// if there's a wipeMove event, call it passing
					// current X and Y position (curX and curY)
					if (config.wipeMove)
					{
						triggerEvent(config.wipeMove, {
							curX: curX,
							curY: curY
						});
					}
				}
			}

			// ------------------------------------------------------------------------
			// CALCULATE TOUCH AND TRIGGER
			// ------------------------------------------------------------------------

			function touchCalculate(e)
			{
				var endDate = new Date().getTime();	// current date to calculate timing
				var ms = startDate - endDate; // duration of touch in milliseconds

				var x = curX;			// current left position
				var y = curY;			// current top position
				var dx = x - startX;	// diff of current left to starting left
				var dy = y - startY;	// diff of current top to starting top
				var ax = Math.abs(dx);	// amount of horizontal movement
				var ay = Math.abs(dy);	// amount of vertical movement

				// moved less than 15 pixels and touch duration less than 100ms,
				// if tapToClick is true then triggers a click and stop processing
				if (ax < 15 && ay < 15 && ms < 100)
				{
					clickEvent = false;

					if (config.preventDefault)
					{
						resetTouch();

						touchedElement.trigger("click");
						return;
					}
				}
				else if (useMouseEvents)
				{
					var evts = touchedElement.data("events");

					if (evts)
					{
						// save click event to the temp clickEvent variable
						var clicks = evts.click;

						if (clicks && clicks.length > 0)
						{
							$.each(clicks, function(i, f)
							{
								clickEvent = f;
								return;
							});

							touchedElement.unbind("click");
						}
					}
				}

				var toright = dx > 0;	// if true X movement is to the right, if false is to the left
				var tobottom = dy > 0;	// if true Y movement is to the bottom, if false is to the top

				// calculate speed from 1 to 5, being 1 slower and 5 faster
				var s = ((ax + ay) * 60) / ((ms) / 6 * (ms));

				if (s < 1) s = 1;
				if (s > 5) s = 5;

				var result = {
					speed: parseInt(s),
					x: ax,
					y: ay
				};

				if (ax >= config.moveX)
				{
					// check if it's allowed and trigger diagonal wipe events
					if (config.allowDiagonal && ay >= config.moveY)
					{
						if (toright && tobottom)
						{
							triggerEvent(config.wipeDownRight, result);
						}
						else if (toright && !tobottom)
						{
							triggerEvent(config.wipeUpRight, result);
						}
						else if (!toright && tobottom)
						{
							triggerEvent(config.wipeDownLeft, result);
						}
						else
						{
							triggerEvent(config.wipeUpLeft, result);
						}
					}
					// otherwise trigger horizontal events if X > Y
					else if (ax >= ay)
					{
						if (toright)
						{
							triggerEvent(config.wipeRight, result);
						}
						else
						{
							triggerEvent(config.wipeLeft, result);
						}
					}
				}
				// if Y > X and no diagonal, trigger vertical events
				else if (ay >= config.moveY && ay > ax)
				{
					if (tobottom)
					{
						triggerEvent(config.wipeDown, result);
					}
					else
					{
						triggerEvent(config.wipeUp, result);
					}
				}

				resetTouch();
			}

			// Resets the cached variables
			function resetTouch()
			{
				startX = false;
				startY = false;
				startDate = false;
				isMoving = false;

				if (clickEvent)
				{
					window.setTimeout(function()
					{
						touchedElement.bind("click", clickEvent);
						clickEvent = false;
					}, 100);
				}
			}

			// Triggers a wipe event passing a result object with
			// speed from 1 to 5, and x / y movement amount in pixels
			function triggerEvent(wipeEvent, result)
			{
				if (wipeEvent)
				{
					wipeEvent(result);
				}
			}

			// ------------------------------------------------------------------------
			// ADD TOUCHSTART AND TOUCHEND EVENT LISTENERS
			// ------------------------------------------------------------------------

			if ('ontouchstart' in document.documentElement)
			{
				$(this).bind('touchstart', onTouchStart);
				$(this).bind('touchend', onTouchEnd);
			}
			else if (navigator.userAgent.toLowerCase().indexOf("windows phone"))
			{
				useMouseEvents = true;

				$(this).bind('mousedown', onTouchStart);
				$(this).bind('mouseup', onTouchEnd);
			}
		});

		return this;
	};
})(jQuery);