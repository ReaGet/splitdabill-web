import '../../css/components/dropdown.css';

export class Dropdown {
  constructor(root) {
    this.root = root;
    this.opened = false;
    this.bind();
  }

  bind() {
    document.addEventListener('click', ({ target }) => {
      this.handleClick(target);
    });
    document.addEventListener('keydown', ({ key }) => {
      if (key === 'Escape') this.close();
    });
  }
  /**
   * 
   * @param {HTMLElement} el 
   */
  handleClick(el) {
    const currentItem = el.classList.contains('dropdown-current'),
      newItem = el.classList.contains('dropdown-item');
    if (currentItem || newItem) {
      this.toggle();
    }
    if (newItem) {
      this.setNewItemActive(el);
    }
    this.handleClickOutside(el);
  }
  /**
   * 
   * @param {HTMLElement} el 
   */
  handleClickOutside(el) {
    const root = el.closest('.dropdown');
    if (!root) this.close();
  }

  toggle() {
    if (this.opened) this.close();
    else this.open();
  }

  open() {
    this.opened = true;
    this.root.classList.add('js-active');
  }

  close() {
    this.opened = false;
    this.root.classList.remove('js-active');
  }
  /**
   * 
   * @param {HTMLElement} el  
   */
  setNewItemActive(el) {
    this.items.forEach(i => i.classList.remove('js-active'));
    el.classList.add('js-active');
  }

  get items() {
    return [...this.root.querySelectorAll('.dropdown-item')];
  }

  get current() {
    return this.root.querySelector('.dropdown-current');
  }
}

// document.querySelectorAll('.dropdown').forEach(d => new Dropdown(d));