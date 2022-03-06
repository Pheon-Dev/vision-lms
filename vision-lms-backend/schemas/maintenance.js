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
      name: 'memberIdNumber',
      title: 'ID Number',
      type: 'string',
    },
    {
      name: 'memberEmail',
      title: 'Email Address',
      type: 'string',
    },
    // {
    //   name: 'interestRate',
    //   title: 'Interest Rate (%)',
    //   type: 'string',
    // },
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
      name: 'penaltyAmount',
      title: 'Penalty Amount',
      type: 'string',
    },
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

