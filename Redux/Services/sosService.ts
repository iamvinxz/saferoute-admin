import { api } from "./APIService";
import { GET_ALL_SOS } from "./Endpoints";

const sosService = api.injectEndpoints({
  endpoints: (build) => ({
    getAllSosAlert: build.query<SosControllerGetAllResponse, void>({
      query: () => ({
        url: GET_ALL_SOS,
      }),
    }),
  }),
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

export const { useGetAllSosAlertQuery } = sosService;
