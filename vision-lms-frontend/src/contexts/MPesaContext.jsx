import React, { useContext, useState, useEffect } from 'react';
import { mpesa } from '../mpesa';

const MPesaContext = React.createContext();

export function useMPesa() {
  return useContext(MPesaContext);
};

export function MPesaProvider({ children }) {
  const [loading, setLoading] = useState(true);

  function mBusinessToBusiness() {
    return mpesa.b2b({
      InitiatorName: "Initiator Name",
      Amount: 1000 /* 1000 is an example amount */,
      PartyA: "Party A",
      PartyB: "Party B",
      AccountReference: "Account Reference",
      QueueTimeOutURL: "Queue Timeout URL",
      ResultURL: "Result URL",
      CommandID: "Command ID" /* OPTIONAL */,
      SenderIdentifierType: 4 /* OPTIONAL */,
      RecieverIdentifierType: 4 /* OPTIONAL */,
      Remarks: "Remarks" /* OPTIONAL */,
    })
      .then((response) => {
        //Do something with the response
        //eg
        console.log(response);
      })
      .catch((error) => {
        //Do something with the error;
        //eg
        console.error(error);
      });
  }

  function mReversal() {
    return mpesa.reversal({
      Initiator: "Initiator",
      MPesaactionID: "MPesaaction ID",
      Amount: 1000 /* 1000 is an example amount */,
      ReceiverParty: "Reciever Party",
      ResultURL: "Result URL",
      QueueTimeOutURL: "Queue Timeout URL",
      CommandID: "Command ID" /* OPTIONAL */,
      RecieverIdentifierType: 11 /* OPTIONAL */,
      Remarks: "Remarks" /* OPTIONAL */,
      Occasion: "Ocassion" /* OPTIONAL */,
    })
      .then((response) => {
        //Do something with the response
        //eg
        console.log(response);
      })
      .catch((error) => {
        //Do something with the error;
        //eg
        console.error(error);
      });
  }

  function mLipaNaMpesa() {
    return mpesa.lipaNaMpesaQuery({
      BusinessShortCode: 123456,
      CheckoutRequestID: "Checkout Request ID",
      passKey: "Lipa Na Mpesa Pass Key",
    })
      .then((response) => {
        //Do something with the response
        //eg
        console.log(response);
      })
      .catch((error) => {
        //Do something with the error;
        //eg
        console.error(error);
      });
  }

  function mLipaNaMpesaOnline() {
    return mpesa.lipaNaMpesaOnline({
      BusinessShortCode: 123456,
      Amount: 1000 /* 1000 is an example amount */,
      PartyA: "Party A",
      PhoneNumber: "Phone Number",
      CallBackURL: "CallBack URL",
      AccountReference: "Account Reference",
      passKey: "Lipa Na Mpesa Pass Key",
      TransactionType: "Transaction Type" /* OPTIONAL */,
      TransactionDesc: "Transaction Description" /* OPTIONAL */,
    })
      .then((response) => {
        //Do something with the response
        //eg
        console.log(response);
      })
      .catch((error) => {
        //Do something with the error;
        //eg
        console.error(error);
      });
  }

  function mTransactionStatus() {
    return mpesa.transactionStatus({
      Initiator: "Initiator",
      TransactionID: "Transaction ID",
      PartyA: "Party A",
      IdentifierType: "Identifier Type",
      ResultURL: "Result URL",
      QueueTimeOutURL: "Queue Timeout URL",
      CommandID: "Command ID" /* OPTIONAL */,
      Remarks: "Remarks" /* OPTIONAL */,
      Occasion: "Occasion" /* OPTIONAL */,
    })
      .then((response) => {
        //Do something with the response
        //eg
        console.log(response);
      })
      .catch((error) => {
        //Do something with the error;
        //eg
        console.error(error);
      });
  }

  function mAccountBalance() {
    return mpesa.accountBalance({
      Initiator: "Initiator Name",
      PartyA: "Party A",
      IdentifierType: "Identifier Type",
      QueueTimeOutURL: "Queue Timeout URL",
      ResultURL: "Result URL",
      CommandID: "Command ID" /* OPTIONAL */,
      Remarks: "Remarks" /* OPTIONAL */,
    })
      .then((response) => {
        //Do something with the response
        //eg
        console.log(response);
      })
      .catch((error) => {
        //Do something with the error;
        //eg
        console.error(error);
      });
  }

  function mC2Bsimulate() {
    return mpesa.c2bsimulate({
      ShortCode: 123456,
      Amount: 1000 /* 1000 is an example amount */,
      Msisdn: 254792123456,
      CommandID: "Command ID" /* OPTIONAL */,
      BillRefNumber: "Bill Reference Number" /* OPTIONAL */,
    })
      .then((response) => {
        //Do something with the response
        //eg
        console.log(response);
      })
      .catch((error) => {
        //Do something with the error;
        //eg
        console.error(error);
      });
  }

  function mC2Bregister() {
    return mpesa.c2bregister({
      ShortCode: "Short Code",
      ConfirmationURL: "Confirmation URL",
      ValidationURL: "Validation URL",
      ResponseType: "Response Type",
    })
      .then((response) => {
        //Do something with the response
        //eg
        console.log(response);
      })
      .catch((error) => {
        //Do something with the error;
        //eg
        console.error(error);
      });
  }

  function mBusinessToCustomer() {
    return mpesa.b2c({
      Initiator: "Initiator Name",
      Amount: 1000 /* 1000 is an example amount */,
      PartyA: "Party A",
      PartyB: "Party B",
      QueueTimeOutURL: "Queue Timeout URL",
      ResultURL: "Result URL",
      CommandID: "Command ID" /* OPTIONAL */,
      Occasion: "Occasion" /* OPTIONAL */,
      Remarks: "Remarks" /* OPTIONAL */,
    })
      .then((response) => {
        //Do something with the response
        //eg
        console.log(response);
      })
      .catch((error) => {
        //Do something with the error;
        //eg
        console.error(error);
      });
  }

  useEffect(() => {
    const unsubscribe = 'Unsubscribe';
    setLoading(false)

    return console.log(unsubscribe)
  }, [])

  const value = {
    mBusinessToBusiness,
    mC2Bregister,
    mC2Bsimulate,
    mBusinessToCustomer,
    mAccountBalance,
    mReversal,
    mLipaNaMpesa,
    mLipaNaMpesaOnline,
    mTransactionStatus,
  }

  return (
    <MPesaContext.Provider value={value}>
      {!loading && children}
    </MPesaContext.Provider>
  )

}
// whitelist IPs
//196.201.214.200
//196.201.214.206
//196.201.213.114
//196.201.214.207
//196.201.214.208
//196.201.213.44
//196.201.212.127
//196.201.212.128
//196.201.212.129
//196.201.212.132
//196.201.212.136
//196.201.212.138


