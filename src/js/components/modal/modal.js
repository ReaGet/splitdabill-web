import './style.css';

export class Modal {
  constructor() {
    this._createElements();
    this._bindEvents();
  }

  _createElements() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'modal-overlay';

    this.modal = document.createElement('div');
    this.modal.className = 'modal-content';

    this.closeButton = document.createElement('button');
    this.closeButton.className = 'modal-close';
    this.closeButton.innerHTML = '&times;';

    this.contentWrapper = document.createElement('div');
    this.contentWrapper.className = 'modal-body';

    this.modal.appendChild(this.closeButton);
    this.modal.appendChild(this.contentWrapper);
    this.overlay.appendChild(this.modal);
  }

  _bindEvents() {
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) this.close();
    });

    this.closeButton.addEventListener('click', () => this.close());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }

  open(content) {
    this.setContent(content);
    document.body.appendChild(this.overlay);
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
      document.body.style.overflow = '';
    }
  }

  setContent(content) {
    this.contentWrapper.innerHTML = '';
    if (typeof content === 'string') {
      this.contentWrapper.innerHTML = content;
    } else {
      this.contentWrapper.appendChild(content);
    }
  }
}
