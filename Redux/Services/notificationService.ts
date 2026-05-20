import { api } from "./APIService";
import { SEND_ANNOUNCEMENT, GET_ALL_ANNOUNCEMENTS } from "./Endpoints";

const notificationService = api.injectEndpoints({
  endpoints: (build) => ({
    sendAnnouncement: build.mutation<
      SendAnnouncementResponse,
      SendAnnouncementRequest
    >({
      query: (body) => ({
        url: SEND_ANNOUNCEMENT,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Announcements"],
    }),
    getAllAnnouncements: build.query<GetAllAnnouncementsResponse, void>({
      query: () => ({ url: GET_ALL_ANNOUNCEMENTS }),
      providesTags: ["Announcements"],
    }),
  }),
  overrideExisting: true,
});

type SendAnnouncementResponse = {
  message: string;
  notification: {
    _id: string;
    sentBy: string;
    title: string;
    content: string;
    severityLevel: string;
    type: string;
    targetType: string;
    targetUserId: null;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

type SendAnnouncementRequest = {
  title: string;
  content: string;
};

type GetAllAnnouncementsResponse = {
  announcements: {
    _id: string;
    sentBy: { _id: string; name: string; department: string };
    title: string;
    content: string;
    severityLevel: string;
    type: string;
    targetType: string;
    targetUserId: null;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
};

export const { useSendAnnouncementMutation, useGetAllAnnouncementsQuery } =
  notificationService;
