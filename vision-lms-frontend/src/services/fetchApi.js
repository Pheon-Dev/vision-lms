import axios from 'axios';

export const baseUrl = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

export const fetchApi = async (url) => {
  const {data} = await axios.get((url), {
    headers: {
      clientKey: import.meta.env.VITE_CUSTOMER_KEY,
      clientSecret: import.meta.env.VITE_CUSTOMER_SECRET,
      // initiatorPassword: import.meta.env.VITE_INITIATOR_PASSWORD,
      securityCredential: import.meta.env.VITE_SECURITY_CREDENTIAL,
    }
  });

  return data;
}
