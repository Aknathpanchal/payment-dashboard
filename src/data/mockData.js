export const transactions = Array.from({ length: 100 }, (_, idx) => ({
  id: `TID-${1000 + idx}`,
  amount: Math.floor(Math.random() * 10000),
  status: ['completed', 'failed', 'processing'][Math.floor(Math.random() * 3)],
  date: new Date(
    Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000 
  )
    .toISOString()
    .split('T')[0],
  customerName: `Customer ${idx + 1}`,
  transactionType: ['Purchase', 'Refund'][Math.floor(Math.random() * 2)],
}));

  
  export const dashboardStats = {
    totalVolume: transactions.reduce((acc, t) => acc + t.amount, 0),
    successRate:
      (transactions.filter((t) => t.status === 'completed').length /
        transactions.length) *
      100,
    failedCount: transactions.filter((t) => t.status === 'failed').length,
    processingCount: transactions.filter((t) => t.status === 'processing').length,
  };
  