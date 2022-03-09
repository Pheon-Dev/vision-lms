export default {
  name: 'recentPayments',
  title: 'Recent Payments',
  type: 'document',
  fields: [
    {
      name: 'arrears',
      title: 'Arrears',
      type: 'string',
    },
    {
      name: 'outstandingBalance',
      title: 'Outstanding Balance',
      type: 'string',
    },
    {
      name: 'outstandingPenalty',
      title: 'Outstanding Penalty',
      type: 'string',
    },
    {
      name: 'principalPaid',
      title: 'Principal Paid',
      type: 'string',
    },
    {
      name: 'amountPaid',
      title: 'Amount Paid',
      type: 'string',
    },
    {
      name: 'interestPaid',
      title: 'Interest Paid',
      type: 'string',
    },
    {
      name: 'penaltyPaid',
      title: 'Penalty Paid',
      type: 'string',
    },
    {
      name: 'installmentDate',
      title: 'Installement Date',
      type: 'string',
    },
    {
      name: 'mpesaReferenceCode',
      title: 'MPESA Reference Code',
      type: 'string',
    },
  ],
};
