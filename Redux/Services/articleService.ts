import { api } from "./APIService";
import { CREATE_ARTICLE, GET_ALL_ARTICLES } from "./Endpoints";

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
    getAllArticles: build.query<GetAllArticlesResponse, void>({
      query: () => ({ url: GET_ALL_ARTICLES }),
      providesTags: ["Articles"],
    }),
  }),
});

type CreateArticleResponse = {
  message: string;
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
};

export const { useCreateArticleMutation, useGetAllArticlesQuery } =
  articleService;
