import { gql } from '@apollo/client';

export const GET_CATEGORY_ARTICLES = gql`
  query getCategoryArticles($category: String!, $offset: Int!) {
    articles(
      where: {
        categories: { _eq: $category }
        reviewed: { _eq: true }
        deletedAt: { _is_null: true }
      }
      limit: 36
      offset: $offset
    ) {
      authorId
      categories
      dateCreated
      id
      readTime
      title
      headerImage
      user {
        name
      }
    }
    articles_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_SEARCH_ARTICLES = gql`
  query getSearchArticles($term: String!, $offset: Int!) {
    articles(
      where: {
        _or: [
          { title: { _ilike: $term } }
          { user: { name: { _ilike: $term } } }
        ]
        reviewed: { _eq: true }
        deletedAt: { _is_null: true }
      }
      limit: 36
      offset: $offset
    ) {
      authorId
      categories
      dateCreated
      id
      readTime
      title
      headerImage
      user {
        name
      }
    }
    articles_aggregate(
      where: {
        _or: [
          { title: { _ilike: $term } }
          { user: { name: { _ilike: $term } } }
        ]
        reviewed: { _eq: true }
        deletedAt: { _is_null: true }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;
