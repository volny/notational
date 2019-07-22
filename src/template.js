const makeTemplate = title => `---
title: ${title || ''}
created: ${new Date()}
---


`

module.exports = makeTemplate
