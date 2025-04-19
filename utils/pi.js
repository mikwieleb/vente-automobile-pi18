export const createPiPayment = async (amount, memo) => {
  if (!window.Pi) {
    alert('Merci d’utiliser le Pi Browser pour effectuer le paiement.');
    return;
  }

  const paymentData = {
    amount,
    memo,
    metadata: { type: 'car_purchase' }
  };

  try {
    const payment = await window.Pi.createPayment(paymentData, {
      onReadyForServerApproval: async (paymentId) => {
        await fetch('/api/approve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId }),
        });
      },
      onReadyForServerCompletion: async (paymentId, txid) => {
        await fetch('/api/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId, txid }),
        });
        alert('Paiement confirmé ! Merci.');
      },
      onCancel: (paymentId) => {
        alert('Paiement annulé.');
      },
      onError: (error, paymentId) => {
        alert('Une erreur est survenue.');
        console.error(error, paymentId);
      }
    });

    console.log('Paiement initié :', payment);
  } catch (error) {
    console.error('Erreur de paiement Pi :', error);
  }
};
