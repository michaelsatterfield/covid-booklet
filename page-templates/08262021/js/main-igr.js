window.addEventListener("DOMContentLoaded", event => 
{
	// Little dirty
	document.getElementsByClassName("scroll-dummy-overlay")[0].style.height = (window.innerHeight * 99) + "px";

	document.getElementsByClassName("header-top")[0].classList.remove("hidden");

	setTimeout (function () {

		document.getElementsByTagName("body")[0].classList.add("page-loaded");

	}, 1);

	// Revised animation structure
	// class ElementAnimation {
	// 	constructor(_identifier, _property, _scrollStart, _scrollStop, _propertyStart, _propertyStop, _updateCallback = undefined) {
	// 		// Future update to accept hashed id attribute element identifiers
	// 		// currently accepts only class
	// 		this.identifier = _identifier;
	// 		this.container = document.getElementsByClassName(this.identifier)[0];
	// 		this.property = _property;
	// 		this.scrollStart = _scrollStart;
	// 		this.scrollStop = _scrollStop;
	// 		this.propertyStart = _propertyStart;
	// 		this.propertyStop = _propertyStop;
	// 		this.updateCallback = _updateCallback;

	// 		this.animationPercentage = undefined; // For use in animate()

	// 		if (ElementAnimation.createdAnimations[this.identifier] == undefined)
	// 			ElementAnimation.createdAnimations[this.identifier] = {};
			
	// 		if (ElementAnimation.createdAnimations[this.identifier][this.property] == undefined)
	// 			ElementAnimation.createdAnimations[this.identifier][this.property] = [];

	// 		ElementAnimation.createdAnimations[this.identifier][this.property].push(this);
	// 	}

	// 	update (scrollPosition) {
	// 		if (>= stop)
	// 			addCompletedClass
	// 		else
	// 			removeCompletedClass
	// 				if (>= start)
	// 					addActive
	// 						else
	// 							removeActive

	// 		animate();
	// 	}

	// 	animate (scrollPosition) {
	// 		this.animationPercentage = (scrollPosition - this.scrollStart) / (this.scrollStop - this.scrollStart);

	// 		switch (this.property) {
	// 			case "opacity":

	// 				this.container.style.opacity = this.propertyStart + ((this.propertyStop - this.propertyStart) * this.animationPercentage);

	// 				break;

	// 			case "margin-left":

	// 				this.container.style.marginLeft = this.propertyStart + ((this.propertyStop - this.propertyStart) * this.animationPercentage) + "px";

	// 				break;
	// 		}
	// 	}
	// }

	// ElementAnimation.createdAnimations = {};

	// /*
	// {
	// 	"element-identifier-1": {
	// 		"property-1": [ElementAnimation(), ElementAnimation()],
	// 		"property-2": [ElementAnimation(), ElementAnimation()]
	// 	},
	// 	"element-identifier-2": {
	// 		...
	// 	}
	// }
	// */

	// new ElementAnimation("test-object", "opacity", 0, 500, 0.0, 1.0);
	// new ElementAnimation("test-object", "opacity", 1000, 1500, 1.0, 0.0);
	// new ElementAnimation("test-object", "opacity", 2000, 2500, 0.0, 1.0);
	// new ElementAnimation("test-object", "margin-left", 0, 500, 0.0, 1.0);
	// new ElementAnimation("test-object", "margin-left", 1000, 1500, 0.0, 1.0);
	// new ElementAnimation("test-object-1", "opacity", 0, 500, 0.0, 1.0);
	// new ElementAnimation("test-object-1", "opacity", 1000, 1500, 1.0, 0.0);
	// new ElementAnimation("test-object-1", "margin-left", 0, 500, 0.0, 1.0);
	// new ElementAnimation("test-object-1", "margin-left", 1000, 1500, 0.0, 1.0);

	// console.log(ElementAnimation.createdAnimations);

	// var scrollPosition = 0; // 250, 500, 750, 1000, 1250, 1500

	// var elementPropertyCount = undefined, elementPropertyIndex = undefined, elementAnimationObject = undefined;

	// for (var elementIdentifier in ElementAnimation.createdAnimations) {
 //        if (ElementAnimation.createdAnimations.hasOwnProperty(elementIdentifier)) {
 //            for (var property in ElementAnimation.createdAnimations[elementIdentifier]) {
 //                if (ElementAnimation.createdAnimations[elementIdentifier].hasOwnProperty(property)) 
 //                {
 //                	elementPropertyCount = ElementAnimation.createdAnimations[elementIdentifier][property].length;

 //                	for (elementPropertyIndex = 0; elementPropertyIndex < elementPropertyCount; elementPropertyIndex++) {
 //                		elementAnimationObject = ElementAnimation.createdAnimations[elementIdentifier][property][elementPropertyIndex];

 //                		// if scrollPosition > animationScrollStop 
 //                			// set active

 //                		// else if scrollPosition >= animationScrollStart
 //                			// set active

 //                		// last completed animation
 //                		// or 
 //                		// active animation
 //                		// or 
 //                		// first animation

 //                		if (scrollPosition >= elementAnimationObject.scrollStart && scrollPosition <= elementAnimationObject.scrollStop) {
 //                			// Current active element property animation
 //                		}
 //                		else
 //                			// if less than 

 //                    	ElementAnimation.createdAnimations[elementIdentifier][property][elementPropertyIndex].update();
 //                    }

 //                    // if no active set active to index 0

 //                    // active.update();
 //                }
 //            }
 //        }
 //    }

	class AnimationAction {

		constructor (_name, _container, _property, _scrollStart, _scrollStop, _propertyStart, _propertyStop, _addCompletedClass = false, _animationUpdateFunc = false) {

			this.name = _name;
			this.container = _container;
			this.property = _property;
			this.scrollStart = (_scrollStart / 100) * window.innerHeight; // Dirty check for % and allow for px default. for now expect/require percentage without % sign at the end
			this.scrollStop = (_scrollStop / 100) * window.innerHeight; // Dirty check for % and allow for px default. for now expect/require percentage without % sign at the end
			this.propertyStart = _propertyStart;
			this.propertyStop = _propertyStop;
			this.addCompletedClass = _addCompletedClass;
			this.animationUpdateFunc = _animationUpdateFunc;

			//console.log ("Scroll start " + this.scrollStart);

			AnimationAction.createdElements[AnimationAction.createdElements.length] = this;

			// Dirty 
			// Init start and remind position actions of lack of position property
			// take care with this as always
			// name will automatically add property in constrctor using _property>this.property
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
					this.container.classList.add("active");
					this.animate(scrollPosition);

					// 
					if (this.animationUpdateFunc != false)
					{
						this.animationUpdateFunc(scrollPosition, this.scrollStart, this.scrollStop); //, propertyStart, propertyStop
					}
				}
				else
				{
					this.animate(this.scrollStop); // Failsafe in event of fast scroll
					this.container.classList.remove("active");

					if (this.addCompletedClass)
						this.container.classList.add("completed"); // completed styling is dirty.
				}
			}
			else
			{
				/* Dirty */
				//console.log ("if scroll position has exceeded scrollStart then fail safe back to scrollStart. may require more than this. just first thought");
				this.animate(this.scrollStart); // Failsafe in event of fast scroll
				this.container.classList.remove("active");

				if (this.addCompletedClass)
					this.container.classList.remove("completed"); // completed styling is dirty.
			}
		}

		animate (scrollPosition) {
			//console.log ("-- Animate " + this.property + " " + this.name);

			switch (this.property) {
				case "opacity":

					// Dirty
					// if (this.propertyStart > this.propertyStop)
					// 	// this.propertyStart probably 1.0
					// 		this.container.style.opacity = this.propertyStart - (this.propertyStart * ((scrollPosition - this.scrollStart) / (this.scrollStop - this.scrollStart)));
					// else
					// {
					// 	// this.propertyStop probably 1.0
					// 		this.container.style.opacity = (this.propertyStop * ((scrollPosition - this.scrollStart) / (this.scrollStop - this.scrollStart)));
					// }

					this.container.style.opacity = this.propertyStart + ((this.propertyStop - this.propertyStart) * ((scrollPosition - this.scrollStart) / (this.scrollStop - this.scrollStart)));


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
	new AnimationAction("section-1|opacity", document.getElementsByClassName("section-1")[0], "opacity", 25, 85, 1.0, 0.0, true);
	new AnimationAction("header-top|opacity", document.getElementsByClassName("header-top")[0], "opacity", 35, 85, 1.0, 0.0, true);

	new AnimationAction("header-left|opacity", document.getElementsByClassName("header-left")[0], "opacity", 85, 100, 0.0, 1.0);
	new AnimationAction("header-left|position", document.getElementsByClassName("header-left")[0], "position", 85, 100, [-100,0], [0,0]);

	new AnimationAction("section-2__text-1|opacity", document.getElementsByClassName("section-2__text-1")[0], "opacity", 85, 100, 0.0, 1.0);
	new AnimationAction("section-2__text-1|position", document.getElementsByClassName("section-2__text-1")[0], "position", 85, 100, [50,0], [0,0]);
		new AnimationAction("section-2__text-2|opacity", document.getElementsByClassName("section-2__text-2")[0], "opacity", 90, 110, 0.0, 1.0);
		new AnimationAction("section-2__text-2|position", document.getElementsByClassName("section-2__text-2")[0], "position", 90, 110, [50,0], [0,0]);
			new AnimationAction("section-2__text-3|opacity", document.getElementsByClassName("section-2__text-3")[0], "opacity", 90, 110, 0.0, 1.0);
			new AnimationAction("section-2__text-3|position", document.getElementsByClassName("section-2__text-3")[0], "position", 90, 110, [50,0], [0,0]);
				new AnimationAction("section-2__text-4|opacity", document.getElementsByClassName("section-2__text-4")[0], "opacity", 95, 110, 0.0, 1.0);
					new AnimationAction("button-next-slide-section-2|opacity", document.getElementsByClassName("button-next-slide-section-2")[0], "opacity", 95, 110, 0.0, 1.0);
			//new AnimationAction("section-2__text-4|position", document.getElementsByClassName("section-2__text-4")[0], "position", 35, 50, [50,0], [0,0]);

	new AnimationAction("section-2|opacity", document.getElementsByClassName("section-2")[0], "opacity", 170, 185, 1.0, 0.0, true);

	new AnimationAction("section-3__title|margin-left", document.getElementsByClassName("section-3__title")[0], "margin-left", 100, 600, 100, 0);
	new AnimationAction("section-4__title|margin-left", document.getElementsByClassName("section-4__title")[0], "margin-left", 100, 600, 100, 0);
	new AnimationAction("section-5__title|margin-left", document.getElementsByClassName("section-5__title")[0], "margin-left", 100, 600, 100, 0);

	new AnimationAction("section-3__subtitle|margin-left", document.getElementsByClassName("section-3__subtitle")[0], "margin-left", 100, 275, 50, 0);

	// //new AnimationAction("section-3__titlecontainer|position", document.getElementsByClassName("section-3__titlecontainer")[0], "position", 65, 80, [50,0], [0,0]);
	//new AnimationAction("section-3__icon|opacity-in", document.getElementsByClassName("section-3__icon")[0], "opacity", 240, 265, 0.0, 1.0);
	new AnimationAction("section-3__icon|opacity-out", document.getElementsByClassName("section-3__icon")[0], "opacity", 250, 270, 1.0, 0.0);
	new AnimationAction("section-3__background|opacity", document.getElementsByClassName("section-3__background")[0], "opacity", 250, 270, 1.0, 0.0);
	new AnimationAction("section-3__title-1|opacity", document.getElementsByClassName("section-3__title-1")[0], "opacity", 250, 260, 1.0, 0.0);
	new AnimationAction("section-3__title-2|opacity", document.getElementsByClassName("section-3__title-2")[0], "opacity", 250, 260, 1.0, 0.0);
	new AnimationAction("section-3__subtitle|opacity", document.getElementsByClassName("section-3__subtitle")[0], "opacity", 250, 255, 1.0, 0.0);
	
	new AnimationAction("section-4__pretitle|margin-left", document.getElementsByClassName("section-4__pretitle")[0], "margin-left", 250, 385, 50, 0);
	new AnimationAction("section-4__pretitle|opacity", document.getElementsByClassName("section-4__pretitle")[0], "opacity", 350, 385, 1.0, 0.0);
	new AnimationAction("section-4__title-1|opacity", document.getElementsByClassName("section-4__title-1")[0], "opacity", 340, 385, 1.0, 0.0);
	new AnimationAction("section-3__title|opacity", document.getElementsByClassName("section-3__title")[0], "opacity", 340, 385, 1.0, 0.0);
	new AnimationAction("section-4__text|opacity", document.getElementsByClassName("section-4__text")[0], "opacity", 350, 385, 1.0, 0.0);

	new AnimationAction("section-3|opacity", document.getElementsByClassName("section-3")[0], "opacity", 370, 385, 1.0, 0.0, true);

	new AnimationAction("section-4__background|opacity", document.getElementsByClassName("section-4__background")[0], "opacity", 390, 405, 1.0, 0.0);
	new AnimationAction("section-4|opacity", document.getElementsByClassName("section-4")[0], "opacity", 390, 405, 1.0, 0.0, true);

	new AnimationAction("section-5__pretitle|margin-left", document.getElementsByClassName("section-5__pretitle")[0], "margin-left", 390, 485, 50, 0);
	new AnimationAction("button-prev-slide-section-5|opacity", document.getElementsByClassName("button-prev-slide-section-5")[0], "opacity", 405, 415, 0.0, 1.0);
	new AnimationAction("button-next-slide-section-5|opacity", document.getElementsByClassName("button-next-slide-section-5")[0], "opacity", 405, 415, 0.0, 1.0);

	new AnimationAction("section-5|opacity", document.getElementsByClassName("section-5")[0], "opacity", 470, 485, 1.0, 0.0, true);

	new AnimationAction("section-6__pretitle|margin-left", document.getElementsByClassName("section-6__pretitle")[0], "margin-left", 470, 585, 50, 0);
	new AnimationAction("section-6__pretitle|opacity", document.getElementsByClassName("section-6__pretitle")[0], "opacity", 470, 500, 0.0, 1.0);
	new AnimationAction("section-6__title|margin-left", document.getElementsByClassName("section-6__title")[0], "margin-left", 480, 585, 50, 0);
	new AnimationAction("section-6__title|opacity", document.getElementsByClassName("section-6__title")[0], "opacity", 480, 500, 0.0, 1.0);

	new AnimationAction("section-6|opacity", document.getElementsByClassName("section-6")[0], "opacity", 570, 585, 1.0, 0.0, true);

	new AnimationAction("section-7__text|opacity", document.getElementsByClassName("section-7__text")[0], "opacity", 580, 590, 0.0, 1.0);

	// Section 7 | Closing
	new AnimationAction("section-7|opacity", document.getElementsByClassName("section-7")[0], "opacity", 670, 685, 1.0, 0.0, true);

	// Section 8 | Active
	new AnimationAction("section-8__title|margin-left", document.getElementsByClassName("section-8__title")[0], "margin-left", 670, 850, 150, 0);
	new AnimationAction("section-8__subtitle|margin-left", document.getElementsByClassName("section-8__subtitle")[0], "margin-left", 670, 800, 100, 0);

	// Section 8 | Closing
	new AnimationAction("section-8__background|opacity", document.getElementsByClassName("section-8__background")[0], "opacity", 775, 795, 1.0, 0.0, true);
	new AnimationAction("section-8__title-1|opacity", document.getElementsByClassName("section-8__title-1")[0], "opacity", 700, 760, 1.0, 0.0);
	new AnimationAction("section-8__title-2|opacity", document.getElementsByClassName("section-8__title-2")[0], "opacity", 700, 760, 1.0, 0.0);
	new AnimationAction("section-8__subtitle|opacity", document.getElementsByClassName("section-8__subtitle")[0], "opacity", 700, 775, 1.0, 0.0);
	new AnimationAction("section-8__icon|opacity", document.getElementsByClassName("section-8__icon")[0], "opacity", 700, 760, 1.0, 0.0);
	new AnimationAction("section-8|opacity", document.getElementsByClassName("section-8")[0], "opacity", 790, 795, 1.0, 0.0, true);

	//Section 9 | Active
	new AnimationAction("section-9__title|margin-left", document.getElementsByClassName("section-9__title")[0], "margin-left", 790, 850, 125, 0);
	new AnimationAction("section-9__title|opacity", document.getElementsByClassName("section-9__title")[0], "opacity", 790, 825, 0.0, 1.0);
		new AnimationAction("section-9__pretitle|margin-left", document.getElementsByClassName("section-9__pretitle")[0], "margin-left", 790, 850, 50, 0);
		new AnimationAction("section-9__pretitle|opacity", document.getElementsByClassName("section-9__pretitle")[0], "opacity", 790, 850, 0.0, 1.0);
			new AnimationAction("section-9__subtitle|margin-left", document.getElementsByClassName("section-9__subtitle")[0], "margin-left", 820, 850, 50, 0);
			new AnimationAction("section-9__subtitle|opacity", document.getElementsByClassName("section-9__subtitle")[0], "opacity", 820, 850, 0.0, 1.0);
				new AnimationAction("section-9__stats|margin-left", document.getElementsByClassName("section-9__stats")[0], "margin-left", 830, 860, 50, 0);
				new AnimationAction("section-9__stats|opacity", document.getElementsByClassName("section-9__stats")[0], "opacity", 830, 860, 0.0, 1.0);


	new AnimationAction("section-9|opacity", document.getElementsByClassName("section-9")[0], "opacity", 885, 900, 1.0, 0.0, true);

	new AnimationAction("section-10__total|opacity", document.getElementsByClassName("section-10__total")[0], "opacity", 910, 930, 0.0, 1.0);


	// Continue here
	var barTotalTargets = [3199110, 3922681, 4655491, 5168063, 6156827, 6490115, 42309054];
	var barTotals = [0, 0, 0, 0, 0, 0, 0];

	// Scrolling backward breaks this due to only some bars incrementing total due to their animation scroll positioning. will come back to this

	new AnimationAction("section-10__bar|bar-1|opacity", document.getElementsByClassName("section-10__bar bar-7")[0], "opacity", 910, 920, 0.0, 1.0, false, 
		function(sp, ssta, ssto) { 
			barTotals[6] = barTotalTargets[6] * ((sp - ssta) / (ssto - ssta));
			document.getElementsByClassName("section-10__total-wrapper")[0].innerHTML = '$' + Math.round(barTotals.reduce((a, b) => a + b, 0)).toLocaleString();

		});
	new AnimationAction("section-10__bar|bar-2|opacity", document.getElementsByClassName("section-10__bar bar-6")[0], "opacity", 915, 925, 0.0, 1.0, false, 
		function(sp, ssta, ssto) { 
			barTotals[5] = barTotalTargets[5] * ((sp - ssta) / (ssto - ssta));
			document.getElementsByClassName("section-10__total-wrapper")[0].innerHTML = '$' + Math.round(barTotals.reduce((a, b) => a + b, 0)).toLocaleString();

		});
	new AnimationAction("section-10__bar|bar-3|opacity", document.getElementsByClassName("section-10__bar bar-5")[0], "opacity", 920, 930, 0.0, 1.0, false, 
		function(sp, ssta, ssto) { 
			barTotals[4] = barTotalTargets[4] * ((sp - ssta) / (ssto - ssta));
			document.getElementsByClassName("section-10__total-wrapper")[0].innerHTML = '$' + Math.round(barTotals.reduce((a, b) => a + b, 0)).toLocaleString();

		});
	new AnimationAction("section-10__bar|bar-4|opacity", document.getElementsByClassName("section-10__bar bar-4")[0], "opacity", 925, 935, 0.0, 1.0, false, 
		function(sp, ssta, ssto) { 
			barTotals[3] = barTotalTargets[3] * ((sp - ssta) / (ssto - ssta));
			document.getElementsByClassName("section-10__total-wrapper")[0].innerHTML = '$' + Math.round(barTotals.reduce((a, b) => a + b, 0)).toLocaleString();

		});
	new AnimationAction("section-10__bar|bar-5|opacity", document.getElementsByClassName("section-10__bar bar-3")[0], "opacity", 930, 940, 0.0, 1.0, false, 
		function(sp, ssta, ssto) { 
			barTotals[2] = barTotalTargets[2] * ((sp - ssta) / (ssto - ssta));
			document.getElementsByClassName("section-10__total-wrapper")[0].innerHTML = '$' + Math.round(barTotals.reduce((a, b) => a + b, 0)).toLocaleString();

		});
	new AnimationAction("section-10__bar|bar-6|opacity", document.getElementsByClassName("section-10__bar bar-2")[0], "opacity", 935, 945, 0.0, 1.0, false, 
		function(sp, ssta, ssto) { 
			barTotals[1] = barTotalTargets[1] * ((sp - ssta) / (ssto - ssta));
			document.getElementsByClassName("section-10__total-wrapper")[0].innerHTML = '$' + Math.round(barTotals.reduce((a, b) => a + b, 0)).toLocaleString();

		});
	new AnimationAction("section-10__bar|bar-7|opacity", document.getElementsByClassName("section-10__bar bar-1")[0], "opacity", 940, 950, 0.0, 1.0, false, 
		function(sp, ssta, ssto) { 
			barTotals[0] = barTotalTargets[0] * ((sp - ssta) / (ssto - ssta));
			document.getElementsByClassName("section-10__total-wrapper")[0].innerHTML = '$' + Math.round(barTotals.reduce((a, b) => a + b, 0)).toLocaleString();

		});

	new AnimationAction("section-10__background|opacity", document.getElementsByClassName("section-10__background")[0], "opacity", 975, 1000, 1.0, 0.0, true);
	new AnimationAction("section-10__total-wrapper|opacity", document.getElementsByClassName("section-10__total-wrapper")[0], "opacity", 975, 1000, 1.0, 0.0, true);

	new AnimationAction("section-10__fadeoutbars|opacity", document.getElementsByClassName("section-10__fadeoutbars")[0], "opacity", 975, 1000, 1.0, 0.0, true);

	new AnimationAction("section-11__pretitle|opacity", document.getElementsByClassName("section-11__pretitle")[0], "opacity", 995, 1010, 0.0, 1.0);
	new AnimationAction("section-11__pretitle|margin-left", document.getElementsByClassName("section-11__pretitle")[0], "margin-left", 995, 1010, 50, 0);
	new AnimationAction("section-11__title|opacity", document.getElementsByClassName("section-11__title")[0], "opacity", 995, 1010, 0.0, 1.0);
	new AnimationAction("section-11__title|margin-left", document.getElementsByClassName("section-11__title")[0], "margin-left", 995, 1010, 50, 0);
	new AnimationAction("section-11__text|opacity", document.getElementsByClassName("section-11__text")[0], "opacity", 1000, 1015, 0.0, 1.0);
	new AnimationAction("section-11__text|margin-left", document.getElementsByClassName("section-11__text")[0], "margin-left", 1000, 1015, 50, 0);
	new AnimationAction("section-11__bardetails|opacity", document.getElementsByClassName("section-11__bardetails")[0], "opacity", 995, 1010, 0.0, 1.0);
	//new AnimationAction("section-11__bardetails|margin-left", document.getElementsByClassName("section-11__bardetails")[0], "margin-left", 995, 1010, 75, 0);
	new AnimationAction("section-11__note|opacity", document.getElementsByClassName("section-11__note")[0], "opacity", 995, 1010, 0.0, 1.0);
	//new AnimationAction("section-11__note|margin-left", document.getElementsByClassName("section-11__note")[0], "margin-left", 995, 1010, 75, 0);

	new AnimationAction("section-10|opacity", document.getElementsByClassName("section-10")[0], "opacity", 1085, 1100, 1.0, 0.0, true);
	new AnimationAction("section-11|opacity", document.getElementsByClassName("section-11")[0], "opacity", 1085, 1100, 1.0, 0.0, true);

	new AnimationAction("section-12__image|opacity", document.getElementsByClassName("section-12__image")[0].getElementsByTagName("img")[0], "opacity", 1100, 1130, 0.0, 1.0);
	new AnimationAction("section-12__image|img|margin-left", document.getElementsByClassName("section-12__image")[0].getElementsByTagName("img")[0], "margin-left", 1100, 1130, -50, 0);
	new AnimationAction("section-12__title|opacity", document.getElementsByClassName("section-12__title")[0], "opacity", 1130, 1150, 0.0, 1.0);
	new AnimationAction("section-12__text|opacity", document.getElementsByClassName("section-12__text")[0], "opacity", 1130, 1150, 0.0, 1.0);
	new AnimationAction("button-next-slide-section-12|opacity", document.getElementsByClassName("button-next-slide-section-12")[0], "opacity", 1130, 1150, 0.0, 1.0);

	new AnimationAction("section-12|opacity", document.getElementsByClassName("section-12")[0], "opacity", 1180, 1200, 1.0, 0.0, true);

	new AnimationAction("section-13__image|opacity", document.getElementsByClassName("section-13__image")[0].getElementsByTagName("img")[0], "opacity", 1200, 1230, 0.0, 1.0);
	new AnimationAction("section-13__image|img|margin-left", document.getElementsByClassName("section-13__image")[0].getElementsByTagName("img")[0], "margin-left", 1200, 1230, -50, 0);
	new AnimationAction("section-13__title|opacity", document.getElementsByClassName("section-13__title")[0], "opacity", 1230, 1250, 0.0, 1.0);
	new AnimationAction("section-13__text|opacity", document.getElementsByClassName("section-13__text")[0], "opacity", 1230, 1250, 0.0, 1.0);
	new AnimationAction("button-next-slide-section-13|opacity", document.getElementsByClassName("button-next-slide-section-13")[0], "opacity", 1230, 1250, 0.0, 1.0);

	new AnimationAction("section-13|opacity", document.getElementsByClassName("section-13")[0], "opacity", 1280, 1300, 1.0, 0.0, true);

	new AnimationAction("section-14__image|opacity", document.getElementsByClassName("section-14__image")[0].getElementsByTagName("img")[0], "opacity", 1300, 1330, 0.0, 1.0);
	new AnimationAction("section-14__image|img|margin-left", document.getElementsByClassName("section-14__image")[0].getElementsByTagName("img")[0], "margin-left", 1300, 1330, -50, 0);
	new AnimationAction("section-14__title|opacity", document.getElementsByClassName("section-14__title")[0], "opacity", 1330, 1350, 0.0, 1.0);
	new AnimationAction("section-14__text|opacity", document.getElementsByClassName("section-14__text")[0], "opacity", 1330, 1350, 0.0, 1.0);
	new AnimationAction("button-next-slide-section-14|opacity", document.getElementsByClassName("button-next-slide-section-14")[0], "opacity", 1230, 1350, 0.0, 1.0);

	new AnimationAction("section-14|opacity", document.getElementsByClassName("section-14")[0], "opacity", 1380, 1400, 1.0, 0.0, true);

	new AnimationAction("section-15__image|opacity", document.getElementsByClassName("section-15__image")[0].getElementsByTagName("img")[0], "opacity", 1400, 1430, 0.0, 1.0);
	new AnimationAction("section-15__image|img|margin-left", document.getElementsByClassName("section-15__image")[0].getElementsByTagName("img")[0], "margin-left", 1400, 1430, -50, 0);
	new AnimationAction("section-15__title|opacity", document.getElementsByClassName("section-15__title")[0], "opacity", 1430, 1450, 0.0, 1.0);
	new AnimationAction("section-15__text|opacity", document.getElementsByClassName("section-15__text")[0], "opacity", 1430, 1450, 0.0, 1.0);
	new AnimationAction("button-next-slide-section-15|opacity", document.getElementsByClassName("button-next-slide-section-15")[0], "opacity", 1330, 1450, 0.0, 1.0);

	new AnimationAction("section-15|opacity", document.getElementsByClassName("section-15")[0], "opacity", 1480, 1500, 1.0, 0.0, true);

	new AnimationAction("section-16__pretitle|opacity", document.getElementsByClassName("section-16__pretitle")[0], "opacity", 1530, 1550, 0.0, 1.0);
	new AnimationAction("section-16__pretitle|margin-left", document.getElementsByClassName("section-16__pretitle")[0], "margin-left", 1530, 1550, 50, 0);
	new AnimationAction("section-16__title|opacity", document.getElementsByClassName("section-16__title")[0], "opacity", 1530, 1550, 0.0, 1.0);
	new AnimationAction("section-16__title|margin-left", document.getElementsByClassName("section-16__title")[0], "margin-left", 1530, 1550, 50, 0);

	new AnimationAction("section-16|opacity", document.getElementsByClassName("section-16")[0], "opacity", 1580, 1600, 1.0, 0.0, true);

	new AnimationAction("section-17|opacity", document.getElementsByClassName("section-17")[0], "opacity", 1680, 1700, 1.0, 0.0, true);

	new AnimationAction("section-18__title|opacity", document.getElementsByClassName("section-18__title")[0], "opacity", 1730, 1750, 0.0, 1.0);
	new AnimationAction("section-18__title|margin-left", document.getElementsByClassName("section-18__title")[0], "margin-left", 1730, 1750, 50, 0);
	new AnimationAction("section-18__subtitle|opacity", document.getElementsByClassName("section-18__subtitle")[0], "opacity", 1730, 1750, 0.0, 1.0);
	new AnimationAction("section-18__subtitle|margin-left", document.getElementsByClassName("section-18__subtitle")[0], "margin-left", 1730, 1750, 50, 0);
	new AnimationAction("section-18__icon|opacity", document.getElementsByClassName("section-18__icon")[0], "opacity", 1730, 1750, 0.0, 1.0);

	new AnimationAction("section-18|opacity", document.getElementsByClassName("section-18")[0], "opacity", 1780, 1800, 1.0, 0.0, true);

	new AnimationAction("section-19__pretitle|opacity", document.getElementsByClassName("section-19__pretitle")[0], "opacity", 1830, 1850, 0.0, 1.0);
	new AnimationAction("section-19__pretitle|margin-left", document.getElementsByClassName("section-19__pretitle")[0], "margin-left", 1830, 1850, 50, 0);
	new AnimationAction("section-19__title|opacity", document.getElementsByClassName("section-19__title")[0], "opacity", 1830, 1850, 0.0, 1.0);
	new AnimationAction("section-19__title|margin-left", document.getElementsByClassName("section-19__title")[0], "margin-left", 1830, 1850, 50, 0);
	new AnimationAction("section-19__text|opacity", document.getElementsByClassName("section-19__text")[0], "opacity", 1830, 1850, 0.0, 1.0);
	new AnimationAction("section-19__text|margin-left", document.getElementsByClassName("section-19__text")[0], "margin-left", 1830, 1850, 50, 0);

	new AnimationAction("section-19|opacity", document.getElementsByClassName("section-19")[0], "opacity", 1880, 1900, 1.0, 0.0, true);

	new AnimationAction("section-20__pretitle|opacity", document.getElementsByClassName("section-20__pretitle")[0], "opacity", 1930, 1950, 0.0, 1.0);
	new AnimationAction("section-20__pretitle|margin-left", document.getElementsByClassName("section-20__pretitle")[0], "margin-left", 1930, 1950, 50, 0);
	new AnimationAction("section-20__title|opacity", document.getElementsByClassName("section-20__title")[0], "opacity", 1930, 1950, 0.0, 1.0);
	new AnimationAction("section-20__title|margin-left", document.getElementsByClassName("section-20__title")[0], "margin-left", 1930, 1950, 50, 0);
	new AnimationAction("section-20__text|opacity", document.getElementsByClassName("section-20__text")[0], "opacity", 1930, 1950, 0.0, 1.0);
	new AnimationAction("section-20__text|margin-left", document.getElementsByClassName("section-20__text")[0], "margin-left", 1930, 1950, 50, 0);

	new AnimationAction("section-20|opacity", document.getElementsByClassName("section-20")[0], "opacity", 1980, 2000, 1.0, 0.0, true);

	new AnimationAction("section-21__pretitle|opacity", document.getElementsByClassName("section-21__pretitle")[0], "opacity", 2030, 2050, 0.0, 1.0);
	new AnimationAction("section-21__pretitle|margin-left", document.getElementsByClassName("section-21__pretitle")[0], "margin-left", 2030, 2050, 50, 0);
	new AnimationAction("section-21__title|opacity", document.getElementsByClassName("section-21__title")[0], "opacity", 2030, 2050, 0.0, 1.0);
	new AnimationAction("section-21__title|margin-left", document.getElementsByClassName("section-21__title")[0], "margin-left", 2030, 2050, 50, 0);
	new AnimationAction("section-21__main-content|opacity", document.getElementsByClassName("section-21__main-content")[0], "opacity", 2030, 2050, 0.0, 1.0);
	new AnimationAction("section-21__quoter|opacity", document.getElementsByClassName("section-21__quoter")[0], "opacity", 2030, 2050, 0.0, 1.0);

	new AnimationAction("section-21|opacity", document.getElementsByClassName("section-21")[0], "opacity", 2080, 2100, 1.0, 0.0, true);

	new AnimationAction("section-22|opacity", document.getElementsByClassName("section-22")[0], "opacity", 2180, 2200, 1.0, 0.0, true);

	new AnimationAction("section-23__sector sector-1|opacity", document.getElementsByClassName("section-23__sector sector-1")[0], "opacity", 2210, 2240, 0.0, 1.0);
	new AnimationAction("section-23__sector sector-2|opacity", document.getElementsByClassName("section-23__sector sector-2")[0], "opacity", 2230, 2260, 0.0, 1.0);
	new AnimationAction("section-23__sector sector-3|opacity", document.getElementsByClassName("section-23__sector sector-3")[0], "opacity", 2250, 2280, 0.0, 1.0);

	new AnimationAction("section-23|opacity", document.getElementsByClassName("section-23")[0], "opacity", 2280, 2300, 1.0, 0.0, true);

	new AnimationAction("section-24__pretitle|margin-left", document.getElementsByClassName("section-24__pretitle")[0], "margin-left", 2310, 2380, 150, 0);
	new AnimationAction("section-24__pretitle|opacity", document.getElementsByClassName("section-24__pretitle")[0], "opacity", 2310, 2380, 0.0, 1.0);
	new AnimationAction("section-24__title|margin-left", document.getElementsByClassName("section-24__title")[0], "margin-left", 2310, 2380, 150, 0);
	new AnimationAction("section-24__title|opacity", document.getElementsByClassName("section-24__title")[0], "opacity", 2310, 2380, 0.0, 1.0);
	new AnimationAction("section-24__subtitle|margin-left", document.getElementsByClassName("section-24__subtitle")[0], "margin-left", 2310, 2380, 100, 0);
	new AnimationAction("section-24__subtitle|opacity", document.getElementsByClassName("section-24__subtitle")[0], "opacity", 2310, 2380, 0.0, 1.0);

	new AnimationAction("section-24|opacity", document.getElementsByClassName("section-24")[0], "opacity", 2380, 2400, 1.0, 0.0, true);

	new AnimationAction("section-25__text|opacity", document.getElementsByClassName("section-25__text")[0], "opacity", 2410, 2580, 0.0, 1.0);

	// new AnimationAction("section-11|opacity", document.getElementsByClassName("section-11")[0], "opacity", 1000, 1100, 1.0, 0.0, true);

	

	// new AnimationAction("section-13|opacity", document.getElementsByClassName("section-13")[0], "opacity", 1200, 1300, 1.0, 0.0, true);

	// new AnimationAction("section-14|opacity", document.getElementsByClassName("section-14")[0], "opacity", 1300, 1400, 1.0, 0.0, true);

	// new AnimationAction("section-15|opacity", document.getElementsByClassName("section-15")[0], "opacity", 1400, 1500, 1.0, 0.0, true);

	// new AnimationAction("section-16|opacity", document.getElementsByClassName("section-16")[0], "opacity", 1500, 1600, 1.0, 0.0, true);

	// new AnimationAction("section-17|opacity", document.getElementsByClassName("section-17")[0], "opacity", 1600, 1700, 1.0, 0.0, true);

	// new AnimationAction("section-18|opacity", document.getElementsByClassName("section-18")[0], "opacity", 1700, 1800, 1.0, 0.0, true);

	// new AnimationAction("section-19|opacity", document.getElementsByClassName("section-19")[0], "opacity", 1800, 1900, 1.0, 0.0, true);

	// new AnimationAction("section-20|opacity", document.getElementsByClassName("section-20")[0], "opacity", 1900, 2000, 1.0, 0.0, true);

	// new AnimationAction("section-21|opacity", document.getElementsByClassName("section-21")[0], "opacity", 2000, 2100, 1.0, 0.0, true);

	// new AnimationAction("section-22|opacity", document.getElementsByClassName("section-22")[0], "opacity", 2100, 2200, 1.0, 0.0, true);

	// new AnimationAction("section-23|opacity", document.getElementsByClassName("section-23")[0], "opacity", 2200, 2300, 1.0, 0.0, true);

	// new AnimationAction("section-24|opacity", document.getElementsByClassName("section-24")[0], "opacity", 2300, 2400, 1.0, 0.0, true);

	// new AnimationAction("section-25|opacity", document.getElementsByClassName("section-25")[0], "opacity", 2400, 2500, 1.0, 0.0, true);

	window.addEventListener('scroll', function(e) {

		//console.log (window.pageYOffset);

		for (var i = 0; i < AnimationAction.createdElements.length; i++) {

			AnimationAction.createdElements[i].update(window.pageYOffset);

		}

	});

	document.getElementsByClassName("nav-main__link")[0].addEventListener('click', function(e) {
		var scrollToPosition = (parseInt(e.srcElement.getAttribute("data-section")) - 1) * window.innerHeight;
		scrollTo(null, scrollToPosition, 500);
		console.log (window.pageYOffset);
		e.preventDefault();
	});

	document.getElementsByClassName("button-arrow-red-section-1")[0].addEventListener('click', function() {
		scrollTo(null, window.innerHeight, 500);
	});

	document.getElementsByClassName("button-next-slide-section-2")[0].addEventListener('click', function() {
		document.getElementsByClassName("section-2")[0].classList.add("ceo-clicked");
		document.getElementsByClassName("section-21")[0].classList.add("ceo-clicked");
	});

	document.getElementsByClassName("button-next-slide-section-2")[0].addEventListener('click', function() {
		document.getElementsByClassName("section-2")[0].classList.add("ceo-clicked");
		document.getElementsByClassName("section-2a")[0].classList.add("ceo-clicked");
	});

	document.getElementsByClassName("button-prev-red-section-2a")[0].addEventListener('click', function() {
		document.getElementsByClassName("section-2")[0].classList.remove("ceo-clicked");
		document.getElementsByClassName("section-2a")[0].classList.remove("ceo-clicked");
	});

	document.getElementsByClassName("section-3__icon")[0].addEventListener('click', function() {
		document.getElementsByClassName("section-3")[0].classList.add("cheetah-clicked");
		document.getElementsByClassName("section-31")[0].classList.add("cheetah-clicked");
	});

	document.getElementsByClassName("section-31__close")[0].addEventListener('click', function() {
		document.getElementsByClassName("section-3")[0].classList.remove("cheetah-clicked");
		document.getElementsByClassName("section-31")[0].classList.remove("cheetah-clicked");
	});

	document.getElementsByClassName("button-prev-slide-section-5")[0].addEventListener('click', function() {
		// document.getElementsByClassName("section-2")[0].classList.add("ceo-clicked");
		document.getElementsByClassName("section-51")[0].classList.add("merced-clicked");
	});

	document.getElementsByClassName("button-back-slide-section-51")[0].addEventListener('click', function() {
		// document.getElementsByClassName("section-2")[0].classList.add("ceo-clicked");
		document.getElementsByClassName("section-51")[0].classList.remove("merced-clicked");
	});

	document.getElementsByClassName("button-next-slide-section-5")[0].addEventListener('click', function() {
		// document.getElementsByClassName("section-2")[0].classList.add("ceo-clicked");
		document.getElementsByClassName("section-52")[0].classList.add("bexar-clicked");
	});

	document.getElementsByClassName("button-back-slide-section-52")[0].addEventListener('click', function() {
		// document.getElementsByClassName("section-2")[0].classList.add("ceo-clicked");
		document.getElementsByClassName("section-52")[0].classList.remove("bexar-clicked");
	});

	document.getElementsByClassName("section-8__icon")[0].addEventListener('click', function() {
		document.getElementsByClassName("section-8")[0].classList.add("whiterose-clicked");
		document.getElementsByClassName("section-81")[0].classList.add("whiterose-clicked");
	});

	document.getElementsByClassName("section-81__close")[0].addEventListener('click', function() {
		document.getElementsByClassName("section-8")[0].classList.remove("whiterose-clicked");
		document.getElementsByClassName("section-81")[0].classList.remove("whiterose-clicked");
	});

	document.getElementsByClassName("button-next-slide-section-12")[0].addEventListener('click', function() {
		document.getElementsByClassName("section-12a")[0].classList.add("virtual-partnerships-clicked");
	});

	document.getElementsByClassName("button-back-section-12a")[0].addEventListener('click', function() {
		document.getElementsByClassName("section-12a")[0].classList.remove("virtual-partnerships-clicked");
	});

	document.getElementsByClassName("button-next-slide-section-13")[0].addEventListener('click', function() {
		document.getElementsByClassName("section-13a")[0].classList.add("virtual-partnerships-clicked");
	});

	document.getElementsByClassName("button-back-section-13a")[0].addEventListener('click', function() {
		document.getElementsByClassName("section-13a")[0].classList.remove("virtual-partnerships-clicked");
	});

	document.getElementsByClassName("button-next-slide-section-14")[0].addEventListener('click', function() {
		document.getElementsByClassName("section-14a")[0].classList.add("virtual-partnerships-clicked");
	});

	document.getElementsByClassName("button-back-section-14a")[0].addEventListener('click', function() {
		document.getElementsByClassName("section-14a")[0].classList.remove("virtual-partnerships-clicked");
	});

	document.getElementsByClassName("button-next-slide-section-15")[0].addEventListener('click', function() {
		document.getElementsByClassName("section-15a")[0].classList.add("virtual-partnerships-clicked");
	});

	document.getElementsByClassName("button-back-section-15a")[0].addEventListener('click', function() {
		document.getElementsByClassName("section-15a")[0].classList.remove("virtual-partnerships-clicked");
	});

	document.getElementsByClassName("section-18__icon")[0].addEventListener('click', function() {
		document.getElementsByClassName("section-18")[0].classList.add("newyear-clicked");
		document.getElementsByClassName("section-18a")[0].classList.add("newyear-clicked");
	});

	document.getElementsByClassName("section-18a__close")[0].addEventListener('click', function() {
		document.getElementsByClassName("section-18")[0].classList.remove("newyear-clicked");
		document.getElementsByClassName("section-18a")[0].classList.remove("newyear-clicked");
	});

	document.getElementsByClassName("button-next-slide-section-20")[0].addEventListener('click', function() {
		document.getElementsByClassName("section-20")[0].classList.add("chairman-clicked");
		document.getElementsByClassName("section-20a")[0].classList.add("chairman-clicked");
	});

	document.getElementsByClassName("button-prev-green-section-20a")[0].addEventListener('click', function() {
		document.getElementsByClassName("section-20")[0].classList.remove("chairman-clicked");
		document.getElementsByClassName("section-20a")[0].classList.remove("chairman-clicked");
	});

	document.getElementsByClassName("button-next-slide-section-23")[0].addEventListener('click', function() {
		document.getElementsByClassName("section-23")[0].classList.add("fellowship-clicked");
		document.getElementsByClassName("section-23a")[0].classList.add("fellowship-clicked");
	});

	document.getElementsByClassName("button-back-slide-section-23a")[0].addEventListener('click', function() {
		document.getElementsByClassName("section-23")[0].classList.remove("fellowship-clicked");
		document.getElementsByClassName("section-23a")[0].classList.remove("fellowship-clicked");
	});

});

var quotesContainer = document.getElementsByClassName("section-2a__quoter")[0];

var quoteIndex = 1;

var quotesDictionary = { 
    1: { "p": '“I have volunteered in the nonprofit space for more than three decades, and I have never seen such an efficient operation.”', 
    	 "span": "—Mary Rose Brown, Executive Vice President and Chief Administrative Officer at NuStar Energy, who served on the COVID-19 Response Fund advisory committee." },
    
    2: { "p": '“There is very little that the…Foundation does that doesn’t influence most of our lives…and certainly mine.”', 
    	 "span": "—Aaronetta Pierce" },

   	3: { "p": '“You don’t have to be a millionaire to make an investment in a fund. Instead, it’s the kind of person who believes in the community and be able to want to assist others.”', 
    	 "span": "—Janie Barrera" }
};

var quoteParagraph = document.getElementsByClassName("section-2a__quoter")[0].getElementsByTagName("p")[0];

var quoteSpan = document.getElementsByClassName("section-2a__quoter")[0].getElementsByTagName("span")[0];


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

    }, 6100);
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