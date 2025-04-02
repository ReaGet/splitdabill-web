import anime from 'animejs';

export const useAnimeOnEnter = (animationConfig, options = { threshold: 0.2 }) => {
  const elements = document.querySelectorAll(animationConfig.targets);

  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(({ isIntersecting,  target }) => {
      if (isIntersecting) {
        anime({
          ...animationConfig,
          targets: target,
        });
        observer.unobserve(target);
      }
    });
  }, options);

  elements.forEach((el) => observer.observe(el));
}