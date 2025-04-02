import anime from 'animejs';
import { useAnimeOnEnter } from '../composables/useAnimeOnEnter';

useAnimeOnEnter({
  targets: ['.features .section__heading', '.features__block-heading', '.features__block-list__item', '.features__block .phone'],
  translateY: [50, 0],
  easing: 'easeInOutQuad',
  duration: 300,
  opacity: {
    value: [0, 1],
    duration: 400,
  },
  delay: anime.stagger(150),
});