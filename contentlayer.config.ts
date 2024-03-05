import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files";

import { readingTime } from "reading-time-estimator";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";

const computedFields: ComputedFields<"Post" | "Page"> = {
  url: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  urlslug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`.toLowerCase(),
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) =>
      doc._raw.flattenedPath.split("/").slice(1).join("/").toLowerCase(),
  },
  readingTime: {
    type: "json",
    resolve: (doc) => readingTime(doc.body.raw, 200, "cn"),
  },
};

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    desc: {
      type: "string",
      required: false,
    },
    date: {
      type: "date",
      required: true,
    },
    updatedDate: {
      type: "date",
      required: false,
    },
    draft: {
      type: "boolean",
      default: false,
      required: false,
    },
    top: {
      type: "boolean",
      default: false,
      required: false,
    },
    categories: {
      type: "list",
      default: [],
      of: { type: "string" },
    },
    tags: {
      type: "list",
      default: [],
      of: { type: "string" },
    },
    cover: {
      type: "string",
      default: "",
    },
    coverDesc: {
      type: "string",
      default: "",
    },
  },
  computedFields,
}));

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    desc: {
      type: "string",
      required: false,
    },
    date: {
      type: "date",
      required: true,
    },
    updatedDate: {
      type: "date",
      required: false,
    },
    cover: {
      type: "string",
      default: "",
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./source",
  documentTypes: [Post, Page],
  mdx: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      [rehypePrettyCode, { theme: "github-dark", keepBackground: true }],
      rehypeKatex,
      rehypeSlug,
    ],
  },
});
