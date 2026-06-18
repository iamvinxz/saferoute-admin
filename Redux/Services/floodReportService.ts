import { api } from "./APIService";
import { DELETE_SINGLE_FLOOD_REPORT, GET_ALL_FLOOD_REPORTS } from "./Endpoints";

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
  }),
  overrideExisting: true,
});

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

export const { useGetAllFloodReportQuery, useDeleteFloodReportMutation } =
  floodReport;
