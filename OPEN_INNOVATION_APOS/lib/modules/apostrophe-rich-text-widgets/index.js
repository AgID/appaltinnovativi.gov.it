module.exports = {
  // The standard list copied from the module, plus sup and sub
  sanitizeHtml: {
    allowedTags: ['h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
      'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
      'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre',
      'sup', 'sub', 'h1', 'h2', 'center', 'img'
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      '*': ['style', 'href', 'color'],
      img: ['src', 'style', 'alt']
    },
    // Lots of these won't come up by default because we don't allow them
    selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont',
      'input', 'link', 'meta'
    ],
    // URL schemes we permit
    allowedSchemes: ['http', 'https', 'ftp', 'mailto'],
    allowedSchemesByTag: {},
  },

};