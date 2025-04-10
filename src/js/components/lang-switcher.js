import { Dropdown } from "./dropdown";

class LangSwitcher extends Dropdown {
  constructor(root) {
    super(root);
    this.init();
  }

  init() {
    this.items.forEach(i => {
      if (i.dataset.value === this.current.dataset.value) {
        i.classList.add('js-active');
      }
    });
  }

  setNewItemActive(el) {
    super.setNewItemActive(el);
    this.current.setAttribute('data-value', el.dataset.value);
    const newSvg = el.querySelector('svg');
    this.current.innerHTML = newSvg?.outerHTML || el.dataset.value;
  }
}

new LangSwitcher(document.querySelector('.lang-switcher'));