// const Mpesa = require("mpesa-api").Mpesa;
// //import { Mpesa } from "mpesa-api";

// const mpesa = new Mpesa(
//   {
//     client_key: process.env.mpesaClientKey,
//     client_secret: process.env.mpesaClientSecret,
//     initiator_password: process.env.mpesaInitiatorPassword,
//     certificatepath: null,
//   },
//   "sandbox"
// );

// mpesa
//   .lipaNaMpesaOnline({
//     BusinessShortCode: 174379, // Lipa Na Mpesa Online Shortcode on test credentials page
//     Amount: 1 /* 1000 is an example amount */,
//     PartyA: "254...", // use your real phone number
//     PartyB: 174379, // LiAccount Referencepa Na Mpesa Online Shortcode on test credentials page
//     PhoneNumber: "254...", // use your real phone number
//     CallBackURL:
//       "Enter a callback url", // this is where the api sends a callback. It must a hosted endpoint with public access.
//     AccountReference: "account", // This is what the customer would have put as account number if they used normal mpesa
//     passKey: process.env.lnmPassKey, // Lipa na mpesa passkey in test credentials page
//     TransactionType: "CustomerPayBillOnline" /* OPTIONAL */,
//     TransactionDesc: "Sending Money" /* OPTIONAL */,
//   })
//   .then((response) => {
//     //Do something with the response
//     //eg
//     console.log("res");
//     console.log(response);
//   })
//   .catch((error) => {
//     //Do something with the error;
//     //eg
//     console.log("error");
//     console.error(error);
//   });

// // mpesa
// //   .b2c({
// //     Initiator: "testapi113",
// //     Amount: 1 /* 1000 is an example amount */,
// //     PartyB: "254...", // use your real phone number
// //     PartyA: 174379, // LiAccount Referencepa Na Mpesa Online Shortcode on test credentials page
// //     CommandID: "BusinessPayment",
// //     QueueTimeOutURL:
// //       "Enter a callback url",
// //     ResultURL:
// //       "Enter a callback url"
// //   })
// //   .then(response => {
// //     //Do something with the response
// //     //eg
// //     console.log("res");
// //     console.log(response);
// //   })
// //   .catch(error => {
// //     //Do something with the error;
// //     //eg
// //     console.log("error");
// //     console.error(error);
// //   });
