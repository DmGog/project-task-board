import { baseApi } from '@/app';
import { SignInArgs, SignInResponse } from '@/features/auth/api/types';

export const signInApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    sigIn: builder.mutation<SignInResponse, SignInArgs>({
      query: body => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
    logOut: builder.mutation<SignInResponse, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useSigInMutation, useLogOutMutation } = signInApi;
