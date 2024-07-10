import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (product) => {
        return {
          url: "/product",
          method: "POST",
          body: product,
        };
      },
    }),
  }),
});
