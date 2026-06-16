import { api } from "./APIService";
import { CREATE_ARTICLE, DELETE_ARTICLE, GET_ALL_ARTICLES } from "./Endpoints";

const articleService = api.injectEndpoints({
  endpoints: (build) => ({
    createArticle: build.mutation<CreateArticleResponse, CreateArticleRequest>({
      query: (body) => ({
        url: CREATE_ARTICLE,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Articles"],
    }),
    getAllArticles: build.query<GetAllArticlesResponse, GetAllArticleRequest>({
      query: ({ page, limit }) => ({
        url: GET_ALL_ARTICLES,
        params: { page, limit },
      }),
      providesTags: ["Articles"],
    }),
    deleteArticle: build.mutation<DeleteArticleResponse, string>({
      query: (id) => ({
        url: DELETE_ARTICLE,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["Articles"],
    }),
  }),
  overrideExisting: true,
});

type CreateArticleResponse = {
  message: string;
};

type DeleteArticleResponse = {
  code: number;
  message: string;
};

type DeleteArticleRequest = {
  id: string;
};

type CreateArticleRequest = {
  title: string;
  photoUrl: string | null;
  description: string;
  sourceLink: string;
};

type GetAllArticlesResponse = {
  articles: {
    _id: string;
    title: string;
    photoUrl: string | null;
    description: string;
    sourceLink: string;
    createdAt: string;
    updatedAt: string;
  }[];
  pagination: Pagination;
};

type GetAllArticleRequest = {
  page: number;
  limit: number;
};

type Pagination = {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  totalArticles: number;
  totalPages: number;
};

export const {
  useCreateArticleMutation,
  useGetAllArticlesQuery,
  useDeleteArticleMutation,
} = articleService;
