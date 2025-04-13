import { Dropdown } from './dropdown'
import _locale from '../shared/locale.json'
import { getSvgFrom } from '../shared/dom'

class LangSwitcher extends Dropdown {
  cachedLocales = {};
  constructor(root) {
    super(root);
    this.init();
  }

  init() {
    this.items.forEach(i => {
      if (i.dataset.value === this.lang) {
        i.classList.add('js-active');
      }
    });
  }

  get lang() {
    return this.current.dataset.value;
  }

  setNewItemActive(el) {
    const lang = el.dataset.value;
    if (lang === this.lang) return;
    
    super.setNewItemActive(el);
    this.current.setAttribute('data-value', lang);
    this.current.innerHTML = getSvgFrom(el) || lang;
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
      d.innerHTML = `${getSvgFrom(d)}${translation}`;
    });
  }
}

new LangSwitcher(document.querySelector('.lang-switcher'));