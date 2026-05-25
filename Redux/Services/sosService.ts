import { api } from "./APIService";
import {
  DELETE_SOS,
  ENABLE_SOS,
  GET_ALL_SOS,
  GET_SOS_AVAILABILITY,
  UPDATE_SOS_STATUS,
} from "./Endpoints";

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
      invalidatesTags: ["SosAvailability"],
    }),
    updateSosStatus: build.mutation<UpdateStatusResponse, UpdateStatusRequest>({
      query: ({ id, status, rescuerId, rescuerCoords }) => ({
        url: UPDATE_SOS_STATUS,
        method: "PATCH",
        params: { id },
        body: { status, rescuerId, rescuerCoords },
      }),
      invalidatesTags: ["SosAlerts"],
    }),
    deleteSos: build.mutation<void, DeleteSOSRequest>({
      query: ({ id }) => ({
        url: DELETE_SOS,
        method: "PATCH",
        params: { id },
      }),
      invalidatesTags: ["SosAlerts"],
    }),
    getSosAvailability: build.query<GetSosAvailabilityResponse, void>({
      query: () => ({
        url: GET_SOS_AVAILABILITY,
      }),
      providesTags: ["SosAvailability"],
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
      isActive: boolean;
      updatedAt: string;
      rescuerId: {
        _id: string;
        name: string;
      } | null;
      rescuerCoords: {
        latitude: number;
        longitude: number;
      } | null;
      userId: {
        _id: string;
        age: number;
        phone: string;
        isPWD: boolean;
      };
    },
  ];
};

type EnableSosSignalResponse = {
  message: string;
  isSosEnabled: boolean;
};

type UpdateStatusResponse = {
  status: string;
};

type UpdateStatusRequest = {
  id: string;
  status: string;
  rescuerId?: string;
  rescuerCoords?: {
    latitude: number;
    longitude: number;
  };
};

type DeleteSOSRequest = {
  id: string;
};

type GetSosAvailabilityResponse = {
  isSosEnabled: boolean;
};

export const {
  useGetAllSosAlertQuery,
  useEnableSosSignalMutation,
  useUpdateSosStatusMutation,
  useDeleteSosMutation,
  useGetSosAvailabilityQuery,
} = sosService;
