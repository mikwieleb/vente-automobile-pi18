export async function createPiPayment({ amount, memo, metadata }) {
  if (!window.Pi) {
    throw new Error('Pi SDK non disponible');
  }

  try {
    // Initialisation du Pi SDK
    await window.Pi.init();

    const scopes = ['payments'];  // Définir les autorisations
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
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du Pi SDK :', error);
  }
}
