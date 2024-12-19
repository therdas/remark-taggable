import { InlineTaggableNode } from "mdast-util-taggable";
import { Root } from "mdast";
import { expect } from "@jest/globals";
import { visit } from "unist-util-visit";

enum typeError {
  none = 0,
  type = 2,
  value = 4,
  data = 8,
  data_type = 16,
  data_marker = 32,
  data_url = 64,
}

declare global {
  namespace jest {
    interface Matchers<R extends void, Root> {
      toContainNode: (
        received: Root,
        other: InlineTaggableNode,
      ) => { pass: boolean; message: () => string };
    }
  }
}

expect.extend({
  toContainNode(received: Root, other: InlineTaggableNode) {
    let flag: typeError = typeError.none;
    let str = "";
    visit(received, "taggable", (compare: InlineTaggableNode) => {
      if (compare.type !== other.type) {
        str += `\tExpected Node.type '${compare.type}', but received '${other.type}'\n`;
        flag |= typeError.type;
      }
      if (compare.value !== other.value) {
        str += `\tExpected Node.value '${compare.value}', but received '${other.value}'\n`;
        flag |= typeError.value;
      }
      if (compare.data.marker !== other.data.marker) {
        str += `\tExpected Node.data.marker '${compare.data.marker}', but received '${other.data.marker}'\n`;
        flag = flag | typeError.data | typeError.data_marker;
      }
      if (compare.data.type !== other.data.type) {
        str += `\tExpected Node.data.type '${compare.data.type}', but received '${other.data.type}'\n`;
        flag = flag | typeError.data | typeError.data_type;
      }
      if (compare.data.url !== other.data.url) {
        str += `\tExpected Node.data.url '${compare.data.url}', but received '${other.data.url}'\n`;
        flag = flag | typeError.data | typeError.data_url;
      }
    });

    str = str.replace(/\n$/, "");

    return flag === 0
      ? {
          pass: true,
          message: () =>
            `Received InlineTaggableNode has full equality with comparison`,
        }
      : {
          pass: false,
          message: () =>
            `Received InlineTaggableNode is not equal to the passed one: \n${str}`,
        };
  },
});

export default undefined;
