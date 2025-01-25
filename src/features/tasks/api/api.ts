import { baseApi } from '@/app';
import { CreateTaskArgs, CreateTaskModel, DeleteTaskArgs, DeleteTaskResponse, GetTasksResponse, UpdateTaskArgs } from './types';
import { updateTodolistResponse } from '@/features';

export const tasksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createTask: builder.mutation<CreateTaskModel, CreateTaskArgs>({
        invalidatesTags: ['tasks'],
        query: args => {
          const { id, ...model } = args;

          return {
            body: model,
            method: 'POST',
            url: `/todo-lists/${id}/tasks`,
          };
        },
      }),
      deleteTask: builder.mutation<DeleteTaskResponse, DeleteTaskArgs>({
        invalidatesTags: ['tasks'],
        query: args => {
          return {
            method: 'DELETE',
            url: `/todo-lists/${args.id}/tasks/${args.taskId}`,
          };
        },
      }),
      getTasks: builder.query<GetTasksResponse, string>({
        providesTags: ['tasks'],
        query: arg => `/todo-lists/${arg}/tasks`,
      }),
      updateTask: builder.mutation<updateTodolistResponse, UpdateTaskArgs>({
        invalidatesTags: ['tasks'],
        query: args => {
          const { id, taskId, ...model } = args;

          return {
            body: model,
            method: 'PUT',
            url: `/todo-lists/${args.id}/tasks/${args.taskId}`,
          };
        },
      }),
    };
  },
});

export const { useCreateTaskMutation, useUpdateTaskMutation, useGetTasksQuery, useDeleteTaskMutation } = tasksApi;
