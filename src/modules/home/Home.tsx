import { Box } from '@material-ui/core';
import { useEffect } from 'react';
import Articles from './Articles';
import TopAuthors from './TopAuthors';
import TopArticles from './TopArticles';

import { Navbar } from 'uiCore/components/Navbar';
import { CategoryBar } from 'uiCore/components/CategoryBar';
import axios from 'axios';

const baseURL = 'https://uncommon-killdeer-54.hasura.app/v1/graphql';

const API = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'X-Hasura-Admin-Secret': process.env.REACT_APP_HASURA_ADMIN_SECRET,
  },
});

function Home() {
  useEffect(() => {
    API.post('/', {
      query:
        'query getUser {  users {    id    name    email    country    is_online  }}',
    }).then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <>
      <Navbar variant="primary" />
      <CategoryBar variant="primary" />
      <Box>
        {/* <Articles />
        <TopArticles />
        <TopAuthors /> */}
      </Box>
    </>
  );
}

export default Home;
