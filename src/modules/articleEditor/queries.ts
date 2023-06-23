import { gql } from '@apollo/client';

export const GET_ARTICLE_BY_ID = gql`
  query GET_ARTICLE_BY_ID($id: Int) {
    articles(where: { id: { _eq: $id } }) {
      abstract
      user {
        name
        id
      }
      authorId
      readTime
      title
      headerImage
      dateCreated
      likes
      categories
      articleBody
      views
      reviewed
      id
    }
  }
`;

export const SUBMIT_ARTICLE = gql`
  mutation SUBMIT_ARTICLE(
    $abstract: String!
    $articleBody: String!
    $authorId: String!
    $categories: String!
    $headerImage: String!
    $readTime: Int!
    $title: String!
  ) {
    insert_articles_one(
      object: {
        abstract: $abstract
        articleBody: $articleBody
        authorId: $authorId
        categories: $categories
        headerImage: $headerImage
        readTime: $readTime
        title: $title
        reviewed: false
      }
    ) {
      reviewed
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  mutation UPDATE_ARTICLE(
    $id: Int!
    $abstract: String!
    $articleBody: String!
    $categories: String!
    $headerImage: String!
    $readTime: Int!
    $title: String!
  ) {
    update_articles(
      where: { id: { _eq: $id } }
      _set: {
        abstract: $abstract
        articleBody: $articleBody
        categories: $categories
        headerImage: $headerImage
        readTime: $readTime
        title: $title
        reviewed: false
      }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation DELETE_ARTICLE($id: Int!, $deletedAt: timestamp!) {
    update_articles(
      where: { id: { _eq: $id } }
      _set: { deletedAt: $deletedAt }
    ) {
      affected_rows
    }
  }
`;
