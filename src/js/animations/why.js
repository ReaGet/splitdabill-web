import anime from 'animejs';
import { useAnimeOnEnter } from '../composables/useAnimeOnEnter';

useAnimeOnEnter({
  targets: ['.why .section__heading', '.why .section__subheading', '.why__list-item'],
  translateY: [50, 0],
  easing: 'easeInOutQuad',
  duration: 300,
  opacity: {
    value: [0, 1],
    duration: 400,
  },
  delay: anime.stagger(150),
});