import anime from 'animejs';
import { useAnimeOnEnter } from '../composables/useAnimeOnEnter';

useAnimeOnEnter({
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


useAnimeOnEnter({
  targets: '.hero__app-wrappper',
  duration: 500,
  backgroundColor: ['rgba(252, 208, 237, 0.2)', 'rgba(252, 208, 237, 1)'],
  easing: 'easeInOutCirc'
});

useAnimeOnEnter({
  targets: '.hero__app-img',
  translateY: [50, 0],
  duration: 500,
  easing: 'easeInOutBack',
});

useAnimeOnEnter({
  targets: '.hero__app-feature',
  delay: anime.stagger(150),
  duration: 500,
  easing: 'easeInOutBack',
  opacity: {
    value: [0, 1],
  },
  rotate: {
    value: [anime.random(-20, 20), 0],
    delay: anime.stagger(100)
  },
  translateY: {
    value: [100, 0],
    delay: anime.stagger(100)
  }
});