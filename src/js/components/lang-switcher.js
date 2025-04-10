import { Dropdown } from './dropdown';
import _locale from '../shared/locale.json';

class LangSwitcher extends Dropdown {
  cachedLocales = {};
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
    const lang = el.dataset.value;
    this.current.setAttribute('data-value', lang);
    const newSvg = el.querySelector('svg');
    this.current.innerHTML = newSvg?.outerHTML || lang;
    this.updateContent(lang);
  }

  async updateContent(lang) {
    const locale = await this.fetchNewLocales(lang);
    this.applyLocaleToDOM(locale);
  }

  async fetchNewLocales(lang) {
    const cached = this.cachedLocales[lang];
    if (cached) return cached;

    try {
      return _locale;
    } catch(e) {
      console.log('[fetch locale]:', e);
    }
  }

  applyLocaleToDOM(locale) {
    const domItems = document.querySelectorAll('[data-i18]');
    domItems.forEach(d => {
      const key = d.dataset.i18,
        translation = locale[key];
      if (!translation) return;
      d.innerText = translation;
    });
  }
}

new LangSwitcher(document.querySelector('.lang-switcher'));