const makeTemplate = title => `---
title: ${title || ''}
date: ${new Date()}
---


`

module.exports = makeTemplate
