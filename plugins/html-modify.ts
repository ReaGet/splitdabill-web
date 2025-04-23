import { parseHTML } from 'linkedom'
import { PluginOption } from 'vite'
import { getSvgFrom } from '../src/js/shared/dom'
import { addVersionTo, updateSrcLang } from '../src/js/shared/utils'


export const HtmlModify = (): PluginOption => ({
  name: 'html-modify',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    async handler(html) {
      const { document } = parseHTML(html)
      modifyItems(document)
      replaceLangSwitcherElWithPHPBlock(document)
      modifyImgsSrc(document)
      modifyLink(document)
      modifySvgLink(document)
      return prependPHPBlock(document) 
    },
  },
})

const modifyItems = (document: Document) => {
  const items = document.querySelectorAll('[data-i18]')
  items.forEach(modifyItem)
}

const modifyItem = (item: Element) => {
  const key = item.getAttribute('data-i18')!

  if (item.tagName === 'META')
    transformMeta(item, key)
  else
    transformElement(item, key)
}

const transformMeta = (item: Element, key: string) => {
  item.setAttribute('content', geti18String(key))
}

const transformElement = (item: Element, key: string) => {
  item.innerHTML = getSvgFrom(item)
  item.append(geti18String(key))
}

const modifyImgsSrc = (document: Document) => {
  const imgs: NodeListOf<HTMLImageElement> = document.querySelectorAll('[data-i18-img]');
  imgs.forEach(i => {
    i.src = updateSrcLang(i.src, '<?php echo $i18->getLang() ?>')
  })
}

const modifyLink = (document: Document) => {
  const links = document.querySelectorAll('link')
  links.forEach(l => {
    l.href = addVersionTo(l.href)
  })
}

const modifySvgLink = (document: Document) => {
  const svgUses = document.querySelectorAll('svg use')
  svgUses.forEach(s => {
    const link = s.getAttribute('xlink:href')!
    s.setAttribute('xlink:href', addVersionTo(link))
  })
}

const replaceLangSwitcherElWithPHPBlock = (document: Document) => {
  const root = document.querySelector('.lang-switcher')
  root?.replaceWith(`<?php echo $langSwitcher->render(); ?>`)
}

const geti18String = (key: string): string => {
  return `<?= $i18->__('${key}') ?>`
}

const prependPHPBlock = (document: Document) => {
  return `<?php require_once './autoload.php'; ?>
${modifyBrackets(document)}
  `
}

const modifyBrackets = (document: Document): string => {
  return document.toString().replaceAll('&lt;', '<').replaceAll('&gt;', '>')
}