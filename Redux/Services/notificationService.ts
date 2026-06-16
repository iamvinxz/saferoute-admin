import { api } from "./APIService";
import {
  SEND_ANNOUNCEMENT,
  GET_ALL_ANNOUNCEMENTS,
  DELETE_ANNOUNCEMENT,
} from "./Endpoints";

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
    getAllAnnouncements: build.query<
      GetAllAnnouncementsResponse,
      GetAllAnnouncementsRequest
    >({
      query: ({ page, limit }) => ({
        url: GET_ALL_ANNOUNCEMENTS,
        params: { page, limit },
      }),
      providesTags: ["Announcements"],
    }),
    deleteAnnouncement: build.mutation<DeleteAnnouncementResponse, string>({
      query: (id) => ({
        url: DELETE_ANNOUNCEMENT,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["Announcements"],
    }),
  }),
  overrideExisting: true,
});

type DeleteAnnouncementResponse = {
  code: number;
  message: string;
};

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
  pagination: Pagination;
};

type Pagination = {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  totalAnnouncement: number;
  totalPages: number;
};

type GetAllAnnouncementsRequest = {
  page: number;
  limit: number;
};

export const {
  useSendAnnouncementMutation,
  useGetAllAnnouncementsQuery,
  useDeleteAnnouncementMutation,
} = notificationService;
