import baseApi from "../Api/baseApi";


const arrangementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // /user/agreement-steps/progress/
    arrangementProgress: builder.query({
      query: () => ({
        url: "/user/agreement-steps/progress/",
        method: "GET",
      }),
      providesTags: ["ArrangementProgress"],
    }),

    // POST
// /api/v1/user/agreement-steps/current/upload/
    uploadArrangementProgress: builder.mutation({
      query: (formData) => ({
        url: "/user/agreement-steps/current/upload/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["ArrangementProgress"],
  }),
  

  }),
});

export const {
    useArrangementProgressQuery,
    useUploadArrangementProgressMutation,
} = arrangementApi;
