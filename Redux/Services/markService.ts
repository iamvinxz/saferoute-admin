import { api } from "./APIService";
import {
  CREATE_PIN,
  CREATE_SEGMENT,
  DELETE_SEGMENT,
  GET_ALL_PINNED_LOCATIONS,
  GET_ALL_SEGMENT_LOCATIONS,
} from "./Endpoints";

export const markApi = api.injectEndpoints({
  endpoints: (build) => ({
    //pins
    getAllPin: build.query<MarkControllerPinResponse, void>({
      query: () => ({
        url: GET_ALL_PINNED_LOCATIONS,
      }),
      providesTags: ["Pins"],
    }),
    createPin: build.mutation<
      MarkControllerPinResponse,
      MarkControllerPinRequest
    >({
      query: (pin) => ({
        url: CREATE_PIN,
        method: "POST",
        body: pin,
      }),
      invalidatesTags: ["Pins"],
    }),
    //segments
    createSegment: build.mutation<
      MarkControllerSegmentResponse,
      MarkControllerSegmentRequest
    >({
      query: (segments) => ({
        url: CREATE_SEGMENT,
        method: "POST",
        body: segments,
      }),
      invalidatesTags: ["Segments"],
    }),
    getAllSegment: build.query<MarkControllerGetAllSegmentResponse, void>({
      query: () => ({
        url: GET_ALL_SEGMENT_LOCATIONS,
      }),
      providesTags: ["Segments"],
    }),
    deleteSegment: build.mutation<
      MarkControllerDeleteSingleSegmentResponse,
      MarkControllerDeleteSingleSegmentRequest
    >({
      query: ({ id }) => ({
        url: DELETE_SEGMENT,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["Segments"],
    }),
  }),
  overrideExisting: true,
});

type MarkControllerPinRequest = {
  latitude: number;
  longitude: number;
  pinName: string;
  description: string;
};

type MarkControllerPinResponse = {
  message: string;
  pins: [
    {
      coords: [number, number];
      pinName: string;
      description: string;
      _id: string;
      createdAt: string;
      updatedAt: string;
    },
  ];
};

type MarkControllerSegmentRequest = {
  points: [number, number][];
  coords: [number, number][];
  description: string;
  floodDepth: string;
  streetName: string;
};

type FloodReport = {
  reportedBy: string;
  description: string;
  floodDepth: string;
  streetName: string;
  _id: string; // id of floodreport
  createdAt: string;
  updatedAt: string;
};

type MarkControllerSegmentResponse = {
  message: string;
  segment: {
    points: [number, number][];
    coords: [number, number][];
    floodReport: FloodReport;
  };
  _id: string; // id of segment
  createdAt: string;
  updatedAt: string;
};

type MarkControllerGetAllSegmentResponse = {
  message: string;
  segments: [
    {
      _id: string;
      points: [number, number][];
      coords: [number, number][];
      floodReport: FloodReport;
    },
  ];
};

type MarkControllerDeleteSingleSegmentRequest = {
  id: string;
};

type MarkControllerDeleteSingleSegmentResponse = {
  message: string;
  deletedSegmentId: string;
};

export const {
  useGetAllPinQuery,
  useCreatePinMutation,
  useCreateSegmentMutation,
  useGetAllSegmentQuery,
  useDeleteSegmentMutation,
} = markApi;
