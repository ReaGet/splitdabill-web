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
    return [
      pathParts.slice(0, -2).join('/'),
      lang,
      pathParts.slice(-1)
    ].join('/')
  } catch(e) {
    return updateSrcLang(`http://localhost${src}`, lang)
  }
}