import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const mpesaApiHedaers = {
  clientKey: import.meta.env.VITE_CUSTOMER_KEY,
  clientSecret: import.meta.env.VITE_CUSTOMER_SECRET,
  // initiatorPassword: import.meta.env.VITE_INITIATOR_PASSWORD,
  securityCredential: import.meta.env.VITE_SECURITY_CREDENTIAL,
}

const environment = "sandbox";

const baseUrl = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

const createRequest = (url) => ({url, headers: mpesaApiHedaers});

export const mpesaApi = () => createApi({
  reducerPath: 'mpesaApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getMpesa: builder.query({
      query: () => createRequest(`/`),
    })
  })
})

export const {
  useGetMpesaQuery
} = mpesaApi;
// var unirest = require("unirest");
// var req = unirest("GET", "https://sandbox.safaricom.co.ke/oauth/v1/generate");
//  
// req.query({
//  "grant_type": "client_credentials"
// });
//  
// req.headers({
//  "Authorization": "Basic SWZPREdqdkdYM0FjWkFTcTdSa1RWZ2FTSklNY001RGQ6WUp4ZVcxMTZaV0dGNFIzaA=="
// });
//  
// req.end(res => {
//  if (res.error) throw new Error(res.error);
//  console.log(res.body);
// });
