import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
// import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';

import { stateToMarkdown as draftToMarkdown } from 'draft-js-export-markdown';
import { stateFromMarkdown as markdownToDraft } from 'draft-js-import-markdown';

const user = {
  keyName: 'id',
  getList: {
    url: '/users',
  },
  getByKey: {
    url: '/user/{keyName}',
  },
  create: {
    url: '/user/create',
  },
  update: {
    url: '/user/update',
    method: 'put',
  },
  delete: {
    url: '/user/delete/{keyName}',
  },
  fields: [
    {
      title: 'Nombre',
      key: 'name',
      sorter: true,
      filter: true,
      type: 'string',
      rules: [
        { required: true, message: 'Is required!' },
        { type: 'string', message: 'Should be string!' },
        { max: 100, message: 'Max 100 characters!' },
      ],
    },
    {
      title: 'Email',
      key: 'email',
      sorter: true,
      filter: true,
      type: 'string',
      rules: [
        { required: true, message: 'Is required!' },
        { type: 'email', message: 'Should be correct email!' },
      ],
    },
    {
      title: 'Introduction Markdown',
      key: 'introductionMd',
      type: 'rich',
      hidden: ['column'],
      width: 20,
      typeFormat: 'markdown',
      convertToRaw: draftToMarkdown,
      convertToDraft: markdownToDraft,
      rules: [],
    },
    {
      title: 'Introduction html',
      key: 'introductionHtml',
      type: 'rich',
      hidden: ['column'],
      width: 20,
      typeFormat: 'html',
      convertToRaw: (rich, draftRaw) => draftToHtml(draftRaw(rich)),
      convertToDraft: (raw) => htmlToDraft(raw),
      rules: [],
    },
  ],
};

export default user;
