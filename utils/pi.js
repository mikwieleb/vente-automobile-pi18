export async function createPiPayment({ amount, memo, metadata }) {
  if (!window.Pi) {
    throw new Error('Pi SDK non disponible');
  }

  const scopes = ['payments'];
  const payment = await window.Pi.createPayment({
    amount,
    memo,
    metadata
  }, {
    onReadyForServerApproval: async (paymentId) => {
      await fetch('/api/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId })
      });
    },
    onReadyForServerCompletion: async (paymentId, txid) => {
      await fetch('/api/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId, txid })
      });
    },
    onCancel: (paymentId) => {
      console.log('Paiement annulé', paymentId);
    },
    onError: (error, paymentId) => {
      console.error('Erreur de paiement', error, paymentId);
    }
  });

  console.log('Paiement initié :', payment);
}
