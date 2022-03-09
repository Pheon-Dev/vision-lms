export default {
  name: 'payments',
  title: 'Payments',
  type: 'document',
  fields: [
    {
      name: 'memberNames',
      title: 'Member Names',
      type: 'string',
    },
    {
      name: 'memberPhoneNumber',
      title: 'Member Phone Number',
      type: 'string',
    },
    {
      name: 'loanId',
      title: 'Loan ID',
      type: 'string',
    },
    {
      name: 'repaymentCycle',
      title: 'Repayment Cycle',
      type: 'string',
    },
    {
      name: 'productType',
      title: 'Product Type',
      type: 'string',
    },
    {
      name: 'principalAmount',
      title: 'Principal Amount',
      type: 'string',
    },
    {
      name: 'loanTenure',
      title: 'Loan Tenure',
      type: 'string',
    },
    {
      name: 'loanAccNumber',
      title: 'Loan Account Number',
      type: 'string',
    },
    {
      name: 'memberId',
      title: 'Member ID',
      type: 'string',
    },
    {
      name: 'memberIdNumber',
      title: 'ID Number',
      type: 'string',
    },
    {
      name: 'memberEmail',
      title: 'Email Address',
      type: 'string',
    },
    {
      name: 'interestAmount',
      title: 'Interest Amount',
      type: 'string',
    },
    {
      name: 'installmentDate',
      title: 'Installment Date',
      type: 'string',
    },
    {
      name: 'installmentAmount',
      title: 'Installment Amount',
      type: 'string',
    },
    {
      name: 'penaltyAmount',
      title: 'Penalty Amount',
      type: 'string',
    },
    {
      name: 'processingFeeAmount',
      title: 'Processing Fee Amount',
      type: 'string',
    },
    {
      name: 'payoff',
      title: 'Payoff Status',
      type: 'string',
    },
    {
      name: 'loanOfficerName',
      title: 'Loan Officer Name',
      type: 'string',
    },
    {
      name: 'loanOfficerPhoneNumber',
      title: 'Loan Officer Phone Number',
      type: 'string',
    },
    {
      name: 'arrears',
      title: 'Arrears',
      type: 'string',
    },
    {
      name: 'daysInArrears',
      title: 'Days in Arrears',
      type: 'string',
    },
    {
      name: 'disbursedAmount',
      title: 'Disbursed Amount',
      type: 'string',
    },
    {
      name: 'disbursementDate',
      title: 'Disbursement Date',
      type: 'string',
    },
    {
      name: 'outstandingAmount',
      title: 'Outstanding Amount',
      type: 'string',
    },
    {
      name: 'referenceNumber',
      title: 'Reference Number',
      type: 'string',
    },
    {
      name: 'recentPayments',
      title: 'Recent Payments',
      type: 'array',
      of: [{ type: 'recentPayments' }]
    },
  ],
};
