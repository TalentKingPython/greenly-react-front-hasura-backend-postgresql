import { gql } from "@apollo/client";

export const GET_CLAPS = gql`
  query GET_CLAPS($articleId: String!, $userId: String!) {
    claps(
      where: { article_id: { _eq: $articleId }, userId: { _eq: $userId } }
    ) {
      id
      userId
    }
  }
`;

export const GET_CLAPS_COUNT = gql`
  query GET_CLAPS($articleId: String!) {
    claps(where: { article_id: { _eq: $articleId } }) {
      id
      userId
    }
  }
`;

export const INSERT_CLAPS = gql`
  mutation InsertClaps($articleId: String!, $userId: String!, $id: String!) {
    insert_claps(
      objects: { userId: $userId, article_id: $articleId, id: $id }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_CLAPS = gql`
  mutation DeleteClaps($articleId: String!, $userId: String!) {
    delete_claps(
      where: { article_id: { _eq: $articleId }, userId: { _eq: $userId } }
    ) {
      affected_rows
    }
  }
`;
