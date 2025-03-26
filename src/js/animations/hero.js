import anime from 'animejs';

anime({
  targets: ['.hero__heading', '.hero__subheading', '.hero__stores'],
  translateX: [-150, 0],
  easing: 'easeInOutQuad',
  duration: 300,
  opacity: {
    value: [0, 1],
    duration: 400,
  },
  delay: anime.stagger(100),
});

anime({
  targets: '.hero__app-wrappper',
  duration: 500,
  backgroundColor: ['rgba(252, 208, 237, 0.2)', 'rgba(252, 208, 237, 1)'],
  easing: 'easeInOutCirc'
});

anime({
  targets: '.hero__app-img',
  translateY: [50, 0],
  duration: 500,
  easing: 'easeInOutBack',
});

anime({
  targets: '.hero__app-feature',
  delay: anime.stagger(50),
  duration: 500,
  easing: 'easeInOutBack',
  opacity: {
    value: [0, 1],
  },
  rotate: {
    value: [anime.random(-20, 20), 0],
  },
  translateY: {
    value: [100, 0],
  }
});