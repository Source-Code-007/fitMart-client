import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (payload) => ({
        url: "/order",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["order"],
    }),
    getAllOrder: builder.query({
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
        if (filter?.searchTerm) {
          query.append("searchTerm", filter.searchTerm);
        }

        return {
          url: "/order",
          method: "GET",
          params: query,
        };
      },
      providesTags: ["order"],
    }),
    getSingleOrder: builder.query({
      query: (id) => `/order/${id}`,
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrderQuery,
  useGetSingleOrderQuery,
} = orderApi;
