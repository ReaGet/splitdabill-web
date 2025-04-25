import 'modern-normalize';
import './css/style.css';
import './js/animations';
import './js/components/lang-switcher';
import { Modal } from './js/components/modal/modal';
import { langSwitcher } from './js/components/lang-switcher';

const modal = new Modal();

document.querySelectorAll(".hero__stores-item, .footer__nav-link").forEach(item => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    const content = langSwitcher.locale['MODAL_TEXT'];
    modal.open(
      content || 'Извините, приложение находится в стадии разработки. Пожалуйста, загляните к нам позже!'
    )
  })
});