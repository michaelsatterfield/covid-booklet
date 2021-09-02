window.addEventListener("DOMContentLoaded", event => 
{
	// Little dirty
	document.getElementsByClassName("scroll-dummy-overlay")[0].style.height = (window.innerHeight * 6) + "px";

	document.getElementsByClassName("header-top")[0].classList.remove("hidden");

	setTimeout (function () {

		document.getElementsByTagName("body")[0].classList.add("page-loaded");

	}, 1);

	class AnimationAction {

		constructor (_name, _container, _property, _scrollStart, _scrollStop, _propertyStart, _propertyStop, _addCompletedClass = false) {

			this.name = _name;
			this.container = _container;
			this.property = _property;
			this.scrollStart = (_scrollStart / 100) * window.innerHeight; // Dirty check for % and allow for px default. for now expect/require percentage without % sign at the end
			this.scrollStop = (_scrollStop / 100) * window.innerHeight; // Dirty check for % and allow for px default. for now expect/require percentage without % sign at the end
			this.propertyStart = _propertyStart;
			this.propertyStop = _propertyStop;
			this.addCompletedClass = _addCompletedClass;

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
				if (this.addCompletedClass)
					this.container.classList.remove("completed"); // completed styling is dirty.

				if (scrollPosition <= this.scrollStop)
				{
					this.animate(scrollPosition);
				}
				else
				{
					this.animate(this.scrollStop); // Failsafe in event of fast scroll

					if (this.addCompletedClass)
						this.container.classList.add("completed"); // completed styling is dirty.
				}
			}
			else
			{
				this.animate(this.scrollStart); // Failsafe in event of fast scroll

				if (this.addCompletedClass)
					this.container.classList.remove("completed"); // completed styling is dirty.
			}
		}

		animate (scrollPosition) {
			console.log ("-- Animate " + this.property + " " + this.name);

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
	new AnimationAction("section-1|opacity", document.getElementsByClassName("section-1")[0], "opacity", 5, 20, 1.0, 0.0, true);
	new AnimationAction("header-top|opacity", document.getElementsByClassName("header-top")[0], "opacity", 5, 20, 1.0, 0.0, true);
	new AnimationAction("header-left|opacity", document.getElementsByClassName("header-left")[0], "opacity", 20, 25, 0.0, 1.0);
	new AnimationAction("header-left|position", document.getElementsByClassName("header-left")[0], "position", 20, 25, [-100,0], [0,0]);

	new AnimationAction("section-2__text-1|opacity", document.getElementsByClassName("section-2__text-1")[0], "opacity", 35, 40, 0.0, 1.0);
	new AnimationAction("section-2__text-1|position", document.getElementsByClassName("section-2__text-1")[0], "position", 35, 50, [50,0], [0,0]);
		new AnimationAction("section-2__text-2|opacity", document.getElementsByClassName("section-2__text-2")[0], "opacity", 40, 50, 0.0, 1.0);
		new AnimationAction("section-2__text-2|position", document.getElementsByClassName("section-2__text-2")[0], "position", 40, 50, [50,0], [0,0]);
			new AnimationAction("section-2__text-3|opacity", document.getElementsByClassName("section-2__text-3")[0], "opacity", 40, 50, 0.0, 1.0);
			new AnimationAction("section-2__text-3|position", document.getElementsByClassName("section-2__text-3")[0], "position", 40, 50, [50,0], [0,0]);
				new AnimationAction("button-next-slide-section-2|opacity", document.getElementsByClassName("button-next-slide-section-2")[0], "opacity", 40, 50, 0.0, 1.0);
					new AnimationAction("section-2__text-4|opacity", document.getElementsByClassName("section-2__text-4")[0], "opacity", 45, 50, 0.0, 1.0);
			//new AnimationAction("section-2__text-4|position", document.getElementsByClassName("section-2__text-4")[0], "position", 35, 50, [50,0], [0,0]);

	new AnimationAction("section-2|opacity", document.getElementsByClassName("section-2")[0], "opacity", 75, 90, 1.0, 0.0, true);

	new AnimationAction("section-3__title|margin-left", document.getElementsByClassName("section-3__title")[0], "margin-left", 75, 250, 100, 0);
	new AnimationAction("section-4__title|margin-left", document.getElementsByClassName("section-4__title")[0], "margin-left", 75, 250, 100, 0);
	new AnimationAction("section-5__title|margin-left", document.getElementsByClassName("section-5__title")[0], "margin-left", 75, 250, 100, 0);

	// //new AnimationAction("section-3__titlecontainer|position", document.getElementsByClassName("section-3__titlecontainer")[0], "position", 65, 80, [50,0], [0,0]);
	new AnimationAction("section-3__title-1|opacity", document.getElementsByClassName("section-3__title-1")[0], "opacity", 110, 115, 1.0, 0.0);
	new AnimationAction("section-3__title-2|opacity", document.getElementsByClassName("section-3__title-2")[0], "opacity", 110, 115, 1.0, 0.0);
	new AnimationAction("section-3__subtitle|opacity", document.getElementsByClassName("section-3__subtitle")[0], "opacity", 110, 115, 1.0, 0.0);
	new AnimationAction("section-3__background|opacity", document.getElementsByClassName("section-3__background")[0], "opacity", 115, 120, 1.0, 0.0);
	new AnimationAction("section-3__icon|opacity", document.getElementsByClassName("section-3__icon")[0], "opacity", 115, 120, 1.0, 0.0);
	
	new AnimationAction("section-4__pretitle|margin-left", document.getElementsByClassName("section-4__pretitle")[0], "margin-left", 150, 180, 100, 0);
	new AnimationAction("section-4__pretitle|opacity", document.getElementsByClassName("section-4__pretitle")[0], "opacity", 150, 180, 1.0, 0.0);
	new AnimationAction("section-4__title-1|opacity", document.getElementsByClassName("section-4__title-1")[0], "opacity", 150, 180, 1.0, 0.0);
	new AnimationAction("section-3__title|opacity", document.getElementsByClassName("section-3__title")[0], "opacity", 150, 180, 1.0, 0.0);
	new AnimationAction("section-4__text|opacity", document.getElementsByClassName("section-4__text")[0], "opacity", 150, 180, 1.0, 0.0);

	new AnimationAction("section-3|opacity", document.getElementsByClassName("section-3")[0], "opacity", 150, 180, 1.0, 0.0, true);

	new AnimationAction("section-4__background|opacity", document.getElementsByClassName("section-4__background")[0], "opacity", 180, 250, 1.0, 0.0);
	new AnimationAction("section-4|opacity", document.getElementsByClassName("section-4")[0], "opacity", 180, 250, 1.0, 0.0, true);

	new AnimationAction("section-5__pretitle|margin-left", document.getElementsByClassName("section-5__pretitle")[0], "margin-left", 180, 250, 100, 0);
	new AnimationAction("button-prev-slide-section-5|opacity", document.getElementsByClassName("button-prev-slide-section-5")[0], "opacity", 250, 275, 0.0, 1.0);
	new AnimationAction("button-next-slide-section-5|opacity", document.getElementsByClassName("button-next-slide-section-5")[0], "opacity", 250, 275, 0.0, 1.0);

	// new AnimationAction("section-4__pretitle|opacity", document.getElementsByClassName("section-4__pretitle")[0], "opacity", 120, 130, 0.0, 1.0);
	// new AnimationAction("section-4__title|opacity", document.getElementsByClassName("section-4__title")[0], "opacity", 120, 130, 0.0, 1.0);
	// new AnimationAction("section-4__text|opacity", document.getElementsByClassName("section-4__text")[0], "opacity", 120, 130, 0.0, 1.0);

	// new AnimationAction("section-3|opacity", document.getElementsByClassName("section-3")[0], "opacity", 150, 180, 1.0, 0.0, true);

	// new AnimationAction("section-4__pretitle|opacity", document.getElementsByClassName("section-4__pretitle")[0], "opacity", 150, 180, 1.0, 0.0);
	// new AnimationAction("section-4__title-1|opacity", document.getElementsByClassName("section-4__title-1")[0], "opacity", 120, 180, 1.0, 0.0);
	// new AnimationAction("section-3__title|opacity", document.getElementsByClassName("section-3__title")[0], "opacity", 150, 180, 1.0, 0.0);
	// new AnimationAction("section-4__text|opacity", document.getElementsByClassName("section-4__text")[0], "opacity", 150, 180, 1.0, 0.0);

	//new AnimationAction("section-3|opacity", document.getElementsByClassName("section-3")[0], "opacity", 120, 130, 1.0, 0.0, true);
	// new AnimationAction("section-4|opacity", document.getElementsByClassName("section-4")[0], "opacity", 120, 130, 1.0, 0.0, true);

	new AnimationAction("section-5|opacity", document.getElementsByClassName("section-5")[0], "opacity", 270, 300, 1.0, 0.0);

	new AnimationAction("section-6|opacity", document.getElementsByClassName("section-6")[0], "opacity", 320, 340, 1.0, 0.0);

	new AnimationAction("section-7__text|opacity", document.getElementsByClassName("section-7__text")[0], "opacity", 360, 380, 0.0, 1.0);
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

	document.getElementsByClassName("section-3__icon")[0].addEventListener('click', function() {
		// Dirty require completed class
		document.getElementsByClassName("section-3")[0].classList.add("cheetah-clicked");
		document.getElementsByClassName("section-31")[0].classList.add("cheetah-clicked");
		console.log ("click");
	});

	document.getElementsByClassName("button-prev-slide-section-5")[0].addEventListener('click', function() {
		// Dirty require completed class
		// document.getElementsByClassName("section-2")[0].classList.add("ceo-clicked");
		document.getElementsByClassName("section-51")[0].classList.add("merced-clicked");
		console.log ("click");
	});

	document.getElementsByClassName("button-back-slide-section-51")[0].addEventListener('click', function() {
		// Dirty require completed class
		// document.getElementsByClassName("section-2")[0].classList.add("ceo-clicked");
		document.getElementsByClassName("section-51")[0].classList.remove("merced-clicked");
		console.log ("click");
	});

	document.getElementsByClassName("button-next-slide-section-5")[0].addEventListener('click', function() {
		// Dirty require completed class
		// document.getElementsByClassName("section-2")[0].classList.add("ceo-clicked");
		document.getElementsByClassName("section-52")[0].classList.add("bexar-clicked");
		console.log ("click");
	});

	document.getElementsByClassName("button-back-slide-section-52")[0].addEventListener('click', function() {
		// Dirty require completed class
		// document.getElementsByClassName("section-2")[0].classList.add("ceo-clicked");
		document.getElementsByClassName("section-52")[0].classList.remove("bexar-clicked");
		console.log ("click");
	});

	document.getElementsByClassName("nav-main__link")[0].addEventListener('click', function(e) {
		alert("scroll to section top offset");
		// Dirty require completed class
		console.log ("click");
		console.log (window.pageYOffset);
		//document.getElementsByClassName("scroll-dummy-overlay")[0].scroll(100,100);
		//window.scroll(0,1000);
		var scrollToPosition = parseInt(e.srcElement.getAttribute("data-section")) + window.innerHeight;
		scrollTo(null, scrollToPosition, 500);
		console.log (window.pageYOffset);
		e.preventDefault();
		// console.log (document.getElementsByClassName("scroll-dummy-overlay")[0].scrollTop);
		// document.getElementsByClassName("scroll-dummy-overlay")[0].scrollTop = 500;
		// console.log (document.getElementsByClassName("scroll-dummy-overlay")[0].scrollTop);
		//scrollTo(document.getElementsByClassName("scroll-dummy-overlay")[0], 400, 2000);
	});

});

var quotesContainer = document.getElementsByClassName("section-21__quoter")[0];

var quoteIndex = 1;

var quotesDictionary = { 
    1: { "p": '“I have volunteered in the nonprofit space for more than three decades, and I have never seen such an efficient operation.”', 
    	 "span": "—Mary Rose Brown, Executive Vice President and Chief Administrative Officer at NuStar Energy, who served on the COVID-19 Response Fund advisory committee." },
    
    2: { "p": '“There is very little that the…Foundation does that doesn’t influence most of our lives…and certainly mine.”', 
    	 "span": "—Aaronetta Pierce" },

   	3: { "p": '“You don’t have to be a millionaire to make an investment in a fund. Instead, it’s the kind of person who believes in the community and be able to want to assist others.”', 
    	 "span": "—Janie Barrera" }
};

var quoteParagraph = document.getElementsByClassName("section-21__quoter")[0].getElementsByTagName("p")[0];

var quoteSpan = document.getElementsByClassName("section-21__quoter")[0].getElementsByTagName("span")[0];


// Main cycle duration (not the entire duration though. total duration: cycle duration + transition duration
function cycleQuotesRecursively() {
	setTimeout(function() {
		quoteIndex++;

		if (quoteIndex > Object.keys(quotesDictionary).length)
			quoteIndex = 1;

		quotesContainer.style.opacity = 0.0;

		// Transition duration
		setTimeout(function() {
			quoteParagraph.innerHTML = quotesDictionary[quoteIndex].p;

			quoteSpan.innerHTML = quotesDictionary[quoteIndex].span;

			quotesContainer.style.opacity = 1.0;

			cycleQuotesRecursively();

		}, 900);

    }, 4100);
}

cycleQuotesRecursively();

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


// End of file