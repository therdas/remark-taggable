# `remark-taggable`

[![](https://img.shields.io/npm/v/mdast-util-taggable?style=flat-square)](https://www.npmjs.com/package/remark-taggable)
![license](https://img.shields.io/github/license/therdas/remark-taggable?style=flat-square)

Plugin for [`remark`](https://github.com/remarkjs/remark) to support generalized taggables like #tag and @user. Relies on [`micromark-extension-taggable`](https://github.com/therdas/micromark-extension-taggable) for tokenization and [`mdast-util-taggable`](https://github.com/therdas/mdast-util-taggable) for converting markdown to/from abstract syntax trees.

## Install

Install [`remark-taggable`](https://www.npmjs.com/package/remark-taggable) on `npm`.

```
npm install remark-taggable
```

## Usage

```javascript
const unified = require("unified");
const markdown = require("remark-parse");
const taggablePlugin = require("remark-taggable");

let processor = unified().use(markdown).use(taggablePlugin);

// Or use with options

let processor = unified()
  .use(markdown)
  .use(citePlugin, {
    classes: ["micromark-taggable"],
    rules: [
      {
        marker: "!",
        type: "warn",
        toUrl: (val) => `/warnings/${val}`,
        classes: ["warning"],
      },
      {
        marker: "$",
        type: "variable",
        toUrl: (val) => `/variables/${val}`,
        classes: ["variable"],
      },
    ],
    allowEmail: false,
  });
```

Running the processor on the following markdown (without options being defined):

```
This is a #hashtag and this is a @mentionedUser.
```

Will produce the following `taggable` node:

```json
{
  "type": "paragraph",
  "children": [
    {
      "type": "text",
      "value": "This is a "
    },
    {
      "type": "taggable",
      "value": "hashtag",
      "data": {
        "type": "tag",
        "marker": "#",
        "url": "/tags/hashtag"
      }
    },
    {
      "type": "text",
      "value": "This is a "
    },
    {
      "type": "taggable",
      "value": "mentionedUser",
      "data": {
        "type": "mention",
        "marker": "@",
        "url": "/users/mentionedUser"
      }
    },
    {
      "type": "text",
      "value": "."
    }
  ]
}
```

### Configuration

For details about the **syntax tree** structure, see [`mdast-util-taggable`](https://github.com/therdas/mdast-util-taggable/blob/main/README.md). For details about the **configuration** and supported **syntax**, see [`micromark-extension-cite`](https://github.com/therdas/micromark-extension-taggable/blob/main/README.md).

### Credits

Big shoutout to [`@benrbray`](https://github.com/benrbray)'s repositry [`@benrbray/remark-cite`](https://github.com/benrbray/remark-cite) for inspiration and for help as a template for this plugin. I would highly recommend it in case you need citation support for remark.
