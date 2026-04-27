import { api } from "./APIService";
import { CREATE_PIN } from "./Endpoints";

export const markApi = api.injectEndpoints({
  endpoints: (build) => ({
    createPin: build.mutation<
      MarkControllerPinResponse,
      MarkControllerPinRequest
    >({
      query: (payload) => ({
        url: CREATE_PIN,
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

type MarkControllerPinRequest = {
  latitude: number;
  longitude: number;
  pinName: string;
  description: string;
};

type MarkControllerPinResponse = {
  message: string;
  pin: {
    coords: [number, number];
    pinName: string;
    description: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
};

export const { useCreatePinMutation } = markApi;
