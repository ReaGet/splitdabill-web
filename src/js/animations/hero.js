import gsap from 'gsap';

const tl = gsap.timeline({ defaults: {
  duration: 0.3,
  x: -40,
  opacity: 0
}});

tl.from('.hero__heading', {});

tl.from('.hero__subheading', {}, '-=0.2');

tl.from('.hero__stores', {
  duration: 0.3,
  x: -40,
  opacity: 0
}, '-=0.2');

gsap.from('.hero__app-wrappper', {
  duration: 0.5,
  backgroundColor: 'rgba(252, 208, 237, 0.2)'
});

gsap.from('.hero__app-img', {
  y: 50,
  duration: 0.5,
});

gsap.from('.hero__app-feature', {
  opacity: 0,
  rotate: 0,
  y: 50,
  delay: 0.5
})