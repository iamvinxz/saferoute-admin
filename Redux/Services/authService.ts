import { api } from "./APIService";
import { GET_ME, LOGIN, LOGOUT } from "./Endpoints";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<
      AuthControllerSignInResponse,
      AuthControllerSignInRequest
    >({
      query: (credential) => ({
        url: LOGIN,
        method: "POST",
        body: credential,
        credentials: "include",
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: LOGOUT,
        method: "POST",
        credentials: "include",
      }),
    }),
    getMe: build.query<GetMeResponse, void>({
      query: () => ({
        url: GET_ME,
        credentials: "include",
      }),
    }),
  }),
  overrideExisting: true,
});

type AuthControllerSignInResponse = {
  message: string;
  token: string;
  user: {
    _id: string;
    name: string;
    role: string;
  };
};

type AuthControllerSignInRequest = {
  email: string;
  password: string;
};

type GetMeResponse = {
  user: {
    _id: string;
    name: string;
    role: string;
    isActive: boolean;
    respondedTo: string[];
  };
};
export const { useLoginMutation, useLogoutMutation, useGetMeQuery } = authApi;
