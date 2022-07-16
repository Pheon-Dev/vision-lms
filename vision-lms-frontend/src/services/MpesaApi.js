import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mpesa } from "mpesa-api";

const CONSUMER_KEY = import.meta.env.VITE_CONSUMER_KEY;
const CONSUMER_SECRET = import.meta.env.VITE_CONSUMER_SECRET;
const INITIATOR_PASSWORD = import.meta.env.VITE_INITIATOR_PASSWORD;
const SECURITY_CREDENTIAL = import.meta.env.VITE_SECURITY_CREDENTIAL;
const PASS_KEY = import.meta.env.VITE_PASS_KEY;
const PAY_BILL = import.meta.env.VITE_PAY_BILL;
const TILL_NUMBER = import.meta.env.VITE_TILL_NUMBER;
const PHONE_NUMBER = import.meta.env.VITE_PHONE_NUMBER;
const CALL_BACK_URL = import.meta.env.VITE_CALL_BACK_URS;

export const mpesaApi = () => {
    const credentials = {
      clientKey: `${CONSUMER_KEY}`,
      clientSecret: `${CONSUMER_SECRET}`,
      initiatorPassword: `${SECURITY_CREDENTIAL}`,
      // securityCredential: `${SECURITY_CREDENTIAL}`,
      // certificatePath: null,
    };

    // const environment = "sandbox";
    const environment = "production";

    const mpesa = new Mpesa(credentials, environment);

    return (
      <>
        {" "}
        {mpesa
          .lipaNaMpesaOnline({
            BusinessShortCode: Number(PAY_BILL),
            passKey: `${PASS_KEY}`,
            TransactionDesc: "Transaction Desc",
            TransactionType: "CustomerPayBillOnline",
            PartyA: `${PHONE_NUMBER}`,
            PartyB: `${PAY_BILL}`,
            Amount: 1,
            PhoneNumber: `${PHONE_NUMBER}`,
            CallBackURL: `${CALL_BACK_URL}`,
            AccountReference: "Account Reference",
          })
          .then((response) => {
            console.log(response);
            res
              .status(200)
              .json({ name: `${JSON.stringify(response, undefined, 2)}` });
          })
          .catch((error) => {
            console.log(error);
            res
              .status(400)
              .json({ name: `${JSON.stringify(error, undefined, 2)}` });
          })}
      </>
    );
  }

// const createRequest = (url) => ({url, headers: mpesaApiHeaders});
//
// export const mpesaApi = () => createApi({
//   reducerPath: 'mpesaApi',
//   baseQuery: fetchBaseQuery({ baseUrl }),
//   endpoints: (builder) => ({
//     getMpesa: builder.query({
//       query: () => createRequest(`/`),
//     })
//   })
// })

export const {
  useGetMpesaQuery
} = mpesaApi;
