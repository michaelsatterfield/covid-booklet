const DIRECTION_UP = "up";
const DIRECTION_DOWN = "down";
let direction = DIRECTION_DOWN;
let currentSection = 1;
let scrolling = false;
let sectionsAmount = 7;

window.addEventListener("DOMContentLoaded", event => {
  gsap.defaults({
    ease: "power2.out"
  });

  //headers defaults
  gsap.set(".header-left", {
    x: "-100%"
  });

  //first section defaults
  gsap.set(".section-1__image-1", {
    autoAlpha: 0
  });
  gsap.set(".section-1__text-1", {
    autoAlpha: 0
  });
  gsap.set(".section-1__text-2", {
    autoAlpha: 0
  });
  gsap.set(".button-arrow-red-section-1", {
    autoAlpha: 0
  });

  //second section defaults
  gsap.set(".section-2__text-1", {
    autoAlpha: 0
  });
  gsap.set(".section-2__text-2", {
    autoAlpha: 0
  });
  gsap.set(".section-2__text-3", {
    autoAlpha: 0
  });
  gsap.set(".section-2__text-4", {
    autoAlpha: 0
  });
  gsap.set(".button-next-slide-section-2", {
    autoAlpha: 0
  });

  const firstSectionAppearTimeline = gsap.timeline({
    paused: true
  });
  const firstSectionShowTimeline = gsap.timeline({
    paused: true
  });
  const firstSectionHideTimeline = gsap.timeline({
    paused: true
  });

  const secondSectionShowTimeline = gsap.timeline({
    paused: true
  });
  const secondSectionHideTimeline = gsap.timeline({
    paused: true
  });

  const thirdSectionShowTimeline = gsap.timeline({
    paused: true
  });
  const thirdSectionHideTimeline = gsap.timeline({
    paused: true
  });

  const forthSectionShowTimeline = gsap.timeline({
    paused: true
  });
  const forthSectionHideTimeline = gsap.timeline({
    paused: true
  });

  const fifthSectionShowTimeline = gsap.timeline({
    paused: true
  });
  const fifthSectionHideTimeline = gsap.timeline({
    paused: true
  });

  const sixthSectionShowTimeline = gsap.timeline({
    paused: true
  });
  const sixthSectionHideTimeline = gsap.timeline({
    paused: true
  });

  const seventhSectionShowTimeline = gsap.timeline({
    paused: true
  });
  const seventhSectionHideTimeline = gsap.timeline({
    paused: true
  });

  function detectMouseWheelDirection(e) {
    let delta = null;
    if (!e) {
      e = window.event;
    }
    if (e.wheelDelta) {
      delta = e.wheelDelta / 60;
    } else if (e.detail) {
      delta = -e.detail / 2;
    }
    if (delta !== null) {
      direction = delta > 0 ? DIRECTION_UP : DIRECTION_DOWN;
    }
  }

  function detectScrollOportunity() {
    if (direction === DIRECTION_DOWN && currentSection >= sectionsAmount) {
      return false;
    }
    if (direction === DIRECTION_UP && currentSection < 0) {
      return false;
    }
    return true;
  }

  function isMobileDevice() {
    let isMobile = false;
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        navigator.userAgent.substr(0, 4)
      )
    ) {
      isMobile = true;
    }
    return isMobile;
  }

  async function scrollUp() {
    switch (currentSection) {
      case 1:
        scrolling = false;
        break;
      case 2:
        await Promise.resolve(
          secondSectionHideTimeline
          .to(".section-2", {
            duration: 0.3,
            autoAlpha: 0
          })
          .to(".header-left", {
            duration: 0.3,
            autoAlpha: 0
          }, "<")
          .play()
        );
        await Promise.resolve(
          firstSectionShowTimeline
          .to(".section-1", {
            duration: 0.3,
            autoAlpha: 1
          })
          .to(".header-top", {
            duration: 0.3,
            autoAlpha: 1
          }, "<")
          .play()
        );
        currentSection -= 1;
        scrolling = false;
        break;
      case 3:
        await Promise.resolve(
          thirdSectionHideTimeline
          .to(".section-3", {
            duration: 0.3,
            autoAlpha: 0
          })
          .play()
        );
        await Promise.resolve(
          secondSectionShowTimeline
          .to(".section-2", {
            duration: 0.3,
            autoAlpha: 1
          })
          .play()
        );

        currentSection -= 1;
        scrolling = false;
        break;
      case 4:
        await Promise.resolve(
          forthSectionHideTimeline
          .to(".section-4", {
            duration: 0.3,
            autoAlpha: 0
          })
          .play()
        );
        await Promise.resolve(
          thirdSectionShowTimeline
          .to(".section-3", {
            duration: 0.3,
            autoAlpha: 1
          })
          .play()
        );

        currentSection -= 1;
        scrolling = false;
        break;
      case 5:
        await Promise.resolve(
          fifthSectionHideTimeline
          .to(".section-5", {
            duration: 0.3,
            autoAlpha: 0
          })
          .play()
        );
        await Promise.resolve(
          forthSectionShowTimeline
          .to(".section-4", {
            duration: 0.3,
            autoAlpha: 1
          })
          .play()
        );

        currentSection -= 1;
        scrolling = false;
        break;
      case 6:
        await Promise.resolve(
          sixthSectionHideTimeline
          .to(".section-6", {
            duration: 0.3,
            autoAlpha: 0
          })
          .play()
        );
        await Promise.resolve(
          fifthSectionShowTimeline
          .to(".section-5", {
            duration: 0.3,
            autoAlpha: 1
          })
          .play()
        );

        currentSection -= 1;
        scrolling = false;
        break;
      case 7:
        await Promise.resolve(
          sixthSectionHideTimeline
          .to(".section-7", {
            duration: 0.3,
            autoAlpha: 0
          })
          .play()
        );
        await Promise.resolve(
          fifthSectionShowTimeline
          .to(".section-6", {
            duration: 0.3,
            autoAlpha: 1
          })
          .play()
        );

        currentSection -= 1;
        scrolling = false;
        break;
      default:
        scrolling = false;
        break;
    }
  }
  async function scrollDown() {
    switch (currentSection) {
      case 1:
        await Promise.resolve(
          firstSectionHideTimeline
          .to(".section-1", {
            duration: 1,
            autoAlpha: 0
          })
          .to(".header-top", {
            duration: 1,
            autoAlpha: 0
          }, "<")
          .play()
        );
        await Promise.resolve(
          secondSectionShowTimeline
          .addLabel("start")
          .to(".section-2__text-1", {
            duration: 3,
            autoAlpha: 1
          })
          .to(".header-left", {
            duration: 1,
            x: "0%"
          }, "<+=0.2")
          .play()
        );

        scrolling = false;
        currentSection += 1;
        break;
      case 2:
        await Promise.resolve(
          secondSectionHideTimeline
          .to(".section-2", {
            duration: 0.3,
            autoAlpha: 0
          })
          .play()
        );
        await Promise.resolve(
          thirdSectionShowTimeline
          .to(".section-3", {
            duration: 0.3,
            autoAlpha: 1
          })
          .play()
        );

        currentSection += 1;
        scrolling = false;
        break;
      case 3:
        await Promise.resolve(
          thirdSectionHideTimeline
          .to(".section-3", {
            duration: 0.3,
            autoAlpha: 0
          })
          .play()
        );
        await Promise.resolve(
          forthSectionShowTimeline
          .to(".section-4", {
            duration: 0.3,
            autoAlpha: 1
          })
          .play()
        );

        scrolling = false;
        currentSection += 1;
        break;
      case 4:
        await Promise.resolve(
          forthSectionHideTimeline
          .to(".section-4", {
            duration: 0.3,
            autoAlpha: 0
          })
          .play()
        );
        await Promise.resolve(
          fifthSectionShowTimeline
          .to(".section-5", {
            duration: 0.3,
            autoAlpha: 1
          })
          .play()
        );

        scrolling = false;
        currentSection += 1;
        break;
      case 5:
        await Promise.resolve(
          fifthSectionHideTimeline
          .to(".section-5", {
            duration: 0.3,
            autoAlpha: 0
          })
          .play()
        );
        await Promise.resolve(
          sixthSectionShowTimeline
          .to(".section-6", {
            duration: 0.3,
            autoAlpha: 1
          })
          .play()
        );

        scrolling = false;
        currentSection += 1;
        break;
      case 6:
        await Promise.resolve(
          fifthSectionHideTimeline
          .to(".section-6", {
            duration: 0.3,
            autoAlpha: 0
          })
          .play()
        );
        await Promise.resolve(
          sixthSectionShowTimeline
          .to(".section-7", {
            duration: 0.3,
            autoAlpha: 1
          })
          .play()
        );

        scrolling = false;
        currentSection += 1;
        break;
      case 7:
        scrolling = false;
        break;
      default:
        scrolling = false;
        break;
    }
  }

  function scrollSection() {
    if (!detectScrollOportunity()) {
      scrolling = false;
      return;
    }
    if (direction === DIRECTION_DOWN) {
      scrollDown();
    }
    if (direction === DIRECTION_UP) {
      scrollUp();
    }
  }

  if (!isMobileDevice()) {
    setTimeout(async () => {
      scrolling = true;

      firstSectionAppearTimeline
        .addLabel("start")
        .to(".section-1__image-1", {
          duration: 1,
          autoAlpha: 1
        })
        .to(".header-top", {
          duration: 1,
          autoAlpha: 1
        })
        .to(".section-1__image-1", {
          duration: 1,
          filter: "grayscale(0)"
        })
        .to(".section-1__wrapper", {
          duration: 10,
          x: -25
        }, "<")
        .to(".section-1__text-1", {
          duration: 2,
          autoAlpha: 1
        }, "<")
        .to(".section-1__text-2", {
          duration: 2,
          autoAlpha: 1
        }, "<+=0.3")
        .to(
          ".button-arrow-red-section-1", {
            duration: 1,
            autoAlpha: 1
          },
          "<+=1"
        )
        .to(".section-1__image-1", {
          duration: 10,
          scale: 1.1
        }, "start")
        .to(".section-1__text-2", {
          duration: 10,
          x: -10
        }, "start+=1")
        .play();
      setTimeout(() => {
        scrolling = false;
      }, 3000);
    }, 1000);

    window.onmousewheel = function (e) {
      if (!scrolling) {
        scrolling = true;
        detectMouseWheelDirection(e);
        scrollSection();
      }
    };
    window.addEventListener("DOMMouseScroll", e => {
      if (!scrolling) {
        scrolling = true;
        detectMouseWheelDirection(e);
        scrollSection();
      }
    });
  } else {}
});