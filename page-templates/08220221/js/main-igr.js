window.addEventListener("DOMContentLoaded", event => 
{
	// Little dirty
	document.getElementsByClassName("scroll-dummy-overlay")[0].style.height = (window.innerHeight * 20) + "px";
	console.log(window.innerHeight * 6);
	document.getElementsByClassName("header-top")[0].classList.remove("hidden");

	setTimeout (function () {

		document.getElementsByTagName("body")[0].classList.add("page-loaded");

	}, 1000);

	class AnimationAction {

		constructor (_name, _container, _property, _scrollStart, _scrollStop, _propertyStart, _propertyStop) {

			this.name = _name;
			this.container = _container;
			this.property = _property;
			this.scrollStart = (_scrollStart / 100) * window.innerHeight; // Dirty check for % and allow for px default. for now expect/require percentage without % sign at the end
			this.scrollStop = (_scrollStop / 100) * window.innerHeight; // Dirty check for % and allow for px default. for now expect/require percentage without % sign at the end
			this.propertyStart = _propertyStart;
			this.propertyStop = _propertyStop;

			console.log ("Scroll start " + this.scrollStart);

			AnimationAction.createdElements[AnimationAction.createdElements.length] = this;

			// Dirty 
			// Init start and remind position actions of lack of position property
			// take care with this as always
		}

		update (scrollPosition)
		{
			// Dirty
			if (scrollPosition >= this.scrollStart)
			{
				this.container.classList.remove("completed"); // completed styling is dirty.

				if (scrollPosition <= this.scrollStop)
				{
					this.animate(scrollPosition);
				}
				else
				{
					this.animate(this.scrollStop); // Failsafe in event of fast scroll
					this.container.classList.add("completed"); // completed styling is dirty.
				}
			}
			else
			{
				this.animate(this.scrollStart); // Failsafe in event of fast scroll
				this.container.classList.remove("completed"); // completed styling is dirty.
			}
		}

		animate (scrollPosition) {
			//console.log ("-- Animate " + this.property + " " + this.name);

			switch (this.property) {
				case "opacity":

					// Dirty
					if (this.propertyStart > this.propertyStop)
						// this.propertyStart probably 1.0
							this.container.style.opacity = this.propertyStart - (this.propertyStart * ((scrollPosition - this.scrollStart) / (this.scrollStop - this.scrollStart)));
					else
					{
						// this.propertyStop probably 1.0
							this.container.style.opacity = (this.propertyStop * ((scrollPosition - this.scrollStart) / (this.scrollStop - this.scrollStart)));
					}


					break;

				case "position":

					// Dirty
					if (this.propertyStart[0] != null)
						this.container.style.left = this.propertyStart[0] + ((this.propertyStop[0] - this.propertyStart[0]) * ((scrollPosition - this.scrollStart) / (this.scrollStop - this.scrollStart))) + "px";
					
					if (this.propertyStart[1] != null)
						this.container.style.top  = this.propertyStart[1] + ((this.propertyStop[1] - this.propertyStart[1]) * ((scrollPosition - this.scrollStart) / (this.scrollStop - this.scrollStart))) + "px";

					// add completed class to allow for css properties based on that condition (specifically pointer events none)
					// include fail safe for completed animation (set prop to stop value when animation is complete just incase there is a skipped pixel or two due to fast scrolling)

					break;

				case "margin-left":

					this.container.style.marginLeft = this.propertyStart + ((this.propertyStop - this.propertyStart) * ((scrollPosition - this.scrollStart) / (this.scrollStop - this.scrollStart))) + "px";

					break;

				case "background":

					//Dirty
					//this.container.style.background = "none";

					break;
			}
		}

	}

	AnimationAction.createdElements = [];

	// Dirty 
	// wait for page load before animating on scroll
	//constructor (_name, _container, _property, _scrollStart, _scrollStop, _propertyStart, _propertyStop) {
	new AnimationAction("header-top|opacity", document.getElementsByClassName("header-top")[0], "opacity", 5, 20, 1.0, 0.0);
	new AnimationAction("header-left|opacity", document.getElementsByClassName("header-left")[0], "opacity", 150, 400, 0.0, 1.0);
	new AnimationAction("header-left|position", document.getElementsByClassName("header-left")[0], "position", 100, 300, [-100,0], [0,0]);

	new AnimationAction("section-2__text-1|opacity", document.getElementsByClassName("section-2__text-1")[0], "opacity", 200, 300, 0.0, 1.0);
	new AnimationAction("section-2__text-1|position", document.getElementsByClassName("section-2__text-1")[0], "position", 200, 300, [100,0], [0,0]);
		new AnimationAction("section-2__text-2|opacity", document.getElementsByClassName("section-2__text-2")[0], "opacity", 200, 300, 0.0, 1.0);
		new AnimationAction("section-2__text-2|position", document.getElementsByClassName("section-2__text-2")[0], "position", 175, 200, [100,0], [0,0]);
			new AnimationAction("section-2__text-3|opacity", document.getElementsByClassName("section-2__text-3")[0], "opacity", 200, 300, 0.0, 1.0);
			new AnimationAction("section-2__text-3|position", document.getElementsByClassName("section-2__text-3")[0], "position", 300, 400, [100,0], [0,0]);
				new AnimationAction("section-2__text-4|opacity", document.getElementsByClassName("section-2__text-4")[0], "opacity", 400, 500, 0.0, 1.0);
				new AnimationAction("section-2__text-4|position", document.getElementsByClassName("section-2__text-4")[0], "position", 500, 600, [100,0], [0,0]);
					new AnimationAction("button-next-slide-section-2|opacity", document.getElementsByClassName("button-next-slide-section-2")[0], "opacity", 500, 600, 0.0, 1.0);

	//new AnimationAction("section-2|opacity", document.getElementsByClassName("section-2")[0], "opacity", 1000, 1500, 1.0, 0.0);

	new AnimationAction("section-3__title|margin-left", document.getElementsByClassName("section-3__title")[0], "margin-left", 65, 200, 100, 0);
	new AnimationAction("section-4__title|margin-left", document.getElementsByClassName("section-4__title")[0], "margin-left", 65, 200, 100, 0);
	new AnimationAction("section-5__title|margin-left", document.getElementsByClassName("section-5__title")[0], "margin-left", 65, 200, 100, 0);

	new AnimationAction("section-3__background|opacity", document.getElementsByClassName("section-3__background")[0], "opacity", 65, 80, 1.0, 0.0);
	//new AnimationAction("section-3__titlecontainer|position", document.getElementsByClassName("section-3__titlecontainer")[0], "position", 65, 80, [50,0], [0,0]);
	new AnimationAction("section-3__title-1|opacity", document.getElementsByClassName("section-3__title-1")[0], "opacity", 65, 80, 1.0, 0.0);
	new AnimationAction("section-3__title-2|opacity", document.getElementsByClassName("section-3__title-2")[0], "opacity", 65, 80, 1.0, 0.0);
	new AnimationAction("section-3__subtitle|opacity", document.getElementsByClassName("section-3__subtitle")[0], "opacity", 65, 80, 1.0, 0.0);

	new AnimationAction("section-4__pretitle|opacity", document.getElementsByClassName("section-4__pretitle")[0], "opacity", 85, 100, 0.0, 1.0);
	new AnimationAction("section-4__title|opacity", document.getElementsByClassName("section-4__title")[0], "opacity", 85, 100, 0.0, 1.0);
	new AnimationAction("section-4__text|opacity", document.getElementsByClassName("section-4__text")[0], "opacity", 85, 100, 0.0, 1.0);
    //constructor (_name, _container, _property, _scrollStart, _scrollStop, _propertyStart, _propertyStop) {
	// Dirty
	new AnimationAction("section-4__pretitle|opacity", document.getElementsByClassName("section-4__pretitle")[0], "opacity", 100, 105, 1.0, 0.0);
	new AnimationAction("section-3__title|opacity", document.getElementsByClassName("section-3__title")[0], "opacity", 100, 105, 1.0, 0.0);
	new AnimationAction("section-4__title-1|opacity", document.getElementsByClassName("section-4__title-1")[0], "opacity", 100, 105, 1.0, 0.0);
	new AnimationAction("section-4__text|opacity", document.getElementsByClassName("section-4__text")[0], "opacity", 100, 105, 1.0, 0.0);
	
	new AnimationAction("section-1|opacity", document.getElementsByClassName("section-1")[0], "opacity", 50, 200, 1.0, 0.0);
	new AnimationAction("section-2|opacity", document.getElementsByClassName("section-2")[0], "opacity", 1000, 1500, 1.0, 0.0);
	new AnimationAction("section-3|opacity", document.getElementsByClassName("section-3")[0], "opacity", 2400, 3100, 1.0, 0.0);
	new AnimationAction("section-4|opacity", document.getElementsByClassName("section-4")[0], "opacity", 2400, 3100, 1.0, 0.0);

	new AnimationAction("section-5|opacity", document.getElementsByClassName("section-5")[0], "opacity", 3700, 4400, 1.0, 0.0);

	new AnimationAction("section-6|opacity", document.getElementsByClassName("section-6")[0], "opacity", 5500, 6000, 1.0, 0.0);
/*

	new AnimationAction("header-left|opacity", document.getElementsByClassName("header-left")[0], "opacity", 20, 40, 0.0, 1.0);
	new AnimationAction("header-left|position", document.getElementsByClassName("header-left")[0], "position", 20, 40, [-100,0], [0,0]);

	new AnimationAction("section-2|opacity", document.getElementsByClassName("section-2")[0], "opacity", 60, 80, 1.0, 0.0);

	// Dirty rename __background ?
	new AnimationAction("section-3__background|opacity", document.getElementsByClassName("section-3__background")[0], "opacity", 100, 120, 1.0, 0.0);

	//new AnimationAction("section-3|opacity", document.getElementsByClassName("section-3")[0], "opacity", 100, 120, 1.0, 0.0);

	new AnimationAction("section-4|opacity", document.getElementsByClassName("section-4")[0], "opacity", 140, 160, 1.0, 0.0);

	new AnimationAction("section-5|opacity", document.getElementsByClassName("section-5")[0], "opacity", 180, 200, 1.0, 0.0);

	new AnimationAction("section-6|opacity", document.getElementsByClassName("section-6")[0], "opacity", 220, 240, 1.0, 0.0);

*/

	// new AnimationAction(document.getElementsByClassName("header-left"), ["opacity"]);

	//var scroll_dummy_overlay = document.getElementsByClassName("scroll-dummy-overlay")[0];

	window.addEventListener('scroll', function(e) {

		console.log (window.pageYOffset);

		for (var i = 0; i < AnimationAction.createdElements.length; i++) {

			AnimationAction.createdElements[i].update(window.pageYOffset);

		}

	});

	document.getElementsByClassName("button-next-slide-section-2")[0].addEventListener('click', function() {
		// Dirty require completed class
		document.getElementsByClassName("section-2")[0].classList.add("ceo-clicked");
		document.getElementsByClassName("section-21")[0].classList.add("ceo-clicked");
		console.log ("click");
	});

	document.getElementsByClassName("button-prev-red-section-21")[0].addEventListener('click', function() {
		// Dirty require completed class
		document.getElementsByClassName("section-2")[0].classList.remove("ceo-clicked");
		document.getElementsByClassName("section-21")[0].classList.remove("ceo-clicked");
		console.log ("click");
	});

	document.getElementsByClassName("nav-main__link")[0].addEventListener('click', function(e) {
		alert("scroll to section top offset");
		// Dirty require completed class
		console.log ("click");
		console.log (window.pageYOffset);
		//document.getElementsByClassName("scroll-dummy-overlay")[0].scroll(100,100);
		//window.scroll(0,1000);
		scrollTo(null, 500, 2000);
		console.log (window.pageYOffset);
		e.preventDefault();
		// console.log (document.getElementsByClassName("scroll-dummy-overlay")[0].scrollTop);
		// document.getElementsByClassName("scroll-dummy-overlay")[0].scrollTop = 500;
		// console.log (document.getElementsByClassName("scroll-dummy-overlay")[0].scrollTop);
		//scrollTo(document.getElementsByClassName("scroll-dummy-overlay")[0], 400, 2000);
	});

});
// End of file


// jQuery scrollTo in vanilla JS
// https://gist.github.com/andjosh/6764939
function scrollTo(element, to, duration) {
    var start = window.pageYOffset,
        change = to - start,
        currentTime = 0,
        increment = 20;
        
    var animateScroll = function(){        
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        window.scroll(0,val); // Edited for use with scroll-dummy-overlay
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};