import { test, describe, expect } from "@jest/globals";
import remarkParse from "remark-parse";
import { taggablePlugin } from "./index";
import { remark } from "remark";
import "./custom_matcher";
import { Options, defaultOptions } from "mdast-util-taggable";

describe("parsing works", () => {
  test("When passing default options into remark-parse", async () => {
    expect(
      remark().use(remarkParse).use(taggablePlugin).parse("#thisIsATag"),
      //@ts-expect-error: This is how it's set up in the library tbh. @TODO fix this, looks ugly
    ).toContainNode({
      type: "taggable",
      value: "thisIsATag",
      data: {
        marker: "#",
        type: "tag",
        url: "/tags/thisIsATag",
      },
    });
  });

  test("When passing custom options into remark-parse", async () => {
    expect(
      remark()
        .use(remarkParse)
        .use(taggablePlugin, {
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
        } as Options)
        .parse("!ThisIsAWarning"),
      //@ts-expect-error: See #[12:5]
    ).toContainNode({
      type: "taggable",
      value: "thisIsAWarning",
      data: {
        marker: "!",
        type: "warn",
        url: "/warnings/thisIsAWarning",
      },
    });
  });
});
