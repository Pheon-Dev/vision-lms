export default {
  name: 'maintenance',
  title: 'Maintenance',
  type: 'document',
  fields: [
    {
      name: 'memberNames',
      title: 'Member Names',
      type: 'string',
    },
    {
      name: 'repaymentCycle',
      title: 'Repayment Cycle',
      type: 'string',
    },
    {
      name: 'memberPhoneNumber',
      title: 'Member Phone Number',
      type: 'string',
    },
    {
      name: 'loanAccNumber',
      title: 'Loan Account Number',
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
      name: 'productId',
      title: 'Product ID',
      type: 'string',
    },
    {
      name: 'memberId',
      title: 'Member ID',
      type: 'string',
    },
    {
      name: 'loanTenure',
      title: 'Loan Tenure',
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
      name: 'sundays',
      title: 'Sundays',
      type: 'string',
    },
    {
      name: 'interestAmount',
      title: 'Interest Amount',
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
      name: 'processingFee',
      title: 'Processing Fee',
      type: 'string',
    },
    {
      name: 'guarantorId',
      title: 'Guarantor ID',
      type: 'string',
    },
    {
      name: 'guarantorName',
      title: 'Guarantor Name',
      type: 'string',
    },
    {
      name: 'guarantorRelationship',
      title: 'Guarantor Relationship',
      type: 'string',
    },
    {
      name: 'guarantorPhone',
      title: 'Guarantor Phone',
      type: 'string',
    },
    {
      name: 'payoff',
      title: 'Payoff Status',
      type: 'string',
    },
    {
      name: 'maintained',
      title: 'Maintainance Status',
      type: 'string',
    },
    {
      name: 'approved',
      title: 'Approval Status',
      type: 'string',
    },
    {
      name: 'disbursed',
      title: 'Disbursal Status',
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
      name: 'loanId',
      title: 'Loan ID',
      type: 'string',
    },
    {
      name: 'firstInstallmentDate',
      title: 'First Installment Date',
      type: 'string',
    },
    {
      name: 'disbursementDate',
      title: 'Disbursement Date',
      type: 'string',
    },
    {
      name: 'referenceNumber',
      title: 'Reference Number',
      type: 'string',
    },
    {
      name: 'cleared',
      title: 'Clear Loan',
      type: 'string',
    },
    {
      name: 'defaulted',
      title: 'Loan Default',
      type: 'string',
    },
    {
      name: 'paymentDay',
      title: 'Payment Day',
      type: 'string',
    },
    {
      name: 'counter',
      title: 'Payment Counter',
      type: 'string',
    },
    {
      name: 'paymentCount',
      title: 'Payment Count',
      type: 'string',
    },
    {
      name: 'arrears',
      title: 'Arrears',
      type: 'string',
    },
    {
      name: 'outstandingPenalty',
      title: 'Outstanding Penalty',
      type: 'string',
    },
    {
      name: 'recentPayments',
      title: 'Recent Payments',
      type: 'array',
      of: [{ type: 'recentPayments' }],
    },
  ],
};
