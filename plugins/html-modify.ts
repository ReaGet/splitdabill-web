import { parseHTML } from 'linkedom'
import { PluginOption } from 'vite'
import { getSvgFrom } from '../src/js/shared/dom'

export const HtmlModify = (): PluginOption => ({
  name: 'html-modify',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    async handler(html) {
      const { document } = parseHTML(html)
      modifyItems(document)
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