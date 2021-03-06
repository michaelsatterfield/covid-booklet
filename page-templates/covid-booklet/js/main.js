window.addEventListener("DOMContentLoaded", event => {

    // Revised animation structure
    class ElementAnimation
        //consturctor fires when the class is called
    {
        constructor(_identifier,
                    _property,
                    _propertyInitialValue,
                    _propertyTargetValue,
                    _scrollStartOffset,
                    _scrollStopOffset,
                    _updateCallback = undefined,
                    _initialSecondary,
                    _targetSecondary,) {
            // Future update to accept hashed id attribute element identifiers
            // currently accepts only class
            this.identifier = _identifier;
            this.container = document.getElementsByClassName(this.identifier)[0];
            this.property = _property;
            this.propertyInitialValue = _propertyInitialValue;
            this.propertyTargetValue = _propertyTargetValue;
            this.initialSecondary = _initialSecondary;
            this.targetSecondary = _targetSecondary;
            this._scrollStartOffset = _scrollStartOffset;
            this._scrollStopOffset = _scrollStopOffset;

            //height in pixels divided by 100
            this.scrollStartOffset = (_scrollStartOffset / 100) * window.innerHeight;
            this.scrollStopOffset = (_scrollStopOffset / 100) * window.innerHeight;

            // update scroll-dummy-overlay if > overlay height document.getElementsByClassName("scroll-dummy-overlay")[0].style.height = (window.innerHeight * stop/100) + "px";
            this.updateCallback = _updateCallback;

            this.animationPercentage = undefined; // For use in animate()
            this.animationValue = undefined // For use in animate()
            this.lastAnimationValue = undefined // For use in animate()

            if (ElementAnimation.createdAnimations[this.identifier] == undefined)
                ElementAnimation.createdAnimations[this.identifier] = {};

            if (ElementAnimation.createdAnimations[this.identifier][this.property] == undefined)
                ElementAnimation.createdAnimations[this.identifier][this.property] = [];

            ElementAnimation.createdAnimations[this.identifier][this.property].push(this);
        }

        static setScrollDummyHeight() {
            document.getElementsByClassName("scroll-dummy-overlay")[0].style.height =
                ((window.innerHeight * (1 + (getLastScrollAnimation()._scrollStopOffset / 100))) * ElementAnimation.scrollFactor) + "px"; // 1 + adds window height to scrollStopOffset percentage height. scrollStopOffset equally 2000 = 20 window heights or common slide height of (100 vh)
        }

        // Consider moving to static
        update(pageScrollPosition) {
            if (pageScrollPosition >= this.scrollStopOffset) {
                this.container.classList.remove("active");

                // may require a settimeout delay between active and completed for CSS animations
                this.container.classList.add("completed");
            } else {
                // may require a settimeout delay between completed and active for CSS animations
                if (pageScrollPosition >= this.scrollStartOffset) {
                    this.container.classList.add("active");
                    this.container.classList.remove("completed");
                } else {
                    this.container.classList.remove("active");
                }

            }

            this.animate(pageScrollPosition);

            if (typeof this.updateCallback == "function")
                this.updateCallback(pageScrollPosition, this.scrollStartOffset, this.scrollStopOffset);


        }


        // consider moving to static
        animate(pageScrollPosition) {
            this.animationPercentage = (pageScrollPosition - this.scrollStartOffset) / (this.scrollStopOffset - this.scrollStartOffset);
            this.animationValue = this.propertyInitialValue + ((this.propertyTargetValue - this.propertyInitialValue) * this.animationPercentage);
            this.animationString = this.propertyTargetValue;


            if (this.lastAnimationValue != this.animationValue) {

                switch (this.property) {
                    case "opacity":
                        this.container.style.opacity = this.animationValue;
                        break;

                    case "margin-left":
                        this.container.style.marginLeft = this.animationValue + "px";
                        break;

                    case "scale":
                        this.container.style.transform = "scale(" + this.animationValue + ")";
                        break;

                    case "background-image":
                        this.container.style.backgroundImage = "url(" + this.animationString + ")";
                        break;

                    case "background-position":
                        this.container.style.backgroundPositionY = this.animationValue + "%";
                        break;

                    case "background-filter":
                        this.container.style.backgroundImage = "linear-gradient(268deg, rgba(0,0,0, " + this.animationValue + "), rgba(0,0,0,0)),url(" + "https://saaf-covid.mystagingwebsite.com/wp-content/uploads/2021/10/San-Anto-Murals-27-scaled.jpg" + ")";
                        break
                }

                this.lastAnimationValue = this.animationValue;
            }
        }
    }

    //end of class "animation"

    ElementAnimation.createdAnimations = {};
    ElementAnimation.scrollFactor = 1.475; // 1 normal scroll speed, 2 scrolling takes twice as long, 3 scrolling takes three times as long as normal
    ElementAnimation.scrollDisabled = false;


    new ElementAnimation("section-1", "opacity",
        // initial property at start of animation, target property at stop of animation
        1.0, 0.0,
        // Scroll min, max
        35, 100
    );

    //starting and stopping target properties
    //instances of the created Element Animation Class
    new ElementAnimation("header-top", "opacity", 1.0, 0.0, 35, 100);
    new ElementAnimation("section-1__text-1", "opacity", 1.0, 0.0, 0, 100);
    new ElementAnimation("section-1__text-1", "margin-left", 0, 0, 0, 100);
    new ElementAnimation("section-1__text-2", "opacity", 1.0, 0.0, 0, 100);
    new ElementAnimation("section-1__text-2", "margin-left", 0, 0, 0, 100);
    new ElementAnimation("section-1__text-2", "color", 'white', 'red', 0, 50);


    new ElementAnimation("header-left", "opacity", 0.0, 1.0, 100, 120);
    new ElementAnimation("header-left", "margin-left", -100, 0, 100, 120);


    new ElementAnimation("section-2__text-1", "opacity", 0.0, 1.0, 105, 120);
    new ElementAnimation("section-2__text-1", "margin-left", 50, 0, 105, 120);
    new ElementAnimation("section-2__text-2", "opacity", 0.0, 1.0, 110, 125);
    new ElementAnimation("section-2__text-2", "margin-left", 0, 68, 110, 125);
    new ElementAnimation("section-2__text-3", "opacity", 0.0, 1.0, 110, 125);
    new ElementAnimation("section-2__text-3", "margin-left", 50, 0, 110, 125);
    new ElementAnimation("section-2__text-4", "opacity", 0.0, 1.0, 130, 145);
    new ElementAnimation("section-2__text-5", "opacity", 0.0, 1.0, 155, 170);

    new ElementAnimation("section-2", "opacity", 1.0, 0.0, 280, 385);

    new ElementAnimation("section-4__title", "margin-left", 100, 0, 300, 320);
    new ElementAnimation("section-5__title", "margin-left", 100, 0, 100, 500);

    new ElementAnimation("section-3__subtitle", "opacity", 0.0, 1.0, 195, 215);
    new ElementAnimation("section-3__subtitle", "margin-left", 100, 0, 195, 300);
    new ElementAnimation("section-3__icon", "opacity", 0.0, 1.0, 195, 210);

    new ElementAnimation("section-3__icon", "opacity", 1.0, 0.0, 264, 265);
    new ElementAnimation("section-3__background", "opacity", 1.0, 0.0, 265, 300);
    new ElementAnimation("section-3__title-1", "opacity", 1.0, 0.0, 215, 240);
    new ElementAnimation("section-3__title-2", "opacity", 1.0, 0.0, 215, 240);
    new ElementAnimation("section-3__subtitle", "opacity", 1.0, 0.0, 245, 270);

    // new ElementAnimation("section-4__background", "scale", 1.0, 1.05, 245, 500);
    new ElementAnimation("section-4__pretitle", "opacity", 0.0, 1.0, 300, 315);
    new ElementAnimation("section-4__text", "opacity", 0.0, 1.0, 300, 340);

    new ElementAnimation("section-4__pretitle", "margin-left", 50, 0, 250, 385);
    new ElementAnimation("section-4__pretitle", "opacity", 1.0, 0.0, 350, 385);
    new ElementAnimation("section-4__title-1", "opacity", 1.0, 0.0, 340, 385);
    new ElementAnimation("section-3__title", "opacity", 1.0, 0.0, 340, 385);
    new ElementAnimation("section-4__text", "opacity", 1.0, 0.0, 350, 385);

    new ElementAnimation("section-3", "opacity", 1.0, 0.0, 370, 385);

    new ElementAnimation("section-4__background", "opacity", 1.0, 0.0, 390, 405);
    new ElementAnimation("section-4", "opacity", 1.0, 0.0, 390, 405);

    // new ElementAnimation("section-5__background", "scale", 1.0, 1.05, 410, 420);
    new ElementAnimation("section-5__pretitle", "margin-left", 50, 0, 390, 485);
    new ElementAnimation("section-5__subtitle", "opacity", 0.0, 1.0, 450, 465);


    new ElementAnimation("section-5", "opacity", 1.0, 0.0, 470, 485);

    // new ElementAnimation("section-6__background", "scale", 1.0, 1.05, 470, 585);
    new ElementAnimation("section-6__pretitle", "margin-left", 50, 0, 470, 585);
    new ElementAnimation("section-6__pretitle", "opacity", 0.0, 1.0, 470, 500);
    new ElementAnimation("section-6__title", "margin-left", 50, 0, 480, 585);
    new ElementAnimation("section-6__title", "opacity", 0.0, 1.0, 490, 520);

    new ElementAnimation("section-6", "opacity", 1.0, 0.0, 570, 585);

    // new ElementAnimation("section-7__background", "scale", 1.0, 1.05, 470, 700);
    new ElementAnimation("section-7__text", "opacity", 0.0, 1.0, 585, 600);
    new ElementAnimation("section-7__signature", "opacity", 0.0, 1.0, 585, 600);


    // Section 7 | Closing
    new ElementAnimation("section-7", "opacity", 1.0, 0.0, 670, 685);

    // Section 8 | Active
    // new ElementAnimation("section-8", "opacity", 0.0, 1.0, 685, 690);
    new ElementAnimation("section-8__title", "margin-left", 150, 0, 670, 700);
    new ElementAnimation("section-8__subtitle", "margin-left", 100, 0, 700, 720);
    new ElementAnimation("section-8__subtitle-wrapper", "opacity", 0.0, 1.0, 710, 725);

    // Section 8 | Closing
    new ElementAnimation("section-8__background", "opacity", 1.0, 0.0, 770, 790);

    new ElementAnimation("section-8__subtitle", "opacity", 1.0, 0.8, 760, 770);

    new ElementAnimation("section-8", "opacity", 1.0, 0.0, 770, 790);

    //Section 9 | Active
    // new ElementAnimation("section-9", "opacity", 0.0, 1.0, 780, 790);

    new ElementAnimation("section-9__background", "opacity", 0.0, 1.0, 750, 760);
    //
    new ElementAnimation("section-9__background", "opacity", 1.00, 0.0, 880, 890);

    new ElementAnimation("section-9", "opacity", 1.0, 0.0, 880, 890);

    // //section 10
    // new ElementAnimation("section-10", "opacity", 0, 1.0, 890, 900);
    new ElementAnimation("section-10__background", "opacity", 0, 1.00, 890, 900);
    new ElementAnimation("section-10__pretitle", "opacity", 0, 1.0, 900, 920);
    new ElementAnimation("section-10__total-wrapper", "opacity", 0.0, 1.0, 890, 900);
    new ElementAnimation("section-10__pretitle", "margin-left", 50, 0, 900, 920);
    new ElementAnimation("section-10__title", "opacity", 0.0, 1.0, 910, 920);
    new ElementAnimation("section-10__title", "margin-left", 50, 0, 910, 930);
    new ElementAnimation("section-10__text", "opacity", 0.0, 1.0, 930, 940);
    new ElementAnimation("section-10", "opacity", 1.0, 0, 1000, 1020);

    //
    // new ElementAnimation("section-11", "opacity", 0.0, 1.0, 1020, 1030);
    new ElementAnimation("section-11__background", "opacity", 0.0, 1.00, 1020, 1030);
    new ElementAnimation("section-11__pretitle", "opacity", 0.0, 1.0, 1020, 1030);
    new ElementAnimation("section-11__pretitle", "margin-left", 50, 0, 1020, 1030);
    new ElementAnimation("section-11__title", "opacity", 0.0, 1.0, 1020, 1030);
    new ElementAnimation("section-11__title", "margin-left", 50, 0, 1020, 1030);
    new ElementAnimation("section-11__text", "opacity", 0.0, 1.0, 1020, 1030);
    new ElementAnimation("section-11__text", "margin-left", 50, 0, 1020, 1030);
    new ElementAnimation("section-11__bardetails", "opacity", 0.0, 1.0, 1020, 1030);
    new ElementAnimation("section-11__bardetails", "margin-left", 75, 0, 1020, 1030);
    new ElementAnimation("section-11__note", "opacity", 0.0, 1.0, 1020, 1030);
    new ElementAnimation("section-11__note", "margin-left", 75, 0, 1020, 1030);

    new ElementAnimation("section-11", "opacity", 1.0, 0.0, 1190, 1200);
    //
    //


    new ElementAnimation("section-12__background", "opacity", 0.0, 1.0, 1200, 1210);
    new ElementAnimation("section-12__image", "scale", 0, 0.975, 1200, 1210);
    new ElementAnimation("section-12__image", "scale", 0.975, 1.0, 1200, 1210);
    new ElementAnimation("section-12__image", "margin-left", -60, 0, 1200, 1210);
    new ElementAnimation("section-12__image", "opacity", 0.0, 1.0, 1200, 1210);
    new ElementAnimation("section-12__imageshorttext", "opacity", 0.0, 1.0, 1200, 1210);
    new ElementAnimation("section-12__title", "opacity", 0.0, 1.0, 1200, 1220);
    new ElementAnimation("section-12__title", "margin-left", 50, 0, 1200, 1210);
    new ElementAnimation("section-12__text", "opacity", 0.0, 1.0, 1200, 1210);
    new ElementAnimation("section-12__text", "margin-left", 50, 0, 1200, 1210);


    new ElementAnimation("section-12", "opacity", 1.0, 0.0, 1295, 1300);


    // new ElementAnimation("section-13", "opacity", 0.0, 1.0, 1295, 1300);
    new ElementAnimation("section-13__total-wrapper", "opacity", 0.0, 1.0, 1290, 1300);


    // Continue here
    var barTotalTargets = [1210913.86, 425331.00, 1355833.32, 286628.00, 1154662.86, 602108.93, 614895.00, 839742.44, 7000000];
    var barTotals = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    var updateBarCallback = function (barIndex, sp, ssta, ssto) {
        barTotals[barIndex - 1] = barTotalTargets[barIndex - 1] * ((sp - ssta) / (ssto - ssta));

        //updateTotalTimeout = setTimeout(function() {
        document.getElementsByClassName("section-13__total-wrapper")[0].innerHTML = '$' + barAmount();


        //}, 25);
    };


    var barAmount = function () {
        var totalString = Math.round(barTotals.reduce((a, b) => a + b, 0)).toLocaleString();

        if (totalString == "0")
            totalString = "-";

        return totalString;
    }

    const p1 = "https://saaf-covid.mystagingwebsite.com/wp-content/uploads/2021/09/NestedPieChartsCovid_ForDigital-01@2x.png"
    const p2 = "https://saaf-covid.mystagingwebsite.com/wp-content/uploads/2021/09/NestedPieChartsCovid_ForDigital-02@2x.png"
    const p3 = "https://saaf-covid.mystagingwebsite.com/wp-content/uploads/2021/09/NestedPieChartsCovid_ForDigital-03@2x.png"
    const p4 = "https://saaf-covid.mystagingwebsite.com/wp-content/uploads/2021/09/NestedPieChartsCovid_ForDigital-04@2x.png"
    const p5 = "https://saaf-covid.mystagingwebsite.com/wp-content/uploads/2021/09/NestedPieChartsCovid_ForDigital-05@2x.png"
    const p6 = "https://saaf-covid.mystagingwebsite.com/wp-content/uploads/2021/09/NestedPieChartsCovid_ForDigital-06@2x.png"
    const p7 = "https://saaf-covid.mystagingwebsite.com/wp-content/uploads/2021/09/NestedPieChartsCovid_ForDigital-07@2x.png"
    const p8 = "https://saaf-covid.mystagingwebsite.com/wp-content/uploads/2021/10/pie8.png"


    new ElementAnimation("section-13__bar bar-8", "opacity", 0.0, 1.0, 1395, 1400, function (sp, ssta, ssto) {
        updateBarCallback(9, sp, ssta, ssto);
    });
    new ElementAnimation("section-13__bar bar-8", "opacity", 0.0, 1.0, 1390, 1400, function (sp, ssta, ssto) {
        updateBarCallback(8, sp, ssta, ssto);
    });
    new ElementAnimation("section-13__bar bar-7", "opacity", 0.0, 1.0, 1380, 1390, function (sp, ssta, ssto) {
        updateBarCallback(7, sp, ssta, ssto);
    });
    new ElementAnimation("section-13__bar bar-6", "opacity", 0.0, 1.0, 1370, 1380, function (sp, ssta, ssto) {
        updateBarCallback(6, sp, ssta, ssto);
    });
    new ElementAnimation("section-13__bar bar-5", "opacity", 0.0, 1.0, 1360, 1370, function (sp, ssta, ssto) {
        updateBarCallback(5, sp, ssta, ssto);
    });
    new ElementAnimation("section-13__bar bar-4", "opacity", 0.0, 1.0, 1340, 1360, function (sp, ssta, ssto) {
        updateBarCallback(4, sp, ssta, ssto);
    });
    new ElementAnimation("section-13__bar bar-3", "opacity", 0.0, 1.0, 1330, 1340, function (sp, ssta, ssto) {
        updateBarCallback(3, sp, ssta, ssto);
    });
    new ElementAnimation("section-13__bar bar-2", "opacity", 0.0, 1.0, 1315, 1330, function (sp, ssta, ssto) {
        updateBarCallback(2, sp, ssta, ssto);
    });
    new ElementAnimation("section-13__bar bar-1", "opacity", 0.0, 1.0, 1295, 1315, function (sp, ssta, ssto) {
        updateBarCallback(1, sp, ssta, ssto);
    });

    new ElementAnimation("section-13__bar bar-8", "background-image", p8, p8, 1390, 1400);
    new ElementAnimation("section-13__bar bar-7", "background-image", p7, p7, 1380, 1390);
    new ElementAnimation("section-13__bar bar-6", "background-image", p6, p6, 1370, 1380);
    new ElementAnimation("section-13__bar bar-5", "background-image", p5, p5, 1360, 1370);
    new ElementAnimation("section-13__bar bar-4", "background-image", p5, p5, 1340, 1360);
    new ElementAnimation("section-13__bar bar-3", "background-image", p3, p4, 1330, 1340);
    new ElementAnimation("section-13__bar bar-2", "background-image", p1, p2, 1315, 1330);
    new ElementAnimation("section-13__bar bar-1", "background-image", p1, p1, 1295, 1315);

    new ElementAnimation("section-13__total", "opacity", 1.0, 0.0, 1428, 1430);

    new ElementAnimation("section-13", "opacity", 1.0, 0.0, 1428, 1440);

    new ElementAnimation("section-16__background", "opacity", 0.0, 1.0, 1440, 1450);
    new ElementAnimation("section-16__background", "background-position", 50, -35, 1450, 1488);
    new ElementAnimation("section-16__background", "margin-left", 0, 80, 1460, 1480);
    new ElementAnimation("section-16__background", "scale", 1.0, 2, 1450, 1490);

    new ElementAnimation("section-16__background", "background-position", -40, 90, 1510, 1520);
    // new ElementAnimation("section-16__background", "scale", 1.0, 3.50, 1500, 1520);
    new ElementAnimation("section-16__pretitle", "opacity", 0.0, 1.0, 1540, 1550);
    new ElementAnimation("section-16__pretitle", "margin-left", 50, 0, 1515, 1545);

    //background filter at text
    new ElementAnimation("section-16__background", "background-filter", 0, 1, 1540, 1550);

    new ElementAnimation("section-16__title", "opacity", 0.0, 1.0, 1540, 1550);
    new ElementAnimation("section-16__title", "margin-left", 50, 0, 1530, 1560);
    new ElementAnimation("section-16", "opacity", 1.0, 0.0, 1580, 1600);


    new ElementAnimation("section-17__background", "opacity", 0.0, 1.0, 1610, 1620);

    new ElementAnimation("section-17", "opacity", 1.0, 0.0, 1780, 1790);
    new ElementAnimation("tab-1", "opacity", 1.0, 0.0, 1780, 1790);


    new ElementAnimation("section-19__background", "opacity", 0.0, 1.0, 1780, 1790);
    new ElementAnimation("section-19__title", "margin-left", 50, 0, 1820, 1850);
    new ElementAnimation("section-19__text", "opacity", 0.0, 1.0, 1805, 1812);
    new ElementAnimation("section-19__text", "margin-left", 50, 0, 1820, 1850);
    new ElementAnimation("section-19__pretitle", "opacity", 0.0, 1.0, 1815, 1820);
    new ElementAnimation("section-19__pretitle", "margin-left", 50, 0, 1815, 1850);
    new ElementAnimation("section-19__links", "opacity", 0.0, 1.0, 1850, 1860);
    new ElementAnimation("section-19", "opacity", 1.0, 0.0, 1890, 1900);


    new ElementAnimation("section-20__background", "opacity", 0.0, 1.0, 1900, 1910);
    new ElementAnimation("section-20__pretitle", "opacity", 0.0, 1.0, 1901, 1910);
    new ElementAnimation("section-20__pretitle", "margin-left", 50, 0, 1900, 1910);
    new ElementAnimation("section-20__title", "opacity", 0.0, 1.0, 1905, 1910);
    new ElementAnimation("section-32__donate", "opacity", 0.0, 1.0, 1920, 1930);
    new ElementAnimation("section-20__link", "opacity", 0.0, 1.0, 1920, 1930);
    new ElementAnimation("button-next-slide-section-20", "opacity", 0.0, 1.0, 1920, 1930);

    new ElementAnimation("section-20__title", "margin-left", 50, 0, 1905, 1915);
    new ElementAnimation("section-20__text", "opacity", 0.0, 1.0, 1910, 1920);
    new ElementAnimation("section-20__text", "margin-left", 50, 0, 1910, 1920);


    ElementAnimation.setScrollDummyHeight();

    // Load page
    document.getElementsByClassName("header-top")[0].classList.remove("hidden");

    setTimeout(function () {

        document.getElementsByTagName("body")[0].classList.add("page-loaded");

    }, 1);


    // Update animations on scroll

    var elementPropertyCount = undefined, elementPropertyIndex = undefined,
        elementAnimationObject = undefined,
        firstAnimationObject = undefined, activeAnimationObject = undefined, completedAnimationObject = undefined;

    window.addEventListener('scroll', function (e) {

        //numbers in console (scroll position)
        // console.log(window.pageYOffset);

        var pageScrollPosition = window.pageYOffset;

        if (!ElementAnimation.scrollDisabled) {
            scrollElementAnimations(pageScrollPosition / ElementAnimation.scrollFactor);
        } else {
            scrollTo(ElementAnimation.scrollDisabledPosition, 50);
        }

    });

    function scrollElementAnimations(pageScrollPosition) {
        for (var elementIdentifier in ElementAnimation.createdAnimations) {

            if (ElementAnimation.createdAnimations.hasOwnProperty(elementIdentifier)) {

                for (var property in ElementAnimation.createdAnimations[elementIdentifier]) {

                    if (ElementAnimation.createdAnimations[elementIdentifier].hasOwnProperty(property)) {

                        elementPropertyCount = ElementAnimation.createdAnimations[elementIdentifier][property].length;

                        firstAnimationObject = undefined, activeAnimationObject = undefined, completedAnimationObject = undefined;

                        for (elementPropertyIndex = 0; elementPropertyIndex < elementPropertyCount; elementPropertyIndex++) {
                            elementAnimationObject = ElementAnimation.createdAnimations[elementIdentifier][property][elementPropertyIndex];

                            // range greater than stop
                            if (pageScrollPosition > elementAnimationObject.scrollStopOffset) {
                                completedAnimationObject = elementAnimationObject;
                                completedAnimationObject.update(completedAnimationObject.scrollStopOffset); // there may be callback functions from one or more animations of the same property
                            }
                            // range start - stop
                            else if (pageScrollPosition >= elementAnimationObject.scrollStartOffset) {
                                activeAnimationObject = elementAnimationObject;
                                break;
                            }
                        }

                        if (activeAnimationObject != undefined) {
                            activeAnimationObject.update(pageScrollPosition);
                        } else {
                            if (completedAnimationObject != undefined) {
                                //completedAnimationObject.update(completedAnimationObject.scrollStopOffset); // there may be callback functions from one or more animations of the same property
                            } else {
                                firstAnimationObject = ElementAnimation.createdAnimations[elementIdentifier][property][0];
                                firstAnimationObject.update(firstAnimationObject.scrollStartOffset);
                            } /* else {
								if (element.active)
									removeClass
		                    } */

                            // Dirty
                            var inactivePageRangeThreshold = 3;
                            var test = ((window.innerHeight * inactivePageRangeThreshold) * ElementAnimation.scrollFactor);

                            if (Math.abs(elementAnimationObject.scrollStartOffset - pageScrollPosition) < test ||
                                Math.abs(elementAnimationObject.scrollStopOffset - pageScrollPosition) < test)
                                elementAnimationObject.container.classList.remove("inactive"); // display: block
                            else
                                elementAnimationObject.container.classList.add("inactive"); // display: none
                        }
                    }
                }
            }
        }
    }

    function getLastScrollAnimation() {

        var lastElement = undefined;

        for (var elementIdentifier in ElementAnimation.createdAnimations) {

            if (ElementAnimation.createdAnimations.hasOwnProperty(elementIdentifier)) {

                for (var property in ElementAnimation.createdAnimations[elementIdentifier]) {

                    if (ElementAnimation.createdAnimations[elementIdentifier].hasOwnProperty(property)) {

                        elementPropertyCount = ElementAnimation.createdAnimations[elementIdentifier][property].length;

                        for (elementPropertyIndex = 0; elementPropertyIndex < elementPropertyCount; elementPropertyIndex++) {
                            elementAnimationObject = ElementAnimation.createdAnimations[elementIdentifier][property][elementPropertyIndex];

                            if (lastElement == undefined)
                                lastElement = elementAnimationObject;

                            else if (lastElement.scrollStopOffset < elementAnimationObject.scrollStopOffset)
                                lastElement = elementAnimationObject;
                        }
                    }
                }
            }
        }

        return lastElement;
    }

    var quotesContainer = document.getElementsByClassName("section-2a__quoter")[0];

    var quoteIndex = 0;

    // Main cycle duration (not the entire duration though. total duration: cycle duration + transition duration
    function cycleQuotesRecursively() {
        var quotes = quotesContainer.getElementsByClassName("quote");
        setTimeout(function () {
            quotesContainer.style.opacity = 0.0;
            quotes[quoteIndex].classList.remove("active");

            quoteIndex++;

            if (quoteIndex >= quotes.length)
                quoteIndex = 0;

            // Transition duration
            setTimeout(function () {
                // quoteParagraph.innerHTML = quotesDictionary[quoteIndex].p;

                // quoteSpan.innerHTML = quotesDictionary[quoteIndex].span;

                quotesContainer.style.opacity = 1.0;
                quotes[quoteIndex].classList.add("active");

                cycleQuotesRecursively();

            }, 900);

        }, 6100);
    }

    cycleQuotesRecursively();

    /*
        Comma seperated list of class names. or a single class name
    */
    function toggle(query) {

        var toggleElements = document.querySelectorAll(query);

        for (var i = 0; i < toggleElements.length; i++) {
            if (!toggleElements[i].classList.contains("toggle")) {
                toggleElements[i].classList.add("toggle");
                ElementAnimation.scrollDisabled = false;
                ElementAnimation.scrollDisabledPosition = window.pageYOffset;
            } else {
                toggleElements[i].classList.remove("toggle");
                ElementAnimation.scrollDisabled = false;
            }
            // remove class
        }
    }

    document.querySelectorAll("[data-toggle]").forEach(item => {
        item.addEventListener('click', event => {
            var query = item.getAttribute("data-toggle");

            setTimeout(function () {
                toggle(item.getAttribute("data-toggle"));

            }, 15);
        });
    });


    document.getElementsByClassName("button-arrow-red-section-1")[0].addEventListener('click', function () {
        scrollTo(window.innerHeight * 2.2, 500);
    });

    document.querySelectorAll("[data-offset]").forEach(item => {
        item.addEventListener('click', event => {
            // (parseInt(event.srcElement.getAttribute("data-section")) - 1)

            var scrollToPosition = (parseInt(event.srcElement.getAttribute("data-offset")) / 100) * window.innerHeight;
            ElementAnimation.scrollDisabled = false;
            scrollTo(scrollToPosition, 500);
            // console.log(window.pageYOffset);
            event.preventDefault();
        });

    });

    // jQuery scrollTo in vanilla JS
    // https://gist.github.com/andjosh/6764939
    function scrollTo(to, duration) {
        var start = window.pageYOffset,
            change = to - start,
            currentTime = 0,
            increment = 20;

        var animateScroll = function () {
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime, start, change, duration);
            window.scroll(0, val); // Edited for use with scroll-dummy-overlay
            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }

    Math.easeInOutQuad = function (t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };


    // all custom jQuery will go here


    jQuery(document).ready(function ($) {
        console.log("working jquery")

        //close when clicking off-screen timeline area
        $(".nav-link").click(function () {
            $("section").removeClass("toggle")
        })

        //close when clicking off-screen map area
        $(".nav-link").click(function () {
            $(".modal").removeClass("show")
        })

        // next $button(x).onclick(this.class + 1).addClass("toggle").


        let switchClass = "show active";
        $("#tab-next-1").click(function () {
            // const $p1 = $(".nav-link.s17");
            //switches classes
            $("#pill2").addClass(switchClass)
            $("#pill1").toggleClass(switchClass);
            $(".img1").removeClass("active");


            //make selected tab bubble stay scaled and in color
            $(".img1").css("transform", "scale(1");
            $(".img1").css("filter", "grayscale(100%)");
            $(".img2").css("transform", "scale(1.3)")
            $(".img2").css("filter", "none")


        })

        $("#tab-next-2").click(function () {
            $("#pill3").addClass(switchClass)
            $("#pill2").toggleClass(switchClass)

            $(".img2").css("transform", "scale(1");
            $(".img2").css("filter", "grayscale(100%)");
            $(".img3").css("transform", "scale(1.3)")
            $(".img3").css("filter", "none")

        })
        $("#tab-next-3").click(function () {
            $("#pill4").addClass(switchClass)
            $("#pill3").toggleClass(switchClass)

            $(".img3").css("transform", "scale(1");
            $(".img3").css("filter", "grayscale(100%)");
            $(".img4").css("transform", "scale(1.3)")
            $(".img4").css("filter", "none")
        })
        $("#tab-next-4").click(function () {
            $("#pill5").addClass(switchClass)
            $("#pill4").toggleClass(switchClass)
            $(".img4").css("transform", "scale(1");
            $(".img4").css("filter", "grayscale(100%)");
            $(".img5").css("transform", "scale(1.3)")
            $(".img5").css("filter", "none")
        })
        $("#tab-next-5").click(function () {
            $("#pill6").addClass(switchClass)
            $("#pill5").toggleClass(switchClass)
            $(".img5").css("transform", "scale(1");
            $(".img5").css("filter", "grayscale(100%)");
            $(".img6").css("transform", "scale(1.3)")
            $(".img6").css("filter", "none")
        })
        $("#tab-next-6").click(function () {
            $("#pill7").addClass(switchClass)
            $("#pill6").toggleClass(switchClass)
            $(".img6").css("transform", "scale(1");
            $(".img6").css("filter", "grayscale(100%)");
            $(".img7").css("transform", "scale(1.3)")
            $(".img7").css("filter", "none")
        })
        //keep tab images in color and scaled
        const $tabImg = $(".nav-link.s17");

        $tabImg.click(function () {
            $tabImg.css("transform", "scale(1)")
            $tabImg.css("filter", "grayscale(100%)");
            $(this).css("transform", "scale(1.3");
            $(this).css("filter", "none");

        })

        // add/remove pulsing button


        $(".img2").click(function () {
            $(".img2").removeClass("pulse-button")
        })


        //keep page from refreshing to top
        $(window).on('unload', function () {
            $(window).scrollTop(0);
            console.log("top")
        });


        //keep hover state on timelime images
        const $timelineImg = $(".nav-link.s9");


        //sets the initial active hover state(march in this case, can be changed in the timeline html "active")
        $('.timeline-wrapper button').each(function () {
                if ($(this).hasClass('active')) {
                    $(this).css("transform", "scale(1.3");
                    $(this).css("background-color", "#ef7930");
                }
            }
        )

        $timelineImg.click(function () {
            $timelineImg.css("transform", "scale(1");
            $timelineImg.css("background-color", "#f2c8b1");
            $(this).css("transform", "scale(1.3");
            $(this).css("background-color", "#ef7930");

        })


        $("#myTab a:last").tab("show"); // show last tab


    });
});





