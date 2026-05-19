import { api } from "./APIService";
import { ENABLE_SOS, GET_ALL_SOS } from "./Endpoints";

const sosService = api.injectEndpoints({
  endpoints: (build) => ({
    getAllSosAlert: build.query<SosControllerGetAllResponse, void>({
      query: () => ({
        url: GET_ALL_SOS,
      }),
      providesTags: ["SosAlerts"],
    }),
    enableSosSignal: build.mutation<EnableSosSignalResponse, void>({
      query: () => ({
        url: ENABLE_SOS,
        method: "PATCH",
      }),
    }),
  }),
  overrideExisting: true,
});

type SosControllerGetAllResponse = {
  alerts: [
    {
      coords: {
        latitude: number;
        longitude: number;
      };
      _id: string;
      numberOfPersons: number;
      streetName: string;
      condition: string;
      status: string;
      createdAt: string;
      updatedAt: string;
    },
  ];
};

type EnableSosSignalResponse = {
  message: string;
  isSosEnabled: boolean;
};

export const { useGetAllSosAlertQuery, useEnableSosSignalMutation } =
  sosService;
