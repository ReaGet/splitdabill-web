export const getSvgFrom = (parent: HTMLElement | Element): string => {
  const svg = parent.querySelector('svg');
  return svg?.outerHTML || '';
}