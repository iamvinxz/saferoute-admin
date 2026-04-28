import { api } from "./APIService";
import { CREATE_PIN, GET_ALL_PINNED_LOCATIONS } from "./Endpoints";

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
      query: (payload) => ({
        url: CREATE_PIN,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Pins"],
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

export const { useGetAllPinQuery, useCreatePinMutation } = markApi;
