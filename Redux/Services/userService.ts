import { api } from "./APIService";
import { CREATE_ADMIN, GET_ALL_ADMINS, GET_ALL_USERS } from "./Endpoints";

const userService = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    createAdmin: build.mutation<CreateAdminResponse, CreateAdminRequest>({
      query: (body) => ({
        url: CREATE_ADMIN,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admins"],
    }),
    getAllAdmins: build.query<GetAllAdminsResponse, void>({
      query: () => ({ url: GET_ALL_ADMINS }),
      providesTags: ["Admins"],
    }),
    getAllUsers: build.query<GetAllUsersResponse, void>({
      query: () => ({ url: GET_ALL_USERS }),
      providesTags: ["Users"],
    }),
  }),
});

type CreateAdminResponse = {
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    department: string;
    region: string;
    fcmToken: null;
    role: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

type CreateAdminRequest = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export type Admin = {
  _id: string;
  name: string;
  email: string;
  department: string;
  region: string;
  fcmToken: null;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  _id: string;
  age: number;
  phone: string;
  role: string;
  isActive: boolean;
  fcmToken: null;
  isPWD: boolean;
  createdAt: string;
  updatedAt: string;
};

type GetAllAdminsResponse = {
  message: string;
  admins: Admin[];
};

type GetAllUsersResponse = {
  message: string;
  users: User[];
};

export const {
  useCreateAdminMutation,
  useGetAllAdminsQuery,
  useGetAllUsersQuery,
} = userService;
