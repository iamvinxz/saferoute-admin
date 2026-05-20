import { api } from "./APIService";
import { DELETE_SINGLE_FLOOD_REPORT, GET_ALL_FLOOD_REPORTS } from "./Endpoints";

const floodReport = api.injectEndpoints({
  endpoints: (build) => ({
    getAllFloodReport: build.query<FloodReportControllerGetAllResponse, void>({
      query: () => ({
        url: GET_ALL_FLOOD_REPORTS,
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
};

type FloodReportControllerDeleteSingleRequest = {
  id: string;
};

export const { useGetAllFloodReportQuery, useDeleteFloodReportMutation } =
  floodReport;
