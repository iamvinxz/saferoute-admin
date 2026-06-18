import { api } from "./APIService";
import {
  CREATE_ADMIN,
  DELETE_ADMIN,
  DELETE_USER,
  EDIT_ADMIN,
  GET_ALL_ADMINS,
  GET_ALL_USERS,
} from "./Endpoints";

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
    getAllAdmins: build.query<GetAllAdminsResponse, GetAllAdminsRequest>({
      query: ({ page = 1, limit = 10 }) => ({
        url: GET_ALL_ADMINS,
        params: { page, limit },
      }),
      providesTags: ["Admins"],
    }),
    editAdmin: build.mutation<EditAdminResponse, EditAdminRequest>({
      query: ({ id, ...body }) => ({
        url: EDIT_ADMIN,
        method: "PUT",
        params: { id },
        body,
      }),
      invalidatesTags: ["Admins"],
    }),
    deleteAdmin: build.mutation<void, string>({
      query: (id) => ({
        url: DELETE_ADMIN,
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["Admins"],
    }),
    deleteUser: build.mutation<void, string>({
      query: (id) => ({
        url: DELETE_USER,
        method: "DELETE",
        params: { id },
      }),
    }),
    getAllUsers: build.query<GetAllUsersResponse, GetAllUsersRequest>({
      query: ({ page = 1, limit = 10 }) => ({
        url: GET_ALL_USERS,
        params: { page, limit },
      }),
      providesTags: ["Users"],
    }),
  }),
});

export type EditAdminRequest = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
};

type EditAdminResponse = {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

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

type GetAllAdminsRequest = {
  limit?: number;
  page: number;
};

type GetAllUsersRequest = {
  limit?: number;
  page?: number;
};

type GetAllAdminsResponse = {
  message: string;
  admins: Admin[];
  pagination: AdminPagination;
};

export type AdminPagination = {
  totalAdmins: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type UserPagination = {
  totalUsers: number;
  totalPages: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  currentPage: number;
};

type GetAllUsersResponse = {
  message: string;
  users: User[];
  pagination: UserPagination;
};

export const {
  useCreateAdminMutation,
  useGetAllAdminsQuery,
  useGetAllUsersQuery,
  useEditAdminMutation,
  useDeleteAdminMutation,
  useDeleteUserMutation,
} = userService;
