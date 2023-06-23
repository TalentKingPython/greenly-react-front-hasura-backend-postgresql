import { gql } from "@apollo/client";

export const GET_WRITTEN_ARTICLES = gql`
  query GET_WRITTEN_ARTICLES($authorId: String!) {
    articles(where: { authorId: { _eq: $authorId }, reviewed: { _eq: true } }) {
      user {
        name
      }
      readTime
      title
      headerImage
      dateCreated
      likes
      categories
      articleBody
      views
      authorId
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UPDATE_USER(
    $id: String!
    $bio: String!
    $name: String!
    $img: String!
    $link: String!
    $username: String!
  ) {
    update_users(
      where: { id: { _eq: $id } }
      _set: {
        bio: $bio
        name: $name
        profilePicture: $img
        profileLink: $link
        username: $username
      }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_USER_IMAGE = gql`
  mutation UPDATE_USER_IMAGE($id: String!, $img: String!) {
    update_users(where: { id: { _eq: $id } }, _set: { profilePicture: $img }) {
      affected_rows
    }
  }
`;
