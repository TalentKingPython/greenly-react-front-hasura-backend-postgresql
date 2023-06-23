import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Article, { UPDATE_REVIEW, UPDATE_VIEWS } from './Article';
import { MockedProvider } from '@apollo/client/testing';
import { GET_ARTICLE_BY_ID } from '../articleEditor/queries';
import { articleFactory } from 'testUtils/factories/articleFactory';
import { GET_USER_BY_ID } from 'uiCore/components/LikeButton/LikeButton';
import { GET_WRITTEN_ARTICLES } from 'uiCore/components/ArticleFooter/ArticleFooter';
import { TestProvider } from 'testUtils/testUtils';

const USER_ID = '1234';
const articleViews = 0;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    articleId: '1',
  }),
  useLocation: () => ({
    pathname: '/article/1',
  }),
  useHistory: () => ({
    push: jest.fn(),
    location: {
      pathname: '/article/1',
    },
  }),
}));

jest.mock('modules/firebase/provider/authProvider', () => ({
  useAuth: () => ({
    uid: USER_ID,
  }),
}));

const mockUseProfile = jest.spyOn(
  require('modules/hooks/useProfile'),
  'default'
);
const createMocks = (articleProps?: any) => {
  const testArticle = articleFactory.build({
    id: '1',
    authorId: USER_ID,
    user: { id: USER_ID },
    categories: 'technology',
    views: articleViews,
    reviewed: true,
    abstract: {
      blocks: [
        {
          text: 'test',
        },
      ],
    },
    ...articleProps,
  });

  const articleMock = {
    request: {
      query: GET_ARTICLE_BY_ID,
      variables: {
        id: 1,
      },
    },
    result: {
      data: {
        articles: [testArticle],
      },
    },
  };

  const getUserByIdMock = {
    request: {
      query: GET_USER_BY_ID,
      variables: {
        id: USER_ID,
      },
    },
    result: {
      data: {
        users: [
          {
            id: USER_ID,
            username: 'testUser',
            likedArticles: [],
          },
        ],
      },
    },
  };

  const getWrittenArticlesMock = {
    request: {
      query: GET_WRITTEN_ARTICLES,
      variables: {
        authorId: USER_ID,
      },
    },
    result: {
      data: {
        articles: [testArticle],
      },
    },
  };

  const updateViewsMock = {
    request: {
      query: UPDATE_VIEWS,
      variables: {
        id: 1,
        views: articleViews + 1,
      },
    },
    result: {
      data: {
        update_articles: {
          returning: [
            {
              views: articleViews + 1,
            },
          ],
        },
      },
    },
  };

  const updateReviewMock = {
    request: {
      query: UPDATE_REVIEW,
      variables: {
        id: '1',
      },
    },
  };
  return [
    articleMock,
    getUserByIdMock,
    getWrittenArticlesMock,
    updateReviewMock,
    updateViewsMock,
  ];
};

const renderFunction = ({ mocks }: { mocks: Array<any> }) => {
  return render(
    <TestProvider>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Article />
      </MockedProvider>
    </TestProvider>
  );
};

describe('Article', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('when user role is USER', () => {
    const userRoleData = {
      data: {
        users: [
          {
            role: 'USER',
          },
        ],
      },
    };
    const authorData = {
      data: {
        users: [
          {
            role: 'USER',
            id: USER_ID,
          },
        ],
      },
    };
    describe('and article is reviewed', () => {
      it('should show the article', async () => {
        mockUseProfile.mockReturnValue(userRoleData);
        renderFunction({ mocks: createMocks({ reviewed: true }) });

        const article = await screen.findByTestId('article-container');
        expect(article).toBeInTheDocument();
      });
      describe('and the user is the author', () => {
        it('should render the edit button', async () => {
          mockUseProfile.mockReturnValue(authorData);
          renderFunction({ mocks: createMocks({ reviewed: true }) });

          const editButton = await screen.findByTestId('edit-article-button');
          expect(editButton).toBeInTheDocument();
        });
        it('should not render the delete button', async () => {
          mockUseProfile.mockReturnValue(authorData);
          renderFunction({ mocks: createMocks({ reviewed: true }) });

          const deleteButton = screen.queryByTestId('delete-article-button');
          expect(deleteButton).not.toBeInTheDocument();
        });
      });
      describe('and the user is not the author', () => {
        it('should not render the edit button', async () => {
          mockUseProfile.mockReturnValue(userRoleData);
          renderFunction({ mocks: createMocks({ reviewed: true }) });

          const editButton = screen.queryByTestId('edit-article-button');
          expect(editButton).not.toBeInTheDocument();
        });
        it('should not render the delete button', async () => {
          mockUseProfile.mockReturnValue(userRoleData);
          renderFunction({ mocks: createMocks({ reviewed: true }) });

          const deleteButton = screen.queryByTestId('delete-article-button');
          expect(deleteButton).not.toBeInTheDocument();
        });
      });
    });
    describe('and the article is not reviewed', () => {
      it('should not show the article', async () => {
        mockUseProfile.mockReturnValue(userRoleData);
        renderFunction({ mocks: createMocks({ reviewed: false }) });

        const article = screen.queryByTestId('article-container');
        expect(article).not.toBeInTheDocument();

        const notFound = await screen.findByTestId('not-found');
        expect(notFound).toBeInTheDocument();
      });
    });
  });
  describe('when user role is ADMIN', () => {
    const adminRoleData = {
      data: {
        users: [
          {
            role: 'ADMIN',
          },
        ],
      },
    };
    it('should show the article', async () => {
      mockUseProfile.mockReturnValue(adminRoleData);
      renderFunction({ mocks: createMocks({ reviewed: false }) });

      const article = await screen.findByTestId('article-container');
      expect(article).toBeInTheDocument();
    });
    it('should render the approve button', async () => {
      mockUseProfile.mockReturnValue(adminRoleData);
      renderFunction({ mocks: createMocks({ reviewed: false }) });

      const approveButton = await screen.findByTestId('approve-button');
      expect(approveButton).toBeInTheDocument();
    });
    it('should render the edit button', async () => {
      mockUseProfile.mockReturnValue(adminRoleData);
      renderFunction({ mocks: createMocks({ reviewed: false }) });

      const editButton = await screen.findByTestId('edit-article-button');
      expect(editButton).toBeInTheDocument();
    });
    it('should render the delete button', async () => {
      mockUseProfile.mockReturnValue(adminRoleData);
      renderFunction({ mocks: createMocks({ reviewed: false }) });

      const deleteButton = await screen.findByTestId('delete-article-button');
      expect(deleteButton).toBeInTheDocument();
    });
  });
});
