import {
  syntax as taggableSyntax,
  html as taggableHtml,
} from "micromark-extension-taggable";
import {
  Options as TaggableOptions,
  defaultOptions as taggableDefaults,
} from "mdast-util-taggable";
import {
  fromMarkdown as taggableFromMarkdown,
  toMarkdown as taggableToMarkdown,
} from "mdast-util-taggable";
import { Extension as taggableFromExtension } from "mdast-util-from-markdown";
import { Extension } from "micromark-util-types";
import { Processor } from "unified";

export {
  taggableDefaults,
  taggableFromMarkdown,
  taggableHtml,
  taggableSyntax,
  taggableToMarkdown,
  TaggableOptions,
  taggableFromExtension,
};

export function taggablePlugin(
  this: Processor,
  options?: TaggableOptions,
): undefined {
  const finOptions = options || taggableDefaults;
  if (finOptions.allowEmail === undefined) finOptions.allowEmail = false;

  const data = this.data() as any;

  const micromarkExtensions =
    data.micromarkExtensions ||
    (data.micromarkExtensions = [] as Array<Extension>);
  const fromMarkdownExtensions =
    data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
  const toMarkdownExtensions =
    data.toMarkdownExtensions || (data.toMarkdownExtensions = []);

  micromarkExtensions.push(taggableSyntax());
  fromMarkdownExtensions.push(taggableFromMarkdown());
  toMarkdownExtensions.push(taggableToMarkdown());
}

export default taggablePlugin;
