export const withHyphens = (string) => string?.replace(/ /g, '-')

// generate paths of the form:
// `/Forward`
// `/Preface`
// `/1-Understanding-GraphQL-through-REST/1-Introduction`
export const slugify = (chapter, section) => {
  if (!section) {
    if (chapter.sections.length) {
      // default to the first section
      section = chapter.sections[0]
    } else {
      return '/' + withHyphens(chapter.title)
    }
  }

  const chapterSlug = chapter.number + '-' + withHyphens(chapter.title)
  const sectionSlug = section.number + '-' + withHyphens(section.title)
  return `/${chapterSlug}/${sectionSlug}`
}

export const deslugify = path => {
  const [, chapterSlug, sectionSlug] = path.split('/')
  const chapterISNumbered = !!sectionSlug

  return chapterISNumbered ? {
    chapterNumber: parseInt(chapterSlug.split('-')[0], 10),
    sectionNumber: parseInt(sectionSlug.split('-')[0], 10)
  } : { chapterTitle: chapterSlug}
}