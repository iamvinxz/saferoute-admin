import { api } from "./APIService";
import {
  DELETE_SINGLE_FLOOD_REPORT,
  GET_ALL_FLOOD_REPORT_BY_DEPTH,
  GET_ALL_FLOOD_REPORT_BY_STATUS,
  GET_ALL_FLOOD_REPORTS,
  VERIFY_FLOOD_REPORT,
} from "./Endpoints";

const floodReport = api.injectEndpoints({
  endpoints: (build) => ({
    getAllFloodReport: build.query<
      FloodReportControllerGetAllResponse,
      FloodReportControllerGetAllRequest
    >({
      query: ({ page = 1, limit = 15 }) => ({
        url: GET_ALL_FLOOD_REPORTS,
        params: { page, limit },
      }),
      providesTags: ["FloodReports"],
    }),
    getAllFloodReportByDepth: build.query<
      FloodReportControllerGetAllResponse,
      FloodReportControllerGetAllByDepth
    >({
      query: ({ depth, limit, page }) => ({
        url: GET_ALL_FLOOD_REPORT_BY_DEPTH,
        params: { depth, page, limit },
      }),
      providesTags: ["FloodReports"],
    }),
    getAllFloodReportByStatus: build.query<
      FloodReportControllerGetAllResponse,
      FloodReportControllerGetAllByStatus
    >({
      query: ({ status, page, limit }) => ({
        url: GET_ALL_FLOOD_REPORT_BY_STATUS,
        params: { status, page, limit },
      }),
      providesTags: ["FloodReports"],
    }),
    deleteFloodReport: build.mutation<
      void,
      FloodReportControllerDeleteSingleRequest
    >({
      query: ({ id }) => ({
        url: DELETE_SINGLE_FLOOD_REPORT,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["FloodReports"],
    }),
    verifyFloodReport: build.mutation<
      VerifyFloodReportResponse,
      VerifyFloodReportRequest
    >({
      query: ({ id, action }) => ({
        url: VERIFY_FLOOD_REPORT,
        method: "PATCH",
        params: { id },
        body: { action },
      }),
      invalidatesTags: ["FloodReports"],
    }),
  }),
  overrideExisting: true,
});

type VerifyFloodReportRequest = {
  id: string;
  action: string;
};

type VerifyFloodReportResponse = {
  message: string;
};

type FloodReportControllerGetAllByDepth = {
  depth: string;
  page: number;
  limit: number;
};

type FloodReportControllerGetAllByStatus = {
  status: string;
  page: number;
  limit: number;
};

type FloodReportControllerGetAllResponse = {
  reports: {
    _id: string;
    latitude: number;
    longitude: number;
    photoUrl: string;
    streetName: string;
    floodDepth: string;
    description: string;
    coords: [number, number];
    status: string;
    createdAt: string;
    updatedAt: string;
  }[];
  pagination: FloodReportPagination;
};

type FloodReportControllerGetAllRequest = {
  page: number;
  limit: number;
};

type FloodReportControllerDeleteSingleRequest = {
  id: string;
};

type FloodReportPagination = {
  totalReports: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export const {
  useGetAllFloodReportQuery,
  useDeleteFloodReportMutation,
  useGetAllFloodReportByDepthQuery,
  useGetAllFloodReportByStatusQuery,
  useVerifyFloodReportMutation,
} = floodReport;
