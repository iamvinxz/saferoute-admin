import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Announcement = {
  announcementTitle: string;
  content: string;
};

const initialState: Announcement = {
  announcementTitle: "",
  content: "",
};

const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {
    setAnnouncementTitle: (state, action: PayloadAction<string>) => {
      state.announcementTitle = action.payload;
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    clearAnnouncement(_state) {
      return initialState;
    },
  },
});

export const { setAnnouncementTitle, setContent, clearAnnouncement } =
  announcementSlice.actions;
export default announcementSlice.reducer;
