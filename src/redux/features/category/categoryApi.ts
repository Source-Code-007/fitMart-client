import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (payload) => ({
        url: "/category",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["category", "product"],
    }),
    getAllCategory: builder.query({
      query: (filter) => {
        let query = new URLSearchParams();
        if (filter?.pagination) {
          if (filter.pagination?.page) {
            query.append("page", filter?.pagination?.page);
          }
          if (filter.pagination?.limit) {
            query.append("limit", filter?.pagination?.limit);
          }
        }

        return {
          url: "/category",
          method: "GET",
          params: query,
        };
      },
      providesTags: ["category"],
    }),
    getSingleCategory: builder.query({
      query: (id) => `/category/${id}`,
    }),

    updateCategory: builder.mutation({
      query: (payload) => ({
        url: `/category/${payload?._id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["category", "product"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category", "product"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
