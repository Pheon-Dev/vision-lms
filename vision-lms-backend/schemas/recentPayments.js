export default {
  name: 'recentPayments',
  title: 'Recent Payments',
  type: 'document',
  fields: [
    {
      name: 'installmentDate',
      title: 'Installement Date',
      type: 'string',
    },
    {
      name: 'amountPaid',
      title: 'Amount Paid',
      type: 'string',
    },
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
      name: 'penalty',
      title: 'Penalty',
      type: 'string',
    },
    {
      name: 'outstandingPenalty',
      title: 'Outstanding Penalty',
      type: 'string',
    },
    {
      name: 'penaltyPaid',
      title: 'Penalty Paid',
      type: 'string',
    },
    {
      name: 'principalPaid',
      title: 'Principal Paid',
      type: 'string',
    },
    {
      name: 'interestPaid',
      title: 'Interest Paid',
      type: 'string',
    },
    {
      name: 'nextInstallmentDate',
      title: 'Next Installement Date',
      type: 'string',
    },
    {
      name: 'mpesaReferenceCode',
      title: 'MPESA Reference Code',
      type: 'string',
    },
  ],
};
