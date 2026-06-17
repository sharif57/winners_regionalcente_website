"use client";

import baseApi from "../Api/baseApi";

export interface AppUser {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  password: string;
  email: string;
  phone: string | null;
  role: string;
  image: string;
  gender: string;
  google_id: string;
  facebook_id: string;
  apple_id: string;
  online: boolean;
  is_deleted: boolean;
  is_verified: boolean;
  document?: string;
  auth_is_reset_password: boolean;
  auth_one_time_code: string | number | null;
  auth_expire_at: string | null;
}

export interface SingleUserResponse {
  success: boolean;
  message: string;
  data: AppUser;
}

export interface UsersMeta {
  page: number;
  limit: number;
  totalPage: number;
  total: number;
}

export interface AllUsersPayload {
  data: AppUser[];
  meta: UsersMeta;
}

export interface AllUsersResponse {
  success: boolean;
  message: string;
  data: AllUsersPayload;
}

export interface AllUsersQueryParams {
  search?: string;
  status?: boolean;
  role?: string;
  page?: number;
  limit?: number;
}

export interface IncomeRecentTransaction {
  id: string;
  type: string;
  amount: string;
  category: string;
  notes: string;
  date: string;
  image: string;
  document: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface IncomeGrowthVsPreviousMonth {
  percentage: number;
  income: number;
}

export interface IncomeReportData {
  total_income: number;
  average_monthly_income: number;
  growth_vs_previous_month: IncomeGrowthVsPreviousMonth;
  recent_transactions: IncomeRecentTransaction[];
  meta: UsersMeta;
}

export interface IncomeReportResponse {
  success: boolean;
  message: string;
  meta: UsersMeta;
  data: IncomeReportData;
}

export interface ExpenseGrowthVsPreviousMonth {
  percentage: number;
  expense: number;
}

export interface ExpenseReportData {
  total_expense: number;
  average_monthly_expense: number;
  growth_vs_previous_month: ExpenseGrowthVsPreviousMonth;
  recent_transactions: IncomeRecentTransaction[];
  meta: UsersMeta;
}

export interface ExpenseReportResponse {
  success: boolean;
  message: string;
  meta: UsersMeta;
  data: ExpenseReportData;
}

export interface UserIncomeOverviewQueryParams {
  id: string;
  page?: number;
  limit?: number;
}

export interface UserExpenseOverviewQueryParams {
  id: string;
  page?: number;
  limit?: number;
}

export interface GlobalOverviewUser {
  name: string;
  email: string;
  image: string;
}

export interface GlobalMonthlyData {
  month: number;
  income: number;
  expense: number;
}

export interface GlobalFinancialOverviewData {
  total_revenue: number;
  total_expense: number;
  total_income: number;
  zakat_expense: number;
  monthly_data: GlobalMonthlyData[];
  recent_transactions: IncomeRecentTransaction[];
  meta?: UsersMeta;
}

export interface GlobalFinancialOverviewResponse {
  success: boolean;
  message: string;
  meta?: UsersMeta;
  data: GlobalFinancialOverviewData;
}

export interface ProfitLossYearlyMonthlyData {
  month: number;
  income: number;
  expense: number;
}

export interface ProfitLossCategoryWiseExpense {
  [key: string]: number;
}

export interface ProfitLossReportData {
  total_revenue: number;
  total_expense: number;
  total_income: number;
  net_profit_percentage: number;
  yearly_monthly_data: ProfitLossYearlyMonthlyData[];
  category_wise_expense: ProfitLossCategoryWiseExpense;
  recent_transactions: IncomeRecentTransaction[];
  meta: UsersMeta;
}

export interface ProfitLossReportResponse {
  success: boolean;
  message: string;
  meta: UsersMeta;
  data: ProfitLossReportData;
}

export interface ProfitLossQueryParams {
  id: string;
  page?: number;
  limit?: number;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userProfile: builder.query({
      query: () => ({
        url: "/auth/profile/",
        method: "GET",
      }),

      providesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/auth/profile/",
        method: "PATCH",
        body: data,
        // Don't set Content-Type so browser adds multipart/form-data boundary for FormData
        formData: true,
      }),
      invalidatesTags: ["User"],
    }),

    getBlogList: builder.query({
      query: (params) => ({
        url: `/blogposts/`,
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["Blog"],
    }),

    getBlogDetails: builder.query({
      query: (id) => ({
        url: `/blogposts/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Blog", id }],
    }),

    // /jc-form-submit/
    submitJcForm: builder.mutation({
      query: (data) => ({
        url: "/jc-form-submit/",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["User"],
    }),

  }),
});

export const { useUserProfileQuery, useLazyUserProfileQuery, useUpdateProfileMutation, useGetBlogListQuery, useGetBlogDetailsQuery, useSubmitJcFormMutation } = userApi;
