import { api } from "./APIService";
import { LOGIN, LOGOUT } from "./Endpoints";

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
  }),
  overrideExisting: true,
});

type AuthControllerSignInResponse = {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    role: string;
  };
};

type AuthControllerSignInRequest = {
  email: string;
  password: string;
};
export const { useLoginMutation, useLogoutMutation } = authApi;
