import { gql } from '@apollo/client';

const whereCondition: string =
  '{ reviewed: { _eq: true }, deletedAt: { _is_null: true } }';

export const GET_FRONT_PAGE_ARTICLES = gql`
  query getFrontpageArticles($offset: Int!) {
    articles(
      distinct_on: title
      offset: $offset
      where: ${whereCondition}
    ) {
      authorId
      categories
      dateCreated
      id
      readTime
      title
      headerImage
      deletedAt
      user {
        name
      }
    }
    articles_aggregate(
      where: ${whereCondition}
    ) {
      aggregate {
        count
      }
    }
  }
`;
