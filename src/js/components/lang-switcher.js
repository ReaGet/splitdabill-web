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
        this.setCurrentItemIcon(i);
      }
    });
  }

  get lang() {
    console.log(this.getCurrentLangFromQuery())
    return this.getCurrentLangFromQuery() || this.current.dataset.value;
  }

  getCurrentLangFromQuery() {
    return new URLSearchParams(location.search).get('lang');
  }

  setNewItemActive(el) {
    const lang = el.dataset.value;
    if (lang === this.lang) return;
    
    super.setNewItemActive(el);
    this.setCurrentItemIcon(el);
    this.updateContent(lang);
  }

  setCurrentItemIcon(el) {
    this.current.setAttribute('data-value', el.dataset.value);
    this.current.innerHTML = getSvgFrom(el) || el.dataset.value;
  }

  async updateContent(lang) {
    const locale = await this.fetchNewLocales(lang);
    this.applyLocaleToDOM(locale);
  }

  async fetchNewLocales(lang) {
    const cached = this.cachedLocales[lang];
    if (cached) return cached;

    try {
      const formData = new FormData();
      formData.append('get', lang);
      return await fetch('/', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: formData,
      }).then(res => res.json())
      return _locale;
    } catch(e) {
      console.log('[fetch locale]:', e);
      return {};
    }
  }

  applyLocaleToDOM(locale) {
    if (!locale) return;
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