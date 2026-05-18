import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Article = {
  articleTitle: string;
  description: string;
  sourceLink: string;
  photoUrl?: string;
};

const initialState: Article = {
  articleTitle: "",
  description: "",
  sourceLink: "",
  photoUrl: undefined,
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setArticleTitle: (state, action: PayloadAction<string>) => {
      state.articleTitle = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setSourceLink: (state, action: PayloadAction<string>) => {
      state.sourceLink = action.payload;
    },
    setPhotoUrl: (state, action: PayloadAction<string>) => {
      state.photoUrl = action.payload;
    },
    clearArticle(_state) {
      return initialState;
    },
  },
});

export const {
  setArticleTitle,
  setDescription,
  setSourceLink,
  setPhotoUrl,
  clearArticle,
} = articleSlice.actions;
export default articleSlice.reducer;
