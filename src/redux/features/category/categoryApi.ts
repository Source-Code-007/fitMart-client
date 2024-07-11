import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (payload) => ({
        url: "/category",
        method: "POST",
        body: payload,
      }),
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
    }),
    getSingleCategory: builder.query({
      query: (id) => `/category/${id}`,
    }),

    updateCategory: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        body: payload,
      }),
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllCategoryQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
