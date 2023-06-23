import { faker } from '@faker-js/faker';
import { RawDraftContentState } from 'draft-js';
import * as Factory from 'factory.ts';
import { IArticle } from 'modules/article/types';

export const abstractFactory = Factory.Sync.makeFactory<RawDraftContentState>({
  blocks: [],
  entityMap: {
    '0': {
      type: 'image',
      mutability: 'IMMUTABLE',
      data: {
        src: faker.image.imageUrl(),
      },
    },
  },
});

export const articleBodyFactory =
  Factory.Sync.makeFactory<RawDraftContentState>({
    blocks: [],
    entityMap: {
      '0': {
        type: 'text',
        mutability: 'IMMUTABLE',
        data: {
          text: faker.lorem.paragraph(),
        },
      },
    },
  });

export const articleFactory = Factory.Sync.makeFactory<IArticle>({
  id: Factory.each((i) => i.toString()),
  abstract: JSON.stringify(abstractFactory.build()),
  authorId: faker.datatype.string(),
  readTime: faker.datatype.number(),
  title: faker.lorem.sentence(),
  headerImage: faker.image.imageUrl(),
  dateCreated: faker.date.past().toString(),
  likes: faker.datatype.number(),
  categories: faker.lorem.word(),
  articleBody: JSON.stringify(articleBodyFactory.build()),
  views: faker.datatype.number(),
  reviewed: true,
  user: {
    id: faker.datatype.string(),
    name: faker.name.firstName(),
  },
});
