import { gql, useQuery } from '@apollo/client';

export interface IUserProfile {
  id: String;
  bio: String;
  name: String;
  userId: String;
  follows: String[];
  profilePicture: String;
  role: String;
  savedArticles: String[];
  likedArticles: String[];
  profileLink: String;
  username: String;
}

export const GET_USER_BY_ID_OR_LINK = gql`
  query GET_USER_BY_ID_OR_LINK($id: String, $link: String) {
    users(
      where: { _or: [{ id: { _eq: $id } }, { profileLink: { _eq: $link } }] }
    ) {
      id
      bio
      follows
      name
      profilePicture
      savedArticles
      likedArticles
      profileLink
      username
      role
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GET_USER_BY_ID_OR_LINK($id: String, $link: String) {
    users(where: { _or: [{ id: { _eq: $id } }] }) {
      id
      bio
      follows
      name
      profilePicture
      savedArticles
      likedArticles
      profileLink
      username
      role
    }
  }
`;

export interface param {
  userId: string;
  link: string;
}

export interface ProfileUser {
  id: string;
  bio: string;
  name: string;
  follows?: string[];
  profilePicture: string;
  savedArticles: string[];
  likedArticles?: string[];
  profileLink?: string;
  username: string;
  role: 'ADMIN' | 'BASIC_USER';
}

export default function useProfile(id: string, link: string) {
  const { loading, error, data } = useQuery(
    link ? GET_USER_BY_ID_OR_LINK : GET_USER_BY_ID,
    {
      variables: { id, link },
    }
  );

  return {
    loading,
    error,
    data,
  };
}
