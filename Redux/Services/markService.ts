import { api } from "./APIService";
import {
  CREATE_PIN,
  CREATE_SEGMENT,
  GET_ALL_PINNED_LOCATIONS,
} from "./Endpoints";

export const markApi = api.injectEndpoints({
  endpoints: (build) => ({
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
    createSegment: build.mutation<
      MarkControllerSegmentResponse,
      MarkControllerSegmentRequest
    >({
      query: (segments) => ({
        url: CREATE_SEGMENT,
        method: "POST",
        body: segments,
      }),
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
  streeName: string;
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

export const {
  useGetAllPinQuery,
  useCreatePinMutation,
  useCreateSegmentMutation,
} = markApi;
