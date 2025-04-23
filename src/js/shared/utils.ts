export const changeImgSrcInDocument = (root: Document, lang: string) => {
  if (!lang) return
  const imgs: NodeListOf<HTMLImageElement> = root.querySelectorAll('[data-i18-img]');
  imgs.forEach(i => {
    i.src = updateSrcLang(i.src, lang)
  });
}

export const updateSrcLang = (src: string, lang: string) => {
  try {
    const { pathname } = new URL(src)
    const pathParts = pathname.split('/')
    const link = [
      pathParts.slice(0, -2).join('/'),
      lang,
      pathParts.slice(-1)
    ].join('/')
    return addVersionTo(link)
  } catch(e) {
    return updateSrcLang(`http://localhost${src}`, lang)
  }
}

const VERSION = ~~(Math.random() * 100)

export const addVersionTo = (value: string) => {
  return `${value}?v=${VERSION}`
}