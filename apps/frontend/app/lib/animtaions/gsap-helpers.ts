import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Fade in animation
export const fadeIn = (
  element: HTMLElement | string,
  delay = 0,
  duration = 0.6
) => {
  return gsap.from(element, {
    opacity: 0,
    y: 30,
    duration,
    delay,
    ease: 'power3.out'
  });
};

// Staggered fade in for multiple elements
export const staggerFadeIn = (
  elements: HTMLElement[] | string,
  staggerTime = 0.1,
  delay = 0,
  duration = 0.6
) => {
  return gsap.from(elements, {
    opacity: 0,
    y: 30,
    duration,
    delay,
    stagger: staggerTime,
    ease: 'power3.out'
  });
};

// Scale animation on hover
export const scaleOnHover = (
  element: HTMLElement | string,
  scaleAmount = 1.05
) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return gsap.timeline(); // return empty timeline safely

  const tl = gsap.timeline({ paused: true });
  tl.to(el, {
    scale: scaleAmount,
    duration: 0.3,
    ease: 'power2.out'
  });

  return tl;
};

// Parallax scroll effect
export const parallaxScroll = (
  element: HTMLElement | string,
  distance = 100,
  trigger: HTMLElement | string = element
) => {
  return gsap.to(element, {
    y: distance,
    scrollTrigger: {
      trigger,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
};

// Text reveal animation (expects each character to have class `.char`)
export const textReveal = (
  element: HTMLElement | string,
  delay = 0
) => {
  const elements = gsap.utils.toArray<HTMLElement>(
    (typeof element === 'string' ? `${element} .char` : '.char')
  );

  return gsap.from(elements, {
    opacity: 0,
    y: 20,
    rotateX: -90,
    stagger: 0.02,
    delay,
    duration: 0.6,
    ease: 'power3.out'
  });
};

// Infinite carousel animation
export const infiniteCarousel = (
  track: HTMLElement | string,
  duration = 30
) => {
  const trackElement =
    typeof track === 'string' ? document.querySelector(track) : track;

  if (!trackElement) return;

  const elements = Array.from(trackElement.children) as HTMLElement[];

  const totalWidth = elements.reduce((width, el) => {
    const style = window.getComputedStyle(el);
    const marginRight = parseFloat(style.marginRight || '0');
    return width + el.offsetWidth + marginRight;
  }, 0);

  return gsap.to(trackElement, {
    x: `-=${totalWidth}`,
    duration,
    ease: 'none',
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth)
    }
  });
};
