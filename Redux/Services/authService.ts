import { api } from "./ApiService";
import { LOGIN } from "./Endpoints";

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
      }),
    }),
  }),
});

type AuthControllerSignInResponse = authResponse;
type AuthControllerSignInRequest = {
  signIn: signIn;
};

type authResponse = {
  response: {
    code: number;
    status: string;
    body: sanitizedBody;
    message: string;
  };
};

type sanitizedBody = {
  content: string;
  token: string;
};

type signIn = {
  phone: number;
  email: string;
  password: string;
};

export const { useLoginMutation } = authApi;
