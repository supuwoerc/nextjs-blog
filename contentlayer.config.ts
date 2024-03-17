import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from 'contentlayer/source-files';
import { format, parseISO } from 'date-fns';

import { readingTime } from 'reading-time-estimator';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { visit } from 'unist-util-visit';

const computedFields: ComputedFields<'Post' | 'Page'> = {
  url: {
    type: 'string',
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  urlslug: {
    type: 'string',
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slug: {
    type: 'string',
    resolve: (doc) => `/${doc._raw.flattenedPath}`.toLowerCase(),
  },
  slugAsParams: {
    type: 'string',
    resolve: (doc) =>
      doc._raw.flattenedPath.split('/').slice(1).join('/').toLowerCase(),
  },
  encodeURIComponentRet: {
    type: 'string',
    resolve: (doc) => {
      const temp = doc._raw.flattenedPath.split('/').slice(1).join('/');
      return encodeURIComponent(temp);
    },
  },
  publishDate: {
    type: 'string',
    resolve: (doc) => {
      return format(parseISO(doc.date), 'yyyy/MM/dd');
    },
  },
  readingTime: {
    type: 'json',
    resolve: (doc) => {
      const ret = readingTime(doc.body.raw, 120, 'cn');
      return {
        ...ret,
        text: ret.text.replace(' ', ''),
      };
    },
  },
};

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    desc: {
      type: 'string',
      required: false,
    },
    date: {
      type: 'date',
      required: true,
    },
    updatedDate: {
      type: 'date',
      required: false,
    },
    draft: {
      type: 'boolean',
      default: false,
      required: false,
    },
    top: {
      type: 'boolean',
      default: false,
      required: false,
    },
    categories: {
      type: 'list',
      default: [],
      of: { type: 'string' },
    },
    tags: {
      type: 'list',
      default: [],
      of: { type: 'string' },
    },
    cover: {
      type: 'string',
      default: '',
    },
    coverDesc: {
      type: 'string',
      default: '',
    },
  },
  computedFields,
}));

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `pages/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    desc: {
      type: 'string',
      required: false,
    },
    date: {
      type: 'date',
      required: true,
    },
    updatedDate: {
      type: 'date',
      required: false,
    },
    cover: {
      type: 'string',
      default: '',
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: './source',
  documentTypes: [Post, Page],
  mdx: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'pre') {
            const [codeEl] = node.children;
            if (codeEl.tagName !== 'code') return;
            node.raw = codeEl.children?.[0].value;
          }
        });
      },
      [
        rehypePrettyCode,
        {
          theme: {
            light: 'material-theme-lighter',
            dark: 'material-theme-ocean',
          },
          keepBackground: true,
          defaultLang: 'typescript',
        },
      ],
      rehypeKatex,
      rehypeSlug,
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'div') {
            if (!('data-rehype-pretty-code-fragment' in node.properties)) {
              return;
            }
            for (const child of node.children) {
              if (child.tagName === 'pre') {
                child.properties['raw'] = node.raw;
              }
            }
          }
        });
      },
    ],
  },
});
