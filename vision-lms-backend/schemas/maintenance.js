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
      name: 'memberPhoneNumber',
      title: 'Member Phone Number',
      type: 'string',
    },
    {
      name: 'productType',
      title: 'Product Type',
      type: 'string',
    },
    // {
    //   name: 'product',
    //   title: 'Product',
    //   type: 'string',
    // },
    {
      name: 'principalAmount',
      title: 'Principal Amount',
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
    // {
    //   name: 'startDate',
    //   title: 'Start Date',
    //   type: 'date',
    // },
    // {
    //   name: 'endDate',
    //   title: 'End Date',
    //   type: 'date',
    // },
    // {
    //   name: 'interestRate',
    //   title: 'Interest Rate (%)',
    //   type: 'string',
    // },
    // {
    //   name: 'interestAmount',
    //   title: 'Interest Amount',
    //   type: 'string',
    // },
    // {
    //   name: 'installments',
    //   title: 'Installments',
    //   type: 'string',
    // },
    // {
    //   name: 'processingFee',
    //   title: 'Processing Fee',
    //   type: 'string',
    // },
    // {
    //   name: 'repaymentCycle',
    //   title: 'Repayment Cycle',
    //   type: 'string',
    // },
    // {
    //   name: 'gracePeriod',
    //   title: 'Grace Period',
    //   type: 'number',
    // },
    // {
    //   name: 'arrears',
    //   title: 'Arrears',
    //   type: 'string',
    // },
    // {
    //   name: 'penaltyAmount',
    //   title: 'Penalty Amount',
    //   type: 'string',
    // },
    {
      name: 'collateralList',
      title: 'Collaterals',
      type: 'array',
      of: [{ type: 'collateral' }],
    },
    {
      name: 'guarantor',
      title: 'Guarantor',
      type: 'array',
      of: [{ type: 'guarantor' }],
    }
  ],
};

