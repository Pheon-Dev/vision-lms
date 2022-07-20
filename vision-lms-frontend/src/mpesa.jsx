import axios from "axios";
import { dateTime } from "./utils/dates";
import { routes } from "./utils/routes";

const CONSUMER_KEY = import.meta.env.VITE_CONSUMER_KEY;
const CONSUMER_SECRET = import.meta.env.VITE_CONSUMER_SECRET;
const INITIATOR_PASSWORD = import.meta.env.VITE_INITIATOR_PASSWORD;
const SECURITY_CREDENTIAL = import.meta.env.VITE_SECURITY_CREDENTIAL;
const PASS_KEY = import.meta.env.VITE_PASS_KEY;
const BUSINESS_SHORT_CODE = import.meta.env.VITE_PAY_BILL;
const TILL_NUMBER = import.meta.env.VITE_TILL_NUMBER;
const PHONE_NUMBER = import.meta.env.VITE_PHONE_NUMBER;

const CALLBACK_URL = import.meta.env.VITE_CALL_BACK_URL;
const VALIDATION_URL = import.meta.env.VITE_VALIDATION_URL;
const CONFIRMATION_URL = import.meta.env.VITE_CONFIRMATION_URL;

const TRANSACTION_TYPE = "CustomerPayBillOnline";
const ACCOUNT_REFERENCE = "Account Reference";
const TIMESTAMP = dateTime();

async function getToken() {
  const tokenUrl = routes.production + routes.oauth;

  const url = tokenUrl;
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString(
    "base64"
  );

  const headers = { Authorization: `Basic ${auth}` };

  const res = await axios.request({ method: "GET", url, headers });

  return res.data.access_token;
}

// export default async function Mpesa(req, res) {
export async function lipaNM(req, res) {
  try {
    const { PhoneNumber, Amount } = req.body;
    const token = await getToken();
    const url = routes.production + routes.stkpush;

    const data = {
      BusinessShortCode: BUSINESS_SHORT_CODE,
      Password: Buffer.from(
        `${BUSINESS_SHORT_CODE}${PASS_KEY}${TIMESTAMP}`
      ).toString("base64"),
      Timestamp: TIMESTAMP,
      TransactionType: TRANSACTION_TYPE,
      Amount,
      PartyA: PhoneNumber,
      PartyB: BUSINESS_SHORT_CODE,
      PhoneNumber,
      CallBackURL: CALLBACK_URL,
      AccountReference: ACCOUNT_REFERENCE,
      TransactionDesc: "Payment of loan services",
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.request({
      method: "POST",
      url,
      headers,
      data,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong", error });
  }
}

export async function c2bReg(req, res) {
  try {
    const token = await getToken();
    const url = routes.production + routes.c2bregister;

    const data = {
      ShortCode: Number(BUSINESS_SHORT_CODE),
      ConfirmationURL: `${CONFIRMATION_URL}`,
      ValidationURL: `${VALIDATION_URL}`,
      ResponseType: "Completed",
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.request({
      method: "POST",
      url,
      headers,
      data,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong", error });
  }
}

export async function c2bSim(req, res) {
  try {
    const { PhoneNumber, Amount } = req.body;
    const token = await getToken();
    const url = routes.production + routes.c2bsimulate;

    const data = {
      ShortCode: Number(BUSINESS_SHORT_CODE),
      Amount: Amount,
      Msisdn: PhoneNumber,
      CommandID: TRANSACTION_TYPE,
      BillRefNumber: "00000",
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.request({
      method: "POST",
      url,
      headers,
      data,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong", error });
  }
}

export async function c2bQry(req, res) {
  try {
    const token = await getToken();
    const url = routes.production + routes.stkquery;

    const data = {
      BusinessShortCode: Number(BUSINESS_SHORT_CODE),
      Password: Buffer.from(
        `${BUSINESS_SHORT_CODE}${PASS_KEY}${TIMESTAMP}`
      ).toString("base64"),
      Timestamp: TIMESTAMP,
      CheckoutRequestID: "ws_CO_18072022161824119768858280",
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.request({
      method: "POST",
      url,
      headers,
      data,
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Something went wrong", error });
  }
}

// lipaNM();
// c2bReg();
// c2bSim();
// c2bQry();
// }